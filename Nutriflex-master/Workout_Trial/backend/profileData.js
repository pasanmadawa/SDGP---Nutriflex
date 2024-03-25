const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebaseConfig');
const admin = require("firebase-admin");
const router = express.Router(); // Use Router instead of a separate express app
const app = express();
const cors = require('cors');
const verify = require('./middleware/authtoken');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

router.get("/profilePageLoad", async (req, res) => {
    try{
        const profileID = await db.userRef.where('uid', '==', req.user.uid).get();

        if(profileID.empty){
            console.log("Profile does not exist!");
            res.status(200).json({exists: false, message: "Profile does not exist!"});
        }
        else{
            const userData = profileID.docs[0].data();
            res.status(200).json(userData);
        }

    }catch(error){
        console.log(error);
        res.status(500).json({error: "error in db connection"}) 
    }
});


module.exports = router;