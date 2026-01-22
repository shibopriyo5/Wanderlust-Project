const Joi=require("joi");
// creating schema validator for listing
const listingSchema=Joi.object({
    listing: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        Price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),
        category:Joi.string().required(),
        latitude: Joi.number()
            .min(-90)
            .max(90)
            .required(),

        longitude: Joi.number()
            .min(-180)
            .max(180)
            .required()


    }).required()
});

// creating schema validator for Reviews.
const ReviewSchema=Joi.object({
    review:Joi.object({
        Rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
}) 
module.exports = {
  listingSchema,
  ReviewSchema
};




