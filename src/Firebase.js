import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: name,
      authProvider: 'local',
      email: email,
    });
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully");
  } catch (error) {
    console.error("Error logging in:", error);
    alert(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    alert(error.message);
  }
};

export { auth, db, login, signup, logout };
