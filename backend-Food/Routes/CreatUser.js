const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


router.post("/creatuser", [
    body('name').isLength({ min: 4 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('email').isEmail()
      
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location

            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

    router.post("/loginuser", 
    [
        body('password', 'Incorrect Password').isLength({ min: 5 }),
        body('email').isEmail()
          
    ],async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email= req.body.email;
        try{
           let userData= await User.findOne({email});
           if(!userData){
            return res.status(400).json({errors:"Try loggin with correct credentials"})
           }
           if(req.body.password !== userData.password){
            return res.status(400).json({errors:"Try loggin with correct credentials"})
           }

           return res.json({success:true});
           
        }catch(error){
            console.log(error);
            res.json({success:false});
        }
    })
module.exports = router;
