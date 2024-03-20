// import bcrypt from "bcryptjs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
// import { auth, db } from "../../firebase.js";
import { auth, db } from "../firebase.js"

export const registerUser = async (req, res) => {
  const {
    accountType,
    organizationName,
    fullName,
    contactNumber,
    subDomain,
    userName,
    email,
    userId,
    password,
  } = req.body;

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //       console.log(user.uid);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(error);
  //     });

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userId = user.uid;

    // Create document in Firestore
    const docRef = await addDoc(collection(db, "users"), {
      accountType,
      organizationName,
      fullName,
      contactNumber,
      subDomain,
      userName,
      email,
      userId,
    });

    console.log("Document written with ID: ", docRef.id);
    res.status(200).json(docRef);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  const {
    email,
    password,
  } = req.body;


  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user.uid);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(400).json({ message: "Invalid email or password" });
  }
};