
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

// const firebaseConfig = {
//   apiKey: "AIzaSyA5bNlWDCZvhQogMD7tj1QMZa2DbeO4TmE",
//   authDomain: "collegeclub-test.firebaseapp.com",
//   projectId: "collegeclub-test",
//   storageBucket: "collegeclub-test.appspot.com",
//   messagingSenderId: "388202998577",
//   appId: "1:388202998577:web:411fd84b5f3408815f5e10"
// };

const app = initializeApp(firebaseConfig)
const auth= getAuth(app)
const db = getFirestore(app)

export { auth, db };
