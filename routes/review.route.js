const router = require('express').Router();
const {Review,validateReview}= require('../models/review.model');
const {Comment,validateComment} = require('../models/comment.model');
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
        res.send(a);
    }catch(error){
        res.send(error);
    }
})


module.exports = router;