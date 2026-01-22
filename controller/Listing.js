  const listing=require("../Models/listing");
  const {listingSchema}=require("../utils/Schema");
createlisting = async (req, res) => {
    try {

        let url = req.file.path;
        let filename = req.file.filename;

        let { listing: a } = req.body;
        let newlisting = new listing(a);

        

        newlisting.owner = res.locals.user;
        newlisting.image = { url, filename };

        const { latitude, longitude } = req.body.listing;

        if (!latitude || !longitude) {
            req.flash("error", "Please select location on map");
            return res.redirect("/getlistings/new");
        }

        newlisting.geometry = {
            type: "Point",
            coordinates: [longitude, latitude]
        };
        

        await newlisting.save();

        req.flash("success", "Successfully created new listing");
        res.redirect("/getlistings");

    } catch (err) {
        req.flash("error", err.message);
        console.log(err);
        res.redirect("/getlistings/new");
    }
};


updatelisting=async (req, res) => {
    const { id } = req.params;
    const data = req.body.listing;
    await listing.findByIdAndUpdate(id, { ...data });
    let doc=await listing.findById(id);

        const { latitude, longitude } = req.body.listing;

        if (!latitude || !longitude) {
            req.flash("error", "Please select location on map");
            return res.redirect("/getlistings/new");
        }

        doc.geometry = {
            type: "Point",
            coordinates: [longitude, latitude]
        };
        

    if(req.file){
      let url=req.file.path;
      let filename=req.file.filename;
        doc.image={url,filename};
    }
    await doc.save();
    req.flash("success", "successfully updated listing");

    res.redirect(`/getlistings/${id}`);
  };

viewall=async(req,res)=>{
    let docs=await listing.find({});
    res.render("listings/viewall.ejs",{docs});
}
deletelisting=async(req,res)=>{
    let {id}=req.params;
    let doc1=await listing.findByIdAndDelete(id);
    await Review.deleteMany({
        _id:{$in:doc1.reviews}
    })
    req.flash("success","successfully deleted listing");
    res.redirect("/getlistings");
}
viewindividual=async (req,res)=>{
    let {id}=req.params;
        // populate reviews and nested revowner reliably
        let doc1 = await listing.findById(id)
                .populate({ path: 'reviews', populate: { path: 'revowner' } })
                .populate('owner');
    res.render("listings/individual.ejs",{doc1});

}

module.exports={createlisting,updatelisting,viewall,deletelisting,viewindividual};   