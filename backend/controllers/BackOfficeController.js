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
        isVerified: true,
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
    const feedbacksRef = collection(db, "feedbacks");
    const q = query(feedbacksRef, where("type", "==", feedbackType));

    const querySnapshot = await getDocs(q);
    const feedbacks = [];

    querySnapshot.forEach((doc) => {
      feedbacks.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error getting feedback documents:", error.message);
    res.status(500).json({ message: "Error retrieving feedbacks" });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  const { feedbackId } = req.params;
  const { status } = req.body;

  try {
    const feedbacksCollectionRef = collection(db, "feedbacks");
    const q = query(
      feedbacksCollectionRef,
      where("feedbackId", "==", feedbackId)
    );
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

    res.status(200).json({ message: "Feedback status updated successfully" });
  } catch (error) {
    console.error("Error updating feedback status:", error.message);
    res.status(500).json({ message: "Failed to update feedback status" });
  }
};

export const updateOnboardingStatus = async (req, res) => {
  const { collegeId } = req.params;
  const { status, message } = req.body;

  try {
    const feedbacksCollectionRef = collection(db, "users");
    const q = query(feedbacksCollectionRef, where("userId", "==", collegeId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    querySnapshot.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          onboardingStatus: status || doc.data().status,
          notifications: arrayUnion({ content: message, date: Date.now() }),
        });
      } catch (updateError) {
        throw updateError;
      }
    });

    res.status(200).json({ message: "Feedback status updated successfully" });
  } catch (error) {
    console.error("Error updating feedback status:", error.message);
    res.status(500).json({ message: "Failed to update feedback status" });
  }
};

export const addTeamMember = async (req, res) => {
  const {
    name,
    dob,
    gender,
    bloodGroup,
    position,
    joiningYear,
    mobileNo,
    address,
    // employeePicture
  } = req.body;

  try {
    const teamCollectionRef = collection(db, "team");

    const teamData = {
      name,
      dob,
      gender,
      bloodGroup,
      position,
      joiningYear,
      mobileNo,
      address,
      // employeePicture
    };

    const docRef = await addDoc(teamCollectionRef, teamData);

    console.log("Team registered successfully with ID: ", docRef.id);

    res.status(200).json({ message: "Team registered successfully" });
  } catch (error) {
    console.error("Error registering Team:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const fetchTeam = async (req, res) => {
  try {
    const teamCollectionRef = collection(db, "team");
    const querySnapshot = await getDocs(teamCollectionRef);

    const team = [];
    querySnapshot.forEach((doc) => {
      const teams = {
        id: doc.id,
        ...doc.data(),
      };
      team.push(teams);
    });

    res.status(200).json(team);
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const {
    courseName,
    instructorName,
    price,
    briefDescription,
    rating,
    courseDuration,
    courseLevel,
    language,
    detailedDescription,
    aboutInstructor,
    whatYouWillLearn,
  } = req.body;

  try {
    const docRef = await addDoc(collection(db, "courses"), {
      courseName,
      instructorName,
      price,
      briefDescription,
      rating,
      courseDuration,
      courseLevel,
      language,
      detailedDescription,
      aboutInstructor,
      whatYouWillLearn,
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

export const fetchApplicants = async (req, res) => {
  try {
    const applicantsRef = collection(db, "applications");
    const snapshot = await getDocs(applicantsRef);
    const applicantsList = [];

    snapshot.forEach((doc) => {
      applicantsList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(applicantsList);
  } catch (error) {
    console.error("Error fetching applicants: ", error);
    res.status(500).json({ error: "Failed to fetch applicants" });
  }
};

export const addJobOpening = async (req, res) => {
  const {
    jobTitle,
    jobDescription,
    jobResponsibilities,
    jobSkills,
    jobLocation,
    jobEducation,
    jobExperience,
    jobDesignation,
    jobOpenPositions,
  } = req.body;

  try {
    const jobCollectionRef = collection(db, "jobs"); // Assuming 'jobs' is your Firestore collection for job openings

    const jobData = {
      jobTitle,
      jobDescription,
      jobResponsibilities,
      jobSkills,
      jobLocation,
      jobEducation,
      jobExperience,
      jobDesignation,
      jobOpenPositions,
    };

    const docRef = await addDoc(jobCollectionRef, jobData);

    console.log("Job opening added successfully with ID: ", docRef.id);

    res.status(200).json({ message: "Job opening added successfully" });
  } catch (error) {
    console.error("Error adding job opening:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getJobOpenings = async (req, res) => {
  try {
    const jobCollectionRef = collection(db, "jobs");

    const snapshot = await getDocs(jobCollectionRef);

    if (snapshot.empty) {
      console.log("No job openings found.");
      return res.status(404).json({ message: "No job openings found" });
    }

    const jobOpenings = [];

    snapshot.forEach((doc) => {
      jobOpenings.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(jobOpenings);
  } catch (error) {
    console.error("Error fetching job openings:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching job openings", error: error.message });
  }
};

// export const createEvent = async (req, res) => {

//   const { message, date, targets } = req.body;

//   try {
//     const feedbacksCollectionRef = collection(db, 'users');
//     const q = query(feedbacksCollectionRef, where("accountType", "==", type));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       return res.status(404).json({ message: "Feedback not found" });
//     }

//     querySnapshot.forEach(async (doc) => {
//       try {
//         await updateDoc(doc.ref, {
//           events: arrayUnion({message, date, createdAt: Date.now()})
//         });
//       } catch (updateError) {
//         throw updateError;
//       }
//     });

//     res.status(200).json({ message: 'Event created successfully' });
//   } catch (error) {
//     console.error('Error creating event:', error.message);
//     res.status(500).json({ message: 'Failed to create event' });
//   }
// };

export const createEvent = async (req, res) => {
  const { message, date, targets } = req.body;

  try {

    const docRef = await addDoc(collection(db, "events"), {
      message, 
      date, 
      targets,
      createdAt: Date.now()
    });

    console.log("Document written with ID: ", docRef.id);

    for (let target of targets) {
      const feedbacksCollectionRef = collection(db, "users");
      const q = query(
        feedbacksCollectionRef,
        where("accountType", "==", target)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(`No users found with accountType: ${target}`);
        continue;
      }

      querySnapshot.forEach(async (doc) => {
        try {
          await updateDoc(doc.ref, {
            events: arrayUnion({ message, date, createdAt: Date.now() }),
          });
          console.log(`Event added for user with accountType ${target}`);
        } catch (updateError) {
          console.error(`Error updating user document: ${updateError.message}`);
        }
      });
    }

    res.status(200).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const eventsRef = collection(db, "events");
    const snapshot = await getDocs(eventsRef);
    const eventsList = [];

    snapshot.forEach((doc) => {
      eventsList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(eventsList);
  } catch (error) {
    console.error("Error fetching events: ", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};