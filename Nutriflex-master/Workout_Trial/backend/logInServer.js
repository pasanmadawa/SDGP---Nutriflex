const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebaseConfig');
const admin = require("firebase-admin"); // Make sure you use this if needed, as it's declared but not used in the example
const bcrypt = require('bcrypt'); // Same note as above for bcrypt and jwt
const jwt = require('jsonwebtoken');
const router = express.Router(); // Use Router instead of a separate express app
require('dotenv').config();
const cors = require('cors');


router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Your routes here, for example:
router.post("/LogIn", async (req, res) => {
    try{
        const emailExit = await db.userRef.where('email', '==', req.body.email).get();
        if(emailExit.empty){
            res.status(200).json({exists: false, message: "Email already exists, try again with different email!"});
          //res.send({messsage: "email already exists, try again with different email!"});
        }
        else {
              
            console.log(req.body);
            const token = jwt.sign(user, process.env.TOKEN_KEY); // new token one
            res.header("auth-token", token).send(token);

            res.status(200).json({exists:true, message: "User Exists!"});
        }
    
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "error in db connection"})
    }
});
module.exports = router;