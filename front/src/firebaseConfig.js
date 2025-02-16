// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATi5Xn-N7zAYh4_0AJ4jHaHT3XH0-XjJA",
    authDomain: "react-app-24e43.firebaseapp.com",
    projectId: "react-app-24e43",
    storageBucket: "react-app-24e43.firebasestorage.app",
    messagingSenderId: "684035318597",
    appId: "1:684035318597:web:f6f15494c6d8bab4dc942c",
    measurementId: "G-6NX5F9R1XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };




