const router = require('express').Router();
const {Review,validateReview}= require('../models/review.model');
const {validateComment} = require('../models/comment.model');

//post a new review
router.post('/new-review',async (req,res)=>{
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

// //get all review by game title
// router.get('/:title',async(req,res)=>{
//     let reviews = await Review.findOne({title:req.params.title});
//     return res.send(reviews);
// })

// //get all review by user
// router.get('/id/:id',async(req,res)=>{
//     let reviews = await Review.findOne({userId:req.params.id});
//     return res.send(reviews);
// })



// add a new comment to the comments Array in Review
router.patch('/:id',async(req,res)=>{
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