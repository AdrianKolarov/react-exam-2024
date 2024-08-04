
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnA9TSoMNfMCm7u88tz737MmApRh8mJxc",

  authDomain: "react-app-2024-65cb6.firebaseapp.com",

  projectId: "react-app-2024-65cb6",

  storageBucket: "react-app-2024-65cb6.appspot.com",

  messagingSenderId: "952771466919",

  appId: "1:952771466919:web:544123cd6f9c7c8c82ed82"


};


// const firebaseConfig = {
//   apiKey: "AIzaSyDidrQIf3kxJwSyh9KcFSeBJjZe2zVFtUo",
//   authDomain: "react-exam-2024.firebaseapp.com",
//   projectId: "react-exam-2024",
//   storageBucket: "react-exam-2024.appspot.com",
//   messagingSenderId: "600879329391",
//   appId: "1:600879329391:web:0216633d2671ea4bbf1d9a"
// };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth(app);
export { db }
