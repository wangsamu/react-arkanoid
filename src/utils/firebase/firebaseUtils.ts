import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK5jKfDH44vIG2PPShFq6Dxb8_VxbV5L8",
  authDomain: "react-arkanoid.firebaseapp.com",
  projectId: "react-arkanoid",
  storageBucket: "react-arkanoid.appspot.com",
  messagingSenderId: "484068023438",
  appId: "1:484068023438:web:d35e3fdf5f25315e043ddf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
export const db = getFirestore();

//sign-in with Google
const googleProvider = new GoogleAuthProvider();

const signInwithGooglePopUp = () => {
  signInWithPopup(auth, googleProvider);
  console.log(auth);
};

//for new sign-ups, creating a copy of the user in firestore
const createUserDocumentFromAuth = async (
  userAuth: any
  // additionalInfo: any
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //check if user data exists
  if (!userSnapshot.exists()) {
    //if false: create/set the document with the data from userAuth in my collection
    //thus, creating a user in the database
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        // ...additionalInfo,
      });
      console.log(displayName, email);
    } catch (error: any) {
      console.log("error creating user", error.message);
    }
  }

  //if true: return user data
  console.log(userSnapshot);
  return userDocRef;
};

const onAuthStateChangedListener = (callback: any) =>
  onAuthStateChanged(auth, callback);

export {
  signInwithGooglePopUp,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
};
