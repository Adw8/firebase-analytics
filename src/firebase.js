import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
  apiKey: "AIzaSyBnd3IZsJN0jd9BL2djclCaLQoShVqEQgg",
  authDomain: "zipshot-takehome.firebaseapp.com",
  projectId: "zipshot-takehome",
  databaseURL: "https://zipshot-takehome-default-rtdb.firebaseio.com",
  storageBucket: "zipshot-takehome.appspot.com",
  messagingSenderId: "871394241046",
  appId: "1:871394241046:web:b62ed4e606f35bde246337",
  measurementId: "G-2X9GG0Y539"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export default app;
// export default ;