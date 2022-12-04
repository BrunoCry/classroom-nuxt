// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvJVrAISuq7v9V6cfi3H0fLcCC7q0s3qg",
  authDomain: "classroom-59783.firebaseapp.com",
  projectId: "classroom-59783",
  storageBucket: "classroom-59783.appspot.com",
  messagingSenderId: "573505938821",
  appId: "1:573505938821:web:ca3436d9af4de07a1710ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)
