const express=require('express');
const User=require('../models/Users')
const router=express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET='Utkarshisagood$oy'

//create a user using : POST "/api/auth/createuser".No login required

router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3  }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    // If there are errors ,return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with same email exists
    try{

    
    let user=await User.findOne({email:req.body.email});
    // console.log(user)
    if(user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
    }


    //creating a salt 
    const salt=await bcrypt.genSalt(10);
    //creating hashing and adding salt
    const secPass=await bcrypt.hash(req.body.password,salt); 
    user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'Please enter a unique value for email',message:err.message}) });
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);

      res.json({authtoken})

  } catch(error){
      console.error(error.message);
      res.status(500).send("Some error occured");
  }
})

module.exports=router 