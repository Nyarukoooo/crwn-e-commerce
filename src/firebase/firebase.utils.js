import firebase from 'firebase/app';
import 'firebase/firestore'; //database
import 'firebase/auth'; //authorization

const config = {
    apiKey: "AIzaSyAWqer2UZhT40CuOc7jETwXKxSNUGphAao",
    authDomain: "crwn-db-b282d.firebaseapp.com",
    databaseURL: "https://crwn-db-b282d.firebaseio.com",
    projectId: "crwn-db-b282d",
    storageBucket: "crwn-db-b282d.appspot.com",
    messagingSenderId: "482356255383",
    appId: "1:482356255383:web:32727754b87c7bd9ad67d2",
    measurementId: "G-3ZG9NP3D8M"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;