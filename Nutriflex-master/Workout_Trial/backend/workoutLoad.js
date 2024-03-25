const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebaseConfig');
const admin = require("firebase-admin");
const router = express.Router(); // Use Router instead of a separate express app
const cors = require('cors');

router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/workoutLoad", async (req, res) => {
        
        try {
            const workout = db.db.collection("Workouts");
    
            workout.get().then((querySnapshot) => {
                let workoutArray = [];
                querySnapshot.forEach(doc => {
                    workoutArray.push(doc.data());
                });
                res.status(200).json(workoutArray);
            }).catch(error => {
                console.log(error);
                res.status(500).json({ error: "error fetching workout plans" });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "error in db connection" });
        }
    });

    module.exports = router;