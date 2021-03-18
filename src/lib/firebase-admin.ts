import admin from 'firebase-admin';
const serviceAccount = require('./aitebet-b7c3a-firebase-adminsdk-n0i5h-77ad129932.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://aitebet-b7c3a-default-rtdb.firebaseio.com',
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
