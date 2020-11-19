const express = require('express');
const multer = require('multer');

const User = require('../models/user')
const router = express.Router();

const MIME_TYPE_MAP ={
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    console.log("Hello people in storage");
    const isValid =MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error=null;
    }
    cb(new error ,"backend/images")
  },
  filename: (req,file, cb) => {
  const name = file.originalname.toLowerCase().split(' ').join('-');
  const ext =MIME_TYPE_MAP[file.mimetype];
  cb(null, name +'-'+ Date.now()+'.' + ext)
  }
})

router.post("",multer({storage:storage}).single("image"),(req,res,next)=>{
  const url = req.protocol +'://' + req.get("host");
 const user =new User({
   fname: req.body.fname,
   lname:req.body.lname,
   email:req.body.email,
   phoneno:req.body.phoneno,
   imagepath: url+ "/images"+ req.file.filename
 });
 user.save().then(createdUser => {
   res.status(201).json({
     message:"uer created successfully",
     user:{
      id: createdUser._id,
      fname:createdUser.fname,
      lname:createdUser.lname,
      email:createdUser.email,
      phoneno:createdUser.phoneno,
      imagepath:createdUser.imagepath
     }

   })
 })

})


module.exports = router
