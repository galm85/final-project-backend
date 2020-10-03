const router = require('express').Router();
const {Comment,validateComment} = require('../models/comment.model');
const {Review} = require('../models/review.model');




//post a new comment
router.post('/', async(req,res)=>{
    const {error} = validateComment(req.body);
    if (error) return res.send(error.details[0].message);

    let comment = new Comment(req.body);
    await comment.save();
    return res.send('comment sent');
})


//get all comments
router.get('/',async (req,res)=>{
  let comments = await Comment.find({});
  res.send(comments);
});


// get all comments by title
router.get('/:title',async (req,res)=>{
    let comments = await Comment.find({title:req.params.title});
    res.send(comments);
  })






// add a new comment to a specific Review array
router.patch('/:id',async(req,res)=>{
    const {error} = validateComment(req.body);
    if (error) return res.send(error.details[0].message);


    await Review.findOneAndUpdate({_id:req.params.id},{$push:{comments:req.body}})
    return res.send('add new comment')
})







module.exports = router;