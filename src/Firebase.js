import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/auth';
import {firebaseConfig} from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().languageCode = "it";

export const db = firebase.firestore();
export const places = db.collection('places');
export const storage = firebase.storage();
export const providerTwitter = firebase.auth.TwitterAuthProvider();
export default firebase;
