
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDidrQIf3kxJwSyh9KcFSeBJjZe2zVFtUo",
  authDomain: "react-exam-2024.firebaseapp.com",
  projectId: "react-exam-2024",
  storageBucket: "react-exam-2024.appspot.com",
  messagingSenderId: "600879329391",
  appId: "1:600879329391:web:0216633d2671ea4bbf1d9a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
