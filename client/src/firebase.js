// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-hotel-management-system.firebaseapp.com",
  projectId: "mern-hotel-management-system",
  storageBucket: "mern-hotel-management-system.appspot.com",
  messagingSenderId: "270676937830",
  appId: "1:270676937830:web:8534c786bd2e0da8e7f1a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);