const router = require('express').Router();
const {Review,validateReview}= require('../models/review.model');

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

//get all review by game
router.get('/:title',async(req,res)=>{
    let reviews = await Review.findOne({title:req.params.title});
    return res.send(reviews);
})

//get all review by user
router.get('/id/:id',async(req,res)=>{
    let reviews = await Review.findOne({userId:req.params.id});
    return res.send(reviews);
})


module.exports = router;