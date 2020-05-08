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

export const createUserProfileDocumentation = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); //get a snapshot

    //if user data is not exisit, create a new one
    //use documentRef to create a user data, not snapShot, snapShot simply represent data.
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user ', error.message);
        }
    }

    return userRef;

};



firebase.initializeApp(config);

export const auth = firebase.auth(); //define auth
export const firestore = firebase.firestore(); //define database

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;