import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/auth';
import {firebaseConfig} from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().languageCode = "ja";

export const db = firebase.firestore();
export const places = db.collection('places');
export const storage = firebase.storage();
export const auth = firebase.auth();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export let user = firebase.auth().currentUser;
export default firebase;
