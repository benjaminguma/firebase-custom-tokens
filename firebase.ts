import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAO1ztGRGtYDa8HRjdS3BRJPPVk2_EJ_Hk",
  authDomain: "test-proj-ba46d.firebaseapp.com",
  projectId: "test-proj-ba46d",
  storageBucket: "test-proj-ba46d.appspot.com",
  messagingSenderId: "264900961743",
  appId: "1:264900961743:web:00935cb8d69d9664ca9eba",
  measurementId: "G-T5EGV9HSES"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
