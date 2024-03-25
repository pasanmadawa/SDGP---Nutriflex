const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const userRef = db.collection("Users");

exports.db = db;
exports.userRef = userRef;