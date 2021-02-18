import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAcQA88Jfx40LTnWu04Nfj-E0gg0KfmE24",
  authDomain: "le-plus-fort-des-papa.firebaseapp.com",
  projectId: "le-plus-fort-des-papa",
  storageBucket: "le-plus-fort-des-papa.appspot.com",
  messagingSenderId: "975820181660",
  appId: "1:975820181660:web:2317fc282d88c94c7f9d59",
  measurementId: "G-PRB3VT6TGB"
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();