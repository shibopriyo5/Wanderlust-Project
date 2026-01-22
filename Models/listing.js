const mongoose=require("mongoose");
const schema=mongoose.Schema;

const listingSchema=new schema({
    title:{
            type:String,
            required:true,
        },
    description:{
    type:String,
    required:true,
     },
     
   image:{
         url:String,
        filename:String,
    },
      Price:{
      type:Number,
    },
location:{
type:String,
},

country:{
type:String,
 },
reviews:[{
 type:schema.Types.ObjectId,
ref:"Review",
 }],
 owner:{
    type:schema.Types.ObjectId,
 ref:"User",
},
 category:{
type:String,
enum:["Mountains","Swimming-Pools","Forests","Farms","Sea-Side","castles","iconic-Cities"],
 required:true,
 },
 geometry: {
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],   // [longitude, latitude]
        required: true
    }
}
})

const Listing=mongoose.model("Listing",listingSchema);
                                                                                                                                                                                                                    
module.exports=Listing;




