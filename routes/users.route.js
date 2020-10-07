const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User,validateUser,validateFav} = require('../models/user.model');
const auth = require('../middlewares/auth');

//register a new user account
router.post("/", async (req,res)=>{
 const {error} = validateUser(req.body);
 if (error)  return res.send(error.details[0].message);

 let user = await User.findOne({email:req.body.email});
 if (user) {
    return  res.send('The email is taken already, try other email');
 
 }
 user = new User(req.body);
 const salt = await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(user.password,salt);
 await user.save();
 res.send(user);

})

//sign in
router.post('/sign-in',async(req,res)=>{
    
    let user = await User.findOne({email:req.body.email});
    
    if (!user) {
    return  res.status(400).send('Email or Password is incorrect');
    }

    let compare = await bcrypt.compare(req.body.password, user.password);
    
    if(!compare){
        return  res.send('Email or Password is incorrect');
    }

    return res.json({token:user.generateAuthToken()});

})



module.exports = router;