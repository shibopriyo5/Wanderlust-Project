if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./Models/listing");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync");
const {listingSchema,ReviewSchema}=require("./utils/Schema");
let Review=require("./Models/Reviews");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./Models/user");
const path=require("path");
const { register } = require("module");
const multer = require('multer');

const {storage} = require("./cloudConfig.js");
  


function fileFilter (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
}


const upload = multer({
  storage

});
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {

        req.session.returnTo = req.originalUrl;

        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
}
const {registerfunc}=require("./controller/User");

const {createlisting,updatelisting,viewall,deletelisting,viewindividual}=require("./controller/Listing");

const {postreview,deleteReview}=require("./controller/Review");


app.listen(8080,(req,res)=>{
    console.log("server is listening on port 8080");
})
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json()); 
const store = MongoStore.create({
    mongoUrl: process.env.ATLAS_URL,

    touchAfter: 24 * 3600 
  });
  
  store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
  });
app.use(
  session({
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const resmsg=(req,res,next)=>{
    res.locals.suc=req.flash("success");
    res.locals.err=req.flash("error");
    res.locals.url=req.session.returnTo ;
    res.locals.user=req.user;
    res.locals.authenticated=req.isAuthenticated();
    next();
}



const isauth = async (req, res, next) => {
    const { id } = req.params;

    const foundListing = await listing.findById(id);

    if (!foundListing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner");
        return res.redirect("/getlistings");
    }

    next();
};

const isrevauth = async (req, res, next) => {
    const { revid } = req.params;

    const foundReview = await Review.findById(revid);

    if (!foundReview.revowner.equals(req.user._id)) {
        req.flash("error", "You are not the owner");
        return res.redirect("/getlistings");
    }

    next();
};



app.get("/",resmsg,wrapAsync(viewall));

app.set("view engine","ejs");
app.engine("ejs",ejsmate);
const schemamiddle=(req,res,next)=>{
   
    let {error}=listingSchema.validate(req.body);
  
     if(error){
        return next(error);

     }
     next();

}
const midrev=(req,res,next)=>{
    let {error}=ReviewSchema.validate(req.body);
    if(error){
        return next(error);

    }
    next();

}

app.get("/getlistings",resmsg, wrapAsync(viewall));

app.get("/getlistings/new",isLoggedIn,resmsg,(req,res)=>{
    res.render("listings/createform.ejs");
}
)
app.get("/register",resmsg,(req,res,next)=>{
    res.render("listings/register.ejs");
})
app.get("/login",resmsg,(req,res,next)=>{
    res.render("listings/login.ejs");
})
app.post("/login",resmsg,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {

        const redirectUrl =  "/getlistings";


        

        res.redirect(redirectUrl);
    }
);

app.get("/logout",resmsg, (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out");
        res.redirect("/getlistings");
    });
});



app.post("/register",resmsg, registerfunc);



app.post("/getlistings/create", isLoggedIn,upload.single('image'),resmsg, schemamiddle,wrapAsync(createlisting));

app.put("/getlistings/:id/put", isLoggedIn ,upload.single('image'),isauth,resmsg,schemamiddle,wrapAsync(updatelisting));

app.delete("/getlistings/:id", isLoggedIn ,isauth,resmsg,wrapAsync(deletelisting));

app.get("/getlistings/edit/:id", isLoggedIn,resmsg,wrapAsync(async(req,res)=>{
        let {id}=req.params;
        let alisting=await listing.findById(id);
        res.render("listings/editform.ejs",{alisting});
}))
app.get("/getlistings/:id",resmsg,wrapAsync(viewindividual));

app.post("/getlistings/:id/reviews",isLoggedIn,resmsg,wrapAsync(postreview));

app.delete("/getlistings/:id/reviews/:revid",isLoggedIn,isrevauth,resmsg,deleteReview);
app.get("/getlistings/category/:catid",resmsg,async(req,res,next)=>{
    try{
        let {catid}=req.params;
        let docsarray=await listing.find({});

        let docs=docsarray.filter(doc=>doc.category==catid);
        req.flash("success",`Showing results for category: ${catid}`);
        res.locals.suc=req.flash("success");
        res.locals.err=req.flash("error");
        res.render("listings/viewall.ejs", { docs });


    }
    catch(e){
        next(e);

    }
})
app.post("/getlistings/search",resmsg,async(req,res,next)=>{
    try{
        let obj=req.body.Search;

       let {country,Budget,title}=req.body.Search;
       if(!(country)){
        delete obj.country;

       }
        if(!(title)){
        delete obj.title;
       }
       delete obj.Budget;
       let docs=await listing.find({...obj});
       if (Budget) {
        docs = docs.filter(doc => doc.Price <= Budget);
        }
        req.flash("success",`Showing results `);
        res.locals.suc=req.flash("success");
        res.locals.err=req.flash("error");
       res.render("listings/viewall.ejs",{docs});
    }
    catch(e){
        next(e);
    }
}
)
app.use((err,req,res,next)=>{
    console.log("Something Went Wrong...");
    console.log(err);
    res.render("listings/error.ejs",{err});

})

main()
.then((res)=>{
    console.log(res);
    
})
.catch((err)=>{
    console.log(err);
    
})
async function main(){
    await mongoose.connect(process.env.ATLAS_URL);
}


