import { collection, addDoc, updateDoc} from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

export const bookSlot = async (req, res) => {

    const {
      name,
      contactNumber,
      queryType,
      selectedDate,
      selectedSlot
    } = req.body;
  
    try {
  
      // Create document in Firestore
      const docRef = await addDoc(collection(db, "slots"), {
        name,
        contactNumber,
        queryType,
        selectedDate,
        selectedSlot
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