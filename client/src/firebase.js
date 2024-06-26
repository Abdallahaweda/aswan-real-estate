// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aswan-estate.firebaseapp.com",
  projectId: "aswan-estate",
  storageBucket: "aswan-estate.appspot.com",
  messagingSenderId: "443850715233",
  appId: "1:443850715233:web:162c8a8c7b6af8298a7a20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);