/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true})

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'your_project_id',
    databaseURL: 'https://id-alita-firebase.firebaseio.com'
});

const db = admin.firestore();

exports.submitForm = functions.region('europe-central2').https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const { firstName, lastName, email, company, question } = req.body;

        try {
            const userRef = db.collection('users').doc(email);
            await userRef.set({ firstName, lastName, email, company, question });
            res.set('Access-Control-Allow-Origin', 'https://carrier-deploy.web.app');
            res.set('Access-Control-Allow-Methods', 'POST');
            res.status(200).send({ id: email });
        } catch (error) {
            console.error('Error adding document:', error);
            res.status(500).send(`Error adding document: ${error.message}`);
        }
    });
});
