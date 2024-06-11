import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBT2FtclKWHqCM0aiYmQEdHSXyaVGVMpTY",
  authDomain: "netflix-clone-b737a.firebaseapp.com",
  projectId: "netflix-clone-b737a",
  storageBucket: "netflix-clone-b737a.appspot.com",
  messagingSenderId: "90800569846",
  appId: "1:90800569846:web:c711e3b81a79e63ea0dbd7",
  measurementId: "G-M42BL7788T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
