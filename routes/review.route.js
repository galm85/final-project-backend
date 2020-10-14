const router = require('express').Router();
const {Review,validateReview}= require('../models/review.model');
const {Comment,validateComment} = require('../models/comment.model');
const {User} = require('../models/user.model');
const auth = require('../middlewares/auth');

//post a new review
router.post('/',auth,async (req,res)=>{
    const {error} = validateReview(req.body);
    if (error) return res.send(error.details[0].message);

 let review = new Review(req.body);
 await review.save();
 res.send("new review saved");
})

//get all review
router.get('/',async(req,res)=>{
let allReviews = await Review.find({});
return res.send(allReviews);
})


// add a new comment to the comments Array in Review
router.patch('/:id',auth,async(req,res)=>{
    const {error} = validateComment(req.body);
    if (error) return res.send(error.details[0].message);
    
    let comment = new Comment(req.body);
    await Review.findOneAndUpdate({_id:req.params.id},{$push:{comments:comment}})
    return res.send('add new comment')
})

//delete review
router.delete('/delete/:id',async(req,res)=>{
    try{
       await Review.findOneAndRemove({_id:req.params.id});
        res.status(200).send("Review deleted");
    }catch(error){
        res.status(400).send(error);
    }
})

//add to favorite
router.post('/favorite/:userId',async (req,res)=>{
    try {
       let user = await User.findOneAndUpdate({_id:req.params.userId},{$push:{fav:req.body}});
       res.status(200).send(user);
        
    }
    catch(error){
        console.log(error);
        res.status(400).send('not ok')
    }
})

//get all favorites review of a user
router.get('/favorite/:userId',async (req,res)=>{
    try{
     let favs =  await User.findOne({_id:req.params.userId},{fav:1});
     console.log(favs)
     res.status(200).send(favs);

        
    }catch(error){
        res.status(400).send(error);
    }
})





//get all the comments of a  review by id
router.get('/comments/:id',async (req,res)=>{
    let review =await Review.findOne({_id:req.params.id},{comments:1})
    res.send(review)
})


//delete a comment in review

router.patch('/comments/delete/:id',async(req,res)=>{
    console.log(req.body._id);
    try{
       const a= await Review.findOneAndUpdate({_id:req.params.id},{$pull:{comments:{title:req.body.title,body:req.body.body}}});
        res.status(200).send("Comment deleted");
    }catch(error){
        res.send(error);
    }
})


module.exports = router;