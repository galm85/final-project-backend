const router = require('express').Router();
const {Review,validateReview}= require('../models/review.model');
const {validateComment} = require('../models/comment.model');
const auth = require('../middlewares/auth');

//post a new review
router.post('/',auth,async (req,res)=>{
    const {error} = validateReview(req.body);
    if (error) return res.send(error.details[0].message);

 let user = new Review(req.body);
 await user.save();
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


    await Review.findOneAndUpdate({_id:req.params.id},{$push:{comments:req.body}})
    return res.send('add new comment')
})

//get all the comments of a  review by id
router.get('/comments/:id',async (req,res)=>{
    let review =await Review.findOne({_id:req.params.id},{comments:1})
    res.send(review)
})


module.exports = router;