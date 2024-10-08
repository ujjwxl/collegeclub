import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
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
import { v4 as uuidv4 } from "uuid";

// export const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     const adminsCollectionRef = collection(db, "team");
//     const q = query(adminsCollectionRef, where("email", "==", email));
//     const querySnapshot = await getDocs(q);

//     let userData;
//     querySnapshot.forEach((doc) => {
//       userData = doc.data();
//     });

//     if(userData.status === "Inactive")  res.status(400).json({ message: "Invalid email or password" }); 

//     if (!userData) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ userData });
//   } catch (error) {
//     console.error("Login failed:", error.message);
//     res.status(400).json({ message: "Invalid email or password" });
//   }
// };


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const adminsCollectionRef = collection(db, "team");
    const q = query(adminsCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let userData;
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });

    // Check if userData exists
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check user status
    if (userData.status === "Inactive") {
      return res.status(400).json({ message: "User is inactive. Login not allowed." });
    }

    // If user status is active, proceed with sending user data
    res.status(200).json({ userData });

  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(400).json({ message: "Invalid email or password" });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};


export const createAdmin = async (req, res) => {
  const { email, password, role, name, mobileNo } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userId = user.uid;

    const docRef = await addDoc(collection(db, "admins"), {
      email,
      password,
      role,
      userId,
      name, 
      mobileNo,
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

export const getAdminRole = async (req, res) => {
  const { userId } = req.params;

  try {
    
    const adminsCollectionRef = collection(db, "team");
    const q = query(adminsCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    let userData;
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });

    const role = userData.role;

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ role });
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
    email,
    password,
    role
    // employeePicture
  } = req.body;

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userId = user.uid;
    
    const teamCollectionRef = collection(db, "team");
    // const employeeID = uuidv4();
    const teamData = {
      name,
      dob,
      gender,
      bloodGroup,
      position,
      joiningYear,
      mobileNo,
      address,
      status:"Active",
      userId,
      email,
      password,
      role
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
    category,
    courseDuration,
    courseLevel,
    language,
    detailedDescription,
    aboutInstructor,
    whatYouWillLearn,
  } = req.body;

  console.log(category);


  const courseId = uuidv4();

  try {
    const docRef = await addDoc(collection(db, "courses"), {
      courseName,
      instructorName,
      courseId,
      price,
      briefDescription,
      rating,
      category,
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
    const eventId = uuidv4();

    const docRef = await addDoc(collection(db, "events"), {
      id: eventId,
      message,
      date,
      targets,
      createdAt: Date.now(),
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
            events: arrayUnion({
              id: eventId,
              message,
              date,
              createdAt: Date.now(),
            }),
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

export const getAllCourseApplications = async (req, res) => {
  try {
    const courseApplicationsRef = collection(db, "courseapplications");
    const snapshot = await getDocs(courseApplicationsRef);
    const courseApplicationsList = [];

    snapshot.forEach((doc) => {
      courseApplicationsList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(courseApplicationsList);
  } catch (error) {
    console.error("Error fetching events: ", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getPaidCourseApplicants = async (req, res) => {
  try {
    const courseApplicationsRef = collection(db, "paidcourseapplicants");
    const snapshot = await getDocs(courseApplicationsRef);
    const courseApplicationsList = [];

    snapshot.forEach((doc) => {
      courseApplicationsList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(courseApplicationsList);
  } catch (error) {
    console.error("Error fetching events: ", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getRolePermissions = async (req, res) => {
  const { role } = req.params;

  try {
    const rolesRef = doc(db, "admin-roles", role);
    const roleDoc = await getDoc(rolesRef);

    const roleData = roleDoc.data();

    res.status(200).json(roleData);
  } catch (error) {
    console.error("Error fetching events: ", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const saveRolePermissions = async (req, res) => {
  const { role } = req.params;
  const { permissions } = req.body;

  console.log(role);
  console.log(permissions);

  try {
    const rolesRef = doc(db, "admin-roles", role);
    const roleDoc = await getDoc(rolesRef);

    if (!roleDoc.exists()) {
      res.status(404).json({ error: "Role not found" });
      return;
    }

    const updateObject = {};
    Object.keys(permissions).forEach((key) => {
      updateObject[key] = permissions[key];
    });

    console.log(updateObject);

    await updateDoc(rolesRef, updateObject);

    res.status(200).json({ message: "Role permissions updated successfully" });
  } catch (error) {
    console.error("Error updating role permissions: ", error);
    res.status(500).json({ error: "Failed to update role permissions" });
  }
};

export const fetchLeads =async(req, res)=>{
  try {
    const leadsCollectionRef = collection(db, "leads");
    const querySnapshot = await getDocs(leadsCollectionRef);

    const leadsData = [];
    querySnapshot.forEach((doc) => {
      leadsData.push(doc.data());
    });

    res.status(200).json({ leads: leadsData });
  } catch (error) {
    console.error("Error fetching leads data:", error.message);
    res.status(500).json({ message: error.message });
  }
};



export const getLeadByApplicationNumber = async (req, res) => {
  const { applicationNumber } = req.params;

  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, where('applicationNumber', '==', applicationNumber));

    const querySnapshot = await getDocs(q);
    const leads = [];

    querySnapshot.forEach((doc) => {
      leads.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    if (leads.length === 0) {
      return res.status(404).json({ message: 'No leads found' });
    }

    res.status(200).json(leads[0]);
  } catch (error) {
    console.error('Error getting lead documents:', error.message);
    res.status(500).json({ message: 'Error retrieving leads' });
  }
};

export const shareLeads = async (req, res) => {
  const { applicationNumber } = req.params;
  const { colleges, companies } = req.body;

  try {
    for (const college of colleges) {
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('userId', '==', college.userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(`User with userId ${college.userId} not found`);
        continue;
      }

      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;

        await updateDoc(docRef, {
          leads: arrayUnion(applicationNumber),
        });

        console.log(`Leads updated for college with userId ${college.userId}`);
      });
    }

    for (const company of companies) {
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('userId', '==', company.userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(`User with userId ${company.userId} not found`);
        continue;
      }

      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;

        await updateDoc(docRef, {
          leads: arrayUnion(applicationNumber),
        });

        console.log(`Leads updated for company with userId ${company.userId}`);
      });
    }

    res.status(200).json({ message: 'Leads updated successfully' });
  } catch (error) {
    console.error('Error updating leads:', error.message);
    res.status(500).json({ message: 'Error updating leads' });
  }
};


export const updateLeadStatus = async (req, res) => {
  const { applicationNumber } = req.params;
  const { status } = req.body;

  try {
    const leadsCollectionRef = collection(db, 'leads');
    const q = query(leadsCollectionRef, where('applicationNumber', '==', applicationNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Lead not found' });
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

    res.status(200).json({ message: 'Lead status updated successfully' });
  } catch (error) {
    console.error('Error updating lead status:', error.message);
    res.status(500).json({ message: 'Failed to update lead status' });
  }
};


export const updateEmployeeStatus = async (req, res) => {
  const { userId } = req.params; // Assuming employeeID is passed as a parameter
  const { status } = req.body; // 'Active' or 'Inactive'

  try {
    const teamCollectionRef = collection(db, 'team');
    const q = query(teamCollectionRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    querySnapshot.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          status: status || doc.data().status, // Update status if provided, else keep current status
        });
      } catch (updateError) {
        throw updateError;
      }
    });

    res.status(200).json({ message: 'Team member status updated successfully' });
  } catch (error) {
    console.error('Error updating team member status:', error.message);
    res.status(500).json({ message: 'Failed to update team member status' });
  }
};

export const addFAQ = async (req, res) => {

  const { question, answer } = req.body;

  const faqID = uuidv4();

  try {
    const faqsCollectionRef = collection(db, "faqs");

    const faqData = {
      faqID,
      question,
      answer,
      isOpen: true
    };

    const docRef = await addDoc(faqsCollectionRef, faqData);

    console.log("FAQ added successfully with ID: ", docRef.id);

    res.status(200).json({ message: "FAQ added successfully", faqData });
  } catch (error) {
    console.error("Error adding FAQ:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllFAQs = async (req, res) => {
  try {
    const faqsCollectionRef = collection(db, "faqs");
    const querySnapshot = await getDocs(faqsCollectionRef);

    const faqsData = [];
    querySnapshot.forEach((doc) => {
      faqsData.push(doc.data());
    });

    if (faqsData.length === 0) {
      return res.status(404).json({ message: "No faqs found" });
    }

    res.status(200).json(faqsData);
  } catch (error) {
    console.error("Error getting faqs:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const editCollegeData = async (req, res) => {
  const { collegeId } = req.params;
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
      aboutCollege,
      admissionProcess,
      courses,
      departments,
      news,
      rankings,
      facilities,
      overallPlacement,
      promo,
      scholarship,
      selectedInstituteType,
      studyMode,
  } = req.body;

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
        aboutCollege,
        admissionProcess,
        courses,
        departments,
        news,
        rankings,
        facilities,
        overallPlacement,
        promo,
        scholarship,
        selectedInstituteType,
        studyMode,
      });

      console.log("Profile form updated successfully");
    });

    res.status(200).json({ message: "Profile form updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const editCompanyData = async (req, res) => {
  const { companyId } = req.params;
  const {
    companyName,
    foundedYear,
    headquarter,
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
    aboutCompany,
    companyMission,
    services,
    news,
    registrationNumber,
    promo,
    industryType,
  } = req.body;

  try {
    const usersCollectionRef = collection(db, "users"); // Replace 'companies' with your Firestore collection name
    const q = query(usersCollectionRef, where("userId", "==", companyId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Company not found' });
    }

    querySnapshot.forEach(async (document) => {
      const docRef = document.ref;

      await updateDoc(docRef, {
        organizationName: companyName,
        foundedYear,
        headquarter,
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
        aboutCompany,
        companyMission,
        services,
        news,
        registrationNumber,
        promo,
        industryType,
      });

      console.log('Company data updated successfully');
    });

    res.status(200).json({ message: 'Company data updated successfully' });
  } catch (error) {
    console.error('Error updating company data:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const editAmbassadorData = async (req, res) => {
  const { ambassadorId } = req.params;

  const {
    name,
    gender,
    dob,
    contactNumber,
    linkedin,
    email,
    fullAddress,
    pinCode,
    country,
    state,
    district,
    collegeName,
    collegePincode,
    collegeCountry,
    collegeState,
    collegeDistrict,
    whyJoinUs,
  } = req.body;

  try {
    const usersCollectionRef = collection(db, "users"); 
    const q = query(usersCollectionRef, where("userId", "==", ambassadorId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Ambassador not found' });
    }

    querySnapshot.forEach(async (document) => {
      const docRef = document.ref;

      await updateDoc(docRef, {
        organizationName: name,
        gender,
        dob,
        contactNumber,
        linkedin,
        email,
        fullAddress,
        pinCode,
        country,
        state,
        district,
        collegeName,
        collegePincode,
        collegeCountry,
        collegeState,
        collegeDistrict,
        whyJoinUs,
      });

      console.log('Ambassador data updated successfully');
    });

    res.status(200).json({ message: 'Ambassador data updated successfully' });
  } catch (error) {
    console.error('Error updating ambassador data:', error.message);
    res.status(500).json({ message: error.message });
  }
};
