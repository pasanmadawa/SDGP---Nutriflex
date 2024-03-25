const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebaseConfig');
const admin = require("firebase-admin");
const router = express.Router(); // Use Router instead of a separate express app
const cors = require('cors');

router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/mealPlanLoad", async (req, res) => {
    
    try {
        const mealPlan = db.db.collection("Meals");

        mealPlan.get().then((querySnapshot) => {
            let mealPlanArray = [];
            querySnapshot.forEach(doc => {
                mealPlanArray.push(doc.data());
            });
            res.status(200).json(mealPlanArray);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "error fetching meal plans" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error in db connection" });
    }
});

module.exports = router;