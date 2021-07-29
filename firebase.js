import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "chat-app-39e2d.firebaseapp.com",
  projectId: "chat-app-39e2d",
  storageBucket: "chat-app-39e2d.appspot.com",
  messagingSenderId: "585760944922",
  appId: "1:585760944922:web:d6f5d11df8ca6716ca32a3",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
