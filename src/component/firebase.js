import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// console.log(process.env.REACT_APP_FIREBASE_DATABASE_URL)
// const config = {
//     apiKey: "AIzaSyAygxn1efRRIy_0Nbzyq33L3HiG_U_7Et0",
//     authDomain: "movie-app-5aebc.firebaseapp.com",
//     databaseURL: "https://movie-app-5aebc-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "movie-app-5aebc",
//     storageBucket: "movie-app-5aebc.appspot.com",
//     messagingSenderId: "145958540166",
//     appId: "1:145958540166:web:c45fb495f18a477f515207"
//   };

  firebase.initializeApp(config);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ 'prompt': 'select_account' })

const database = firebase.database();

const storage = firebase.storage()

export {firebase, storage, googleAuthProvider, database as default }