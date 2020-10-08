const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const config = require('config');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    lastName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:255
    },
    editor:{
        type:Boolean,
        
    },
    createdAt: 
    { type: Date,
      default: Date.now
     },
     fav:Array


});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtKey'));
    return token;
  }



const User = mongoose.model('User',userSchema);


function validateUser(user){
    const schema = Joi.object({
        firstName:Joi.string().required().min(2).max(255),
        lastName:Joi.string().required().min(2).max(255),
        email:Joi.string().required().min(2).max(255).email(),
        password:Joi.string().required().min(2).max(255),
        editor:Joi.boolean()
    });

    return schema.validate(user);
}

function validateFav(fav){
    const schema = Joi.object({
        fav:Joi.array().min(1).required()
    })

    return schema.validate(fav)
}


exports.User = User;
exports.validateUser = validateUser;
exports.validateFav = validateFav;