const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;


const server1Routes = require("./logInServer");
const server2Routes = require("./mealPlanLoad");
const server3Routes = require("./signInServer");
const server4Routes = require("./profileData");
const server5Routes = require("./workoutLoad");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/logInServer', server1Routes);
app.use('/api/mealPlanLoad', server2Routes);
app.use('/api/signInServer', server3Routes);
app.use('/api/profileData', server4Routes);
app.use('/api/workoutLoad', server5Routes);




app.listen(port, () => {
  console.log(`Unified Server is running at http://192.168.1.2:${port}`);
});
