/**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCl171dNz16DZ0QcxOp4nwB9SpzeR74ckQ",
  authDomain: "multi-mx.firebaseapp.com",
  databaseURL: "https://multi-mx.firebaseio.com",
  projectId: "multi-mx",
  storageBucket: "multi-mx.appspot.com",
  messagingSenderId: "615295565874",
  appId: "1:615295565874:web:8924c5cddd910b4d45bc2b",
  measurementId: "G-KC4EPVGWY0",
};

firebase.initializeApp(config);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  database,
};
