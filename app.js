const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


//routes
const usersRoute = require('./routes/users.route'); 
const reviewsRoute = require('./routes/review.route');
const commentsRoute = require('./routes/comments.route');


const PORT = process.env.PORT || 4000;

//mongoDB connection
mongoose.connect('mongodb://localhost:27017/VideoGamesProject',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true})
    .then(console.log("Connect to mongoDB"))
    .catch(err=>{console.log(err,": No connection")})



app.use(cors());
app.use(express.json())

app.use('/users',usersRoute);
app.use('/review',reviewsRoute);
app.use('/comments',commentsRoute);

app.listen(PORT,console.log(`Server is running on post:${PORT}`))



