const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');


const reviewSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    
    },
    img:{
        type:String,
    },
    body:{
        type:String,
    },
    userId:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    createdAt:{ 
        type: Date,
        default: Date.now
     },
    comments:Array
});

const Review = mongoose.model('Review',reviewSchema);


function validateReview(review){
    const schema = Joi.object({
        title:Joi.string().required().min(2).max(64),
        img:Joi.string().required().min(2),
        body:Joi.string(),
        userId:Joi.string().required().min(2).max(64),
        author:Joi.string().required()
    })

    return schema.validate(review)
}

exports.Review = Review
exports.validateReview = validateReview