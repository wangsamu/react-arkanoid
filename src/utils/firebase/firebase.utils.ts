import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK5jKfDH44vIG2PPShFq6Dxb8_VxbV5L8",
  authDomain: "react-arkanoid.firebaseapp.com",
  projectId: "react-arkanoid",
  storageBucket: "react-arkanoid.appspot.com",
  messagingSenderId: "484068023438",
  appId: "1:484068023438:web:d35e3fdf5f25315e043ddf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = firebase.auth()
const firestore = firebase.firestore()

// const [user] = useAuthState(auth)

 const signInWithGoogle = () => {
    const provider =  new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
}

export {signInWithGoogle}