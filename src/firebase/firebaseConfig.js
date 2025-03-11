// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCq16MWIsRTAGIlLUF10fl461DhCwGS8fc",
  authDomain: "ulavtech-5001c.firebaseapp.com",
  projectId: "ulavtech-5001c",
  storageBucket: "ulavtech-5001c.firebasestorage.app",
  messagingSenderId: "1058028122926",
  appId: "1:1058028122926:web:ab329337d147c59b5900bf",
  measurementId: "G-6WWZ61YEJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider,db, storage , facebookProvider, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword };
