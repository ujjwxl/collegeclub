import { signInWithEmailAndPassword, getAuth, updatePassword} from "firebase/auth";
import { auth, db } from "../firebase.js";
import { collection, addDoc, updateDoc, deleteDoc, arrayUnion, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";

export const loginAdmin = async (req,res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log(userCredential);
        
        const userId = userCredential.user.uid;
    
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
    
        const token = await userCredential.user.getIdToken();
    
        res.status(200).json({ userData, token });
      } catch (error) {
        console.error("Login failed:", error.message);
        res.status(400).json({ message: "Invalid email or password" });
      }
}
