import * as admin from "firebase-admin";
import processSmartStampWebhook from "./httpscalls/CFProcessSmartStampWebhook";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const app = admin.initializeApp();
app.firestore().settings({timestampsInSnapshots: true});

exports.processSmartStampWebhook = processSmartStampWebhook;
