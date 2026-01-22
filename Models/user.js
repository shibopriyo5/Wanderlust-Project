const mongoose = require("mongoose");

// 👇 force-extract the function
const plm = require("passport-local-mongoose");
const passportLocalMongoose = plm.default || plm;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);//here in argument, a function is expected.


module.exports = mongoose.model("User", userSchema);
