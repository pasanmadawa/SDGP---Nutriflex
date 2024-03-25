const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebaseConfig');
const admin = require("firebase-admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router(); // Use Router instead of a separate express app
const cors = require('cors');

 

router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let userData = null;
let userData_1 = null;
let userData_2 = null;
let userData_3 = null;
// let refreshTokens = [];

const signIn = router.post("/SignUp", async (req, res) => {

    try {

        const emailExit = await db.userRef.where('email', '==', req.body.email).get();
        if (!emailExit.empty) {
            res.status(200).json({ exists: true, message: "email already exists, try again with different email!" });
            //res.send({messsage: "email already exists, try again with different email!"});
        } else {

            console.log(req.body);
            const email = req.body.email;
            const password = req.body.password;
            const userID = req.body.uid;

            const hashedPassword = await bcrypt.hash(password, 8);


            userData = {

                email: email,
                password: hashedPassword,
                uid: userID,


            }

            //const response = await db.userRef.add(userData);
            //res.send({success: true, message: "Hello from backend!" });

            const user = { email:email };
            const token = jwt.sign(user, process.env.TOKEN_KEY); // new token one
            res.header("auth-token", token).send(token);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error in db connection" })
    }

});


const custom_1Data = router.post("/Custom_1", async (req, res) => {
    try {
        console.log(req.body);
        const name = req.body.name;
        const selectedGender = req.body.selectedGender;
        const age = req.body.age;

        userData_1 = {
            name: name,
            selectedGender: selectedGender,
            age: age,
        }
        res.send({ success: true, message: "Hello from backend!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error in db connection" })
    }

});

const custom_2Data = router.post("/Custom_2", async (req, res) => {
    try {
        console.log(req.body);
        const selectedHeight = req.body.selectedHeight;
        const selectedWeight = req.body.selectedWeight;
        const selectedWeightLoss = req.body.selectedWeightLoss;

        userData_2 = {
            selectedHeight: selectedHeight,
            selectedWeight: selectedWeight,
            selectedWeightLoss: selectedWeightLoss
        }

        res.send({ success: true, message: "Hello from backend!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error in db connection" })
    }
});

const custom_3Data = router.post("/Custom_3", async (req, res) => {
    try {
        console.log(req.body);
        const selectedOption = req.body.selectedOption;

        userData_3 = {
            selectedOption: selectedOption,
        }

        const combinedData = {
            ...userData,
            ...userData_1,
            ...userData_2,
            ...userData_3,
        }

        const response = db.userRef.doc(userData.uid).set(combinedData);
        res.send({ success: true, UID: userData.uid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error in db connection" })
    }
});

module.exports = router;
