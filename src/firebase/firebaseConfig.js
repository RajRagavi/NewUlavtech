// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export { auth, googleProvider, facebookProvider, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword };
