const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27107/videoGames',{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(console.log("Connect to mongoDB")).catch(err=>{console.log(err,": No connection")})





app.listen(PORT,console.log(`Server is running on post:${PORT}`))



