
const User = require("../Models/user");
const registerfunc=async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        const newUser = new User({ username, email });

        await User.register(newUser, password);
         // password hashed here
        req.flash("success","successfully registered");

        res.redirect("/login");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/getlistings");
    }

}
module.exports={registerfunc};
