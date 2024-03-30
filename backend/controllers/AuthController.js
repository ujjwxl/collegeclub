// import bcrypt from "bcryptjs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, updateDoc} from "firebase/firestore";
// import { auth, db } from "../../firebase.js";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

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
      paymentStatus: false
    });

    console.log("Document written with ID: ", docRef.id);
    res.status(200).json(docRef);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // console.log("User logged in:", user.uid);
    res.status(200).json(user);
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(400).json({ message: "Invalid email or password" });
  }
};

// export const getUserDetails = async (req, res) => {
//   const userId = req.query.userId;

//   if (!userId) {
//     return res.status(400).json({ message: 'Missing userId parameter' });
//   }

//   try {
//     const userDoc = await db.collection('users').doc(userId.toString()).get();

//     if (!userDoc.exists) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userData = userDoc.data();
//     console.log(userData);
//     return res.status(200).json(userData);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getUserDetails = async (req, res) => {
//   const { userId } = req.params;

//   // const userIdString = String(userId);

//   const q = query(usersCollectionRef, where("userId", "==", userId));
//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });

//   const docRef = doc(db, "users", userIdString);

//   try {
//     // const userDoc = await db.collection('users').doc(userId).get();
//     const docSnap = await getDoc(docRef);
//     if (!docSnap.exists()) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const userData = docSnap.data();
//     res.status(200).json(userData);
//   } catch (error) {
//     console.error("Error getting user details:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

export const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    let userData;
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error getting user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getColleges = async (req, res) => {

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("accountType", "==", "College"));
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

export const completeProfileForm = async (req, res) => {
  const { userId } = req.params;
  const {
    universityFullName,
    universityShortName,
    foundedYear,
    approvedBy,
    rankedBy,
    contactNumber,
    email,
    website,
    fullAddress,
    pinCode,
    country,
    state,
    district,
    alternateContact,
    alternateNumber,
    referralCode,
  } = req.body;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;

      await updateDoc(docRef, {
        organizationName: universityFullName,
        universityShortName,
        foundedYear,
        approvedBy,
        rankedBy,
        contactNumber,
        email,
        website,
        fullAddress,
        pinCode,
        country,
        state,
        district,
        alternateContact,
        alternateNumber,
        referralCode,
        profileFormFilled: true
      });

      console.log('Profile form updated successfully');
    });

    res.status(200).json({ message: "Profile form updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: error.message });
  }
};



