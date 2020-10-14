const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User,validateUser,validateFav} = require('../models/user.model');




//register a new user account
router.post("/", async (req,res)=>{
 const {error} = validateUser(req.body);
 if (error)  return res.send(error.details[0].message);

 let user = await User.findOne({email:req.body.email});
 if (user) {
    return  res.status(400).send('The email is taken already, try other email');
 
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


//edit User
router.put("/update-user", async (req,res)=>{
    const {error} = validateUser(req.body);
    if (error)  return res.send(error.details[0].message);
   
    let user = await User.findOneAndUpdate({_id:req.body._id},req.body);
    if (!user) {
       return  res.status(400).send('No user');
    }

    res.status(200).json({token:user.generateAuthToken()});
    
   })




//get all favorites review of a user
router.get('/favorite/:userId',async (req,res)=>{
    try{
     let favs =  await User.findOne({_id:req.params.userId},{fav:1});
     res.status(200).send(favs);

        
    }catch(error){
        res.status(400).send(error);
    }
})


//add to review to the user's favorite list
router.put('/favorite/:userId',async (req,res)=>{
    try {
       let user = await User.findOneAndUpdate({_id:req.params.userId},{$push:{fav:req.body}});
       res.status(200).send("user");
        
    }
    catch(error){
        console.log(error);
        res.status(400).send('not ok')
    }
})


   //remove from favor list
   router.put('/favorites/delete/:id',async (req,res)=>{
       try{
          await User.findOneAndUpdate({_id:req.params.id},
            {$pull:{fav:{_id:req.body._id}}})
           res.send("ok");
       }catch(error){
           res.send(error)
       }
       
   })


   
   



module.exports = router;