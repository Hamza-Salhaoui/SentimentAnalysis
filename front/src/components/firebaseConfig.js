// Importez les fonctions nécessaires depuis les SDKs Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Configuration de votre application Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATi5Xn-N7zAYh4_0AJ4jHaHT3XH0-XjJA",
    authDomain: "react-app-24e43.firebaseapp.com",
    projectId: "react-app-24e43",
    storageBucket: "react-app-24e43.firebasestorage.app",
    messagingSenderId: "684035318597",
    appId: "1:684035318597:web:f6f15494c6d8bab4dc942c",
    measurementId: "G-6NX5F9R1XV"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
