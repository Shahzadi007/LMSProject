const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const auth = require(
  "../middleware/authMiddleware"
);



router.post("/register", async(req,res)=>{
  try{
    const {name,email,password,role} = req.body;

    const exists = await User.findOne({email});
    if(exists){
      return res.status(400).json({message:"Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
      name,email,password:hashedPassword,role
    });

    res.status(201).json(user);
  }catch(error){
    res.status(500).json(error);
  }
});

router.post("/login", async(req,res)=>{
  try{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign(
      {id:user._id, role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    );

    res.json({token, role:user.role});
  }catch(error){
    res.status(500).json(error);
  }
});

router.get(
  "/me",
  auth,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);


module.exports = router;