const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')


const app = express();

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://manchild:Dominic11@cluster0.4ohxs.mongodb.net/assignment1?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
}).catch(() => {
  console.log('Connection failed!')
});

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.setHeader("Access-Control-Allow-Methods",
   "GET, POST, PATCH, DELETE,PUT, OPTIONS"
   );
  next()

})

app.use("/user", userRoutes)



module.exports = app;
