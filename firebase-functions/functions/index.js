// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

const serviceAccount = require("./credential/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://webviewproject-6f9f1.firebaseio.com"
});


const express = require('express');
const cors = require('cors');

// 參考資料 : https://medium.com/@wulala505/%E7%94%A8cloud-firestore%E5%BB%BA%E7%AB%8B%E7%84%A1%E4%BC%BA%E6%9C%8D%E5%99%A8%E7%9A%84api-481095934543
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
app.post('/', (req, res) => res.send(Widgets.create()));
app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.send(Widgets.list()));

// setting public folder
// api URL : https://us-central1-webviewproject-6f9f1.cloudfunctions.net/api
app.use(express.static('public'));

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;

    if (!original) res.send("請將 text 參數傳入");
    else {
        // Push the new message into the Realtime Database using the Firebase Admin SDK.
        const snapshot = await admin.database().ref('/messages').push({original: original});
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        res.redirect(303, snapshot.ref.toString());
    }

});
