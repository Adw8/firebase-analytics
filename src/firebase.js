import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnd3IZsJN0jd9BL2djclCaLQoShVqEQgg",
  authDomain: "zipshot-takehome.firebaseapp.com",
  projectId: "zipshot-takehome",
  storageBucket: "zipshot-takehome.appspot.com",
  messagingSenderId: "871394241046",
  appId: "1:871394241046:web:b62ed4e606f35bde246337",
  measurementId: "G-2X9GG0Y539"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app