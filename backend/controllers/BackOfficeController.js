import {
  signInWithEmailAndPassword,
  getAuth,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;
    console.log(userId);

    let userData;
    const docRef = doc(db, "admins", userId);
    await getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          if (docSnapshot.id === userId) {
            userData = docSnapshot.data();
            userData["userId"] = userId;
          } else {
            console.error("Unauthorized access!");
          }
        } else {
          console.log("Document not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });

    res.status(200).json({ userData });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(400).json({ message: "Invalid email or password" });
  }
};


// this function is used to show partners by different categories - college, company, student, cc - ambassador
export const getPartnersByType = async (req, res) => {
  const { partnerType } = req.params; // use it as /admin/getpartners/${partnerType}

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(
      usersCollectionRef,
      where("accountType", "==", partnerType)
    );
    const querySnapshot = await getDocs(q);

    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push(doc.data());
    });

    if (userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error getting user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// this is used to display all the slot booking details
export const getSlotBookingDetails = async (req, res) => { 
  try {
    const q = query(collection(db, "slots"));
    const querySnapshot = await getDocs(q);

    const slotBookingData = [];
    querySnapshot.forEach((doc) => {
      slotBookingData.push(doc.data());
    });

    res.status(200).json(slotBookingData);
  } catch (error) {
    console.error("Error getting user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push(doc.data());
    });

    if (userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error getting user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const verifyCollege = async (req, res) => {
  const { collegeId } = req.params;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", collegeId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    querySnapshot.forEach(async (document) => {
      const docRef = document.ref;

      await updateDoc(docRef, {
        isVerified: true
      });

    });

    res.status(200).json({ message: "College verified successfully" });
    
  } catch (error) {
    console.error("Error getting user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};