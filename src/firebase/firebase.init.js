// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBawe_CpYjvYVIL7UijwI2--gv8dYt-sLw",
  authDomain: "smart-deals-5b8f2.firebaseapp.com",
  projectId: "smart-deals-5b8f2",
  storageBucket: "smart-deals-5b8f2.firebasestorage.app",
  messagingSenderId: "69019342683",
  appId: "1:69019342683:web:851293284a038b3428ac7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);