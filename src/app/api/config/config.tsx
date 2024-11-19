// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIZVcGijUF8yUUH7DjqpGOhFdu_sF2KFY",
  authDomain: "the-blessed-phuket-tour-65bfb.firebaseapp.com",
  projectId: "the-blessed-phuket-tour-65bfb",
  storageBucket: "the-blessed-phuket-tour-65bfb.appspot.com",
  messagingSenderId: "767804729540",
  appId: "1:767804729540:web:b638c26c8ae819de944191"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db}