const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const commentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    body:{
        type:String,
        maxlength:1024
    },
    userId:{
        type:String,
        required:true
    }
    
})


const Comment = mongoose.model('Comment',commentSchema);

function validateComment(comment){
    const schema = Joi.object({
        title:Joi.string().required().min(2).max(255),
        body:Joi.string().max(1024),
        userId:Joi.string().required()
    })

    return schema.validate(comment);
}

exports.Comment = Comment;
exports.validateComment = validateComment;