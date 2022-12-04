importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging.js")

const firebaseConfig = {
  apiKey: "AIzaSyCvJVrAISuq7v9V6cfi3H0fLcCC7q0s3qg",
  authDomain: "classroom-59783.firebaseapp.com",
  projectId: "classroom-59783",
  storageBucket: "classroom-59783.appspot.com",
  messagingSenderId: "573505938821",
  appId: "1:573505938821:web:ca3436d9af4de07a1710ec"
};

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('recieved background message', payload)
})