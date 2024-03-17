
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAF6JRNmMeZ5f6IDxPlycvp_1_97_QFUU",
  authDomain: "college-club-8a7da.firebaseapp.com",
  projectId: "college-club-8a7da",
  storageBucket: "college-club-8a7da.appspot.com",
  messagingSenderId: "30258830260",
  appId: "1:30258830260:web:bd7787bc1453b76b33b0e1",
  measurementId: "G-G8BCLTX69R"
};

const app = initializeApp(firebaseConfig)
const auth= getAuth(app)
const db = getFirestore(app)

export { auth, db };
