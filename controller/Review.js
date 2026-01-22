listing=require("../Models/listing");
Review=require("../Models/Reviews");
postreview= async(req,res)=>{
    let {id}=req.params;
    let doc=await listing.findById(id);



    req.body.review.revowner=req.user._id;

    let newreview=new Review(req.body.review);
    
    doc.reviews.push(newreview);
    await newreview.save();
    await doc.save();
    res.redirect(`/getlistings/${id}`);
    
}
deleteReview=async(req,res)=>{
    let {id,revid}=req.params;
      await listing.findByIdAndUpdate(id, {
        $pull: { reviews: revid }
    });
    await Review.findByIdAndDelete(revid);
    res.redirect(`/getlistings/${id}`);
    
}
module.exports={postreview,deleteReview};




