// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8HE_qIHfFS77TX9y3EsrzbHW3kV00llo",
  authDomain: "chatapp-fd388.firebaseapp.com",
  databaseURL: "https://chatapp-fd388-default-rtdb.firebaseio.com",
  projectId: "chatapp-fd388",
  storageBucket: "chatapp-fd388.firebasestorage.app",
  messagingSenderId: "841768959210",
  appId: "1:841768959210:web:0e9f81158729f933e4ab93"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
