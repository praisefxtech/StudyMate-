import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


const firebaseConfig = {

apiKey: "AIzaSyB55yCyRk9lmsr8aP9qRqamPZ3cq29yL-Q",

authDomain: "studymate-414df.firebaseapp.com",

projectId: "studymate-414df",

storageBucket: "studymate-414df.firebasestorage.app",

messagingSenderId: "1071816031928",

appId: "1:1071816031928:web:b97a9c055b224a0bf37e4d"

};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


// Make Firebase available to main.js

window.firebaseAuth = auth;

window.firebaseCreateUser =
createUserWithEmailAndPassword;

window.firebaseLogin =
signInWithEmailAndPassword;

window.firebaseLogout =
signOut;

window.firebaseUser =
onAuthStateChanged;

window.firebaseResetPassword =
sendPasswordResetEmail;