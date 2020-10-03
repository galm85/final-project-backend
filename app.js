const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const usersRoute = require('./routes/users.route'); 



const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/VideoGamesProject',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true})
    .then(console.log("Connect to mongoDB"))
    .catch(err=>{console.log(err,": No connection")})

app.use(cors());
app.use(express.json())

app.use('/users',usersRoute);
// app.use('/review',reviewRoute);


app.listen(PORT,console.log(`Server is running on post:${PORT}`))



