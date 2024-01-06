// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCdRVOF2sk7EuyJZBUhsUjcQynFALw97a4",
  authDomain: "online-job-portal-927b6.firebaseapp.com",
  projectId: "online-job-portal-927b6",
  storageBucket: "online-job-portal-927b6.appspot.com",
  messagingSenderId: "120221980781",
  appId: "1:120221980781:web:b6f60f143a6d90cdc84764"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export {db, app, auth};