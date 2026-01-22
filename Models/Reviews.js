const mongoose=require("mongoose");
const schema=mongoose.Schema;
const ReviewSchema=new schema({
 
    Rating:{
        type:Number,
        min:1,
        max:5,
        default:4,
        
    },

       comment:{
        type:String,
        
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    
    revowner:{
        type:schema.Types.ObjectId,
        ref:"User",
    }
 
})
const Review=mongoose.model("Review",ReviewSchema);

module.exports=Review;
