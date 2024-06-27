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

export const getFeedbackByType = async (req, res) => {
  const { feedbackType } = req.params; 

  try {
    const feedbacksRef = collection(db, 'feedbacks');
    const q = query(feedbacksRef, where('type', '==', feedbackType));
    
    const querySnapshot = await getDocs(q);
    const feedbacks = [];
    
    querySnapshot.forEach((doc) => {
      feedbacks.push({
        id: doc.id,
        ...doc.data()
      });
    });

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedbacks found' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error getting feedback documents:', error.message);
    res.status(500).json({ message: 'Error retrieving feedbacks' });
  }
};


export const updateFeedbackStatus = async (req, res) => {
  const { feedbackId } = req.params; 
  const { status } = req.body; 

  try {
    const feedbacksCollectionRef = collection(db, 'feedbacks');
    const q = query(feedbacksCollectionRef, where("feedbackId", "==", feedbackId));
    const querySnapshot = await getDocs(q); 

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    querySnapshot.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          status: status || doc.data().status,
        });
      } catch (updateError) {
        throw updateError;
      }
    });

    res.status(200).json({ message: 'Feedback status updated successfully' });
  } catch (error) {
    console.error('Error updating feedback status:', error.message);
    res.status(500).json({ message: 'Failed to update feedback status' });
  }
};

export const updateOnboardingStatus = async (req, res) => {
  const { collegeId } = req.params; 
  const { 
    status,
    message
   } = req.body;

  try {
    const feedbacksCollectionRef = collection(db, 'users');
    const q = query(feedbacksCollectionRef, where("userId", "==", collegeId));
    const querySnapshot = await getDocs(q); 

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    querySnapshot.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          onboardingStatus: status || doc.data().status,
          notifications: arrayUnion({content: message, date: Date.now()}),
        });
      } catch (updateError) {
        throw updateError;
      }
    });

    res.status(200).json({ message: 'Feedback status updated successfully' });
  } catch (error) {
    console.error('Error updating feedback status:', error.message);
    res.status(500).json({ message: 'Failed to update feedback status' });
  }
};