// import bcrypt from "bcryptjs";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAuth,
  updatePassword
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
// import { auth, db } from "../../firebase.js";
import { auth, db } from "../firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";


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

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userId = user.uid;

    await sendEmailVerification(user);

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
      applicationFormCompleted: false,
      paymentStatus: false,
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
};

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
export const updateProfileForm = async (req, res) => {
  const { userId } = req.params;
  const { fullName, contactNumber } = req.body;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    querySnapshot.forEach(async (doc) => {
      try {
        await updateDoc(doc.ref, {
          fullName: fullName || doc.data().fullName,
          contactNumber: contactNumber || doc.data().contactNumber,
        });
      } catch (updateError) {
        throw updateError;
      }
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
}

export const changePassword = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  
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

export const getCompanies = async (req, res) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("accountType", "==", "Company"));
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
  let {
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

  universityFullName = universityFullName.toLowerCase();
  universityShortName = universityShortName.toLowerCase();
  country = country.toLowerCase();
  state = state.toLowerCase();
  district = district.toLowerCase();

  const universityNameWords = universityFullName.toLowerCase().split(/\s+/);
  const searchKeywords = [...universityNameWords, universityShortName.toLowerCase(), country.toLowerCase(), state.toLowerCase(), district.toLowerCase()];

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
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
        profileFormFilled: true,
      });

      const promises = searchKeywords.map(async keyword => {
        const keywordCollectionRef = doc(db, "keywords", keyword);
        const keywordDocumentRef = await getDoc(keywordCollectionRef);
        const keywordDocumentSnapshot = keywordDocumentRef.exists() ? keywordDocumentRef.data() : {};
    
        keywordDocumentSnapshot.relevantUsers = keywordDocumentSnapshot.relevantUsers || [];
        if (!keywordDocumentSnapshot.relevantUsers.includes(userId)) {
            keywordDocumentSnapshot.relevantUsers.push(userId);
        }
    
        await setDoc(keywordCollectionRef, keywordDocumentSnapshot);
      });

      await Promise.all(promises);

      console.log("Profile form updated successfully");
    });

    res.status(200).json({ message: "Profile form updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: error.message });
  }
};


export const completeCompanyProfileForm = async (req, res) => {
  const { userId } = req.params;
  let {
    companyName, // keyword
    foundedYear,
    headquarter,
    contactNumber,
    email,
    website,
    fullAddress,
    pinCode,
    country, // keyword
    state, // keyword
    district, // keyword
    alternateContact,
    alternateNumber,
    referralCode,
  } = req.body;

    companyName = companyName.toLowerCase();
    country = country.toLowerCase();
    state = state.toLowerCase();
    district = district.toLowerCase();

    const companyNameWords = companyName.toLowerCase().split(/\s+/);
    const searchKeywords = [...companyNameWords, country.toLowerCase(), state.toLowerCase(), district.toLowerCase()];

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
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
        profileFormFilled: true,
      });

      const promises = searchKeywords.map(async keyword => {
        const keywordCollectionRef = doc(db, "keywords", keyword);
        const keywordDocumentRef = await getDoc(keywordCollectionRef);
        const keywordDocumentSnapshot = keywordDocumentRef.exists() ? keywordDocumentRef.data() : {};
    
        keywordDocumentSnapshot.relevantUsers = keywordDocumentSnapshot.relevantUsers || [];
        if (!keywordDocumentSnapshot.relevantUsers.includes(userId)) {
            keywordDocumentSnapshot.relevantUsers.push(userId);
        }
    
        await setDoc(keywordCollectionRef, keywordDocumentSnapshot);
      });

      await Promise.all(promises);

      console.log("Company profile form updated successfully");
    });

    res.status(200).json({ message: "Company form updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const completeAmbassadorProfileForm = async (req, res) => {
  const { userId } = req.params;
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
        profileFormFilled: true,
      });

      console.log("Ambassador profile form updated successfully");
    });

    res.status(200).json({ message: "Ambassador form updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const completeDetailsForm = async (req, res) => {
  const { userId } = req.params;

  const {
    selectedCourses, // array of strings containing multiple words
    selectedFacilities,
    aboutCollege,
    admissionProcess,
    courses, // array of objects, courseName containing multiple words
    departments,
    news,
    rankings,
    overallPlacement,
    promo,
    scholarship,
    selectedInstituteType, // keyword
    studyMode,
  } = req.body;

  // Lowercase and split multiple word strings
  const selectedCoursesWords = selectedCourses.map(course => course.toLowerCase().split(/\s+/)).flat();
  const coursesWords = courses.map(course => course.courseName.toLowerCase().split(/\s+/)).flat();
  const selectedInstituteTypeLower = selectedInstituteType.toLowerCase();

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    querySnapshot.forEach(async (document) => {
      const docRef = document.ref;

      await updateDoc(docRef, {
        selectedCourses,
        selectedFacilities,
        aboutCollege,
        admissionProcess,
        courses,
        departments,
        news,
        rankings,
        overallPlacement,
        promo,
        scholarship,
        instituteType: selectedInstituteTypeLower,
        studyMode,
        detailsFormFilled: true,
      });

      const searchKeywords = [...selectedCoursesWords, ...coursesWords, selectedInstituteTypeLower];
      
      const promises = searchKeywords.map(async keyword => {
        const keywordCollectionRef = doc(db, "keywords", keyword);
        const keywordDocumentRef = await getDoc(keywordCollectionRef);
        const keywordDocumentSnapshot = keywordDocumentRef.exists() ? keywordDocumentRef.data() : {};
    
        keywordDocumentSnapshot.relevantUsers = keywordDocumentSnapshot.relevantUsers || [];
        if (!keywordDocumentSnapshot.relevantUsers.includes(userId)) {
            keywordDocumentSnapshot.relevantUsers.push(userId);
        }
    
        await setDoc(keywordCollectionRef, keywordDocumentSnapshot);
      });

      await Promise.all(promises);

      console.log("Details form updated successfully");
    });

    res.status(200).json({ message: "Details form updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};


export const completeCompanyDetailsForm = async (req, res) => {
  const { userId } = req.params;

  const {
    aboutCompany,
    companyMission,
    services,
    news,
    registrationNumber,
    promo,
    industryType,
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
        aboutCompany,
        companyMission,
        services,
        news,
        registrationNumber,
        promo,
        industryType,
        detailsFormFilled: true,
      });

      console.log("Company details form updated successfully");
    });

    res
      .status(200)
      .json({ message: "Company details form updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const saveFeedback = async (req, res) => {
  const { name, mobileNumber, email, type, message } = req.body;

  try {
    const docRef = await addDoc(collection(db, "feedbacks"), {
      name,
      mobileNumber,
      email,
      type,
      message,
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

export const getCoursesByType = async (req, res) => {
  const { courseType } = req.params;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("accountType", "==", "College"));
    const querySnapshot = await getDocs(q);

    const courses = [];
    querySnapshot.forEach((doc) => {
      const college = doc.data();
      if (college && college.courses) {
        college.courses.forEach((course) => {
          if (course.courseType === courseType) {
            courses.push({
              collegeName: college.organizationName,
              userId: college.userId,
              collegeProfilePicture: college.profilePicture,
              courseName: course.courseName,
              duration: course.duration,
              fee: course.fee,
              distance: course.distance,
              minQualification: course.minQualification,
              district: college.district,
              state: college.state,
              email: college.email,
              contactNumber: college.contactNumber,
              // Add other course details you want to include
            });
          }
        });
      }
    });

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses by type:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("accountType", "==", "College"));
    const querySnapshot = await getDocs(q);

    const courses = [];
    querySnapshot.forEach((doc) => {
      const college = doc.data();
      if (college && college.courses) {
        college.courses.forEach((course) => {
          courses.push({
            collegeName: college.organizationName,
            userId: college.userId,
            collegeProfilePicture: college.profilePicture,
            courseName: course.courseName,
            duration: course.duration,
            fee: course.fee,
            distance: course.distance,
            minQualification: course.minQualification,
            district: college.district,
            state: college.state,
            email: college.email,
            contactNumber: college.contactNumber,
            // Add other course details you want to include
          });
        });
      }
    });

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const submitJobApplication = async (req, res) => {
  const { name, phoneNumber, email, city, state, position, resumeLink } =
    req.body;

  try {
    const docRef = await addDoc(collection(db, "applications"), {
      name,
      phoneNumber,
      email,
      city,
      state,
      position,
      resumeLink,
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

export const completeApplicationForm = async (req, res) => {
  const { userId } = req.params;

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
        applicationFormCompleted: true,
      });

      console.log("Application form completed successfully");
    });

    res
      .status(200)
      .json({ message: "Application form completed successfully" });
  } catch (error) {
    console.error("Error updating user details:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createJobListing = async (req, res) => {
  const { userId } = req.params;

  const {
    positionName,
    jobID,
    jobDescription,
    numberOfPositions,
    jobType,
    industry,
    jobLocation,
    locationType,
    yearsOfExperience,
    skills,
    salary,
    educationalQualification,
  } = req.body;

  try {
    const docRef = await addDoc(collection(db, "jobs"), {
      positionName,
      jobID,
      jobDescription,
      numberOfPositions,
      jobType,
      industry,
      jobLocation,
      locationType,
      yearsOfExperience,
      skills,
      salary,
      educationalQualification,
      createdBy: userId,
      isListed: false,
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

export const getJobsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = query(collection(db, "jobs"), where("createdBy", "==", userId));
    const querySnapshot = await getDocs(q);

    const jobs = [];
    for (const docRef of querySnapshot.docs) {
      const jobData = docRef.data();

      // Use collection() for querying collections and doc() for referencing documents
      const userQ = query(
        collection(db, "users"),
        where("userId", "==", jobData.createdBy)
      );
      const userQuerySnapshot = await getDocs(userQ);

      if (!userQuerySnapshot.empty) {
        // Since userId should be unique, we can directly access the first document
        const userData = userQuerySnapshot.docs[0].data();
        jobs.push({ id: docRef.id, ...jobData, user: userData });
      } else {
        jobs.push({ id: docRef.id, ...jobData, user: null });
      }
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error getting jobs by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const q = query(collection(db, "jobs"));
    const querySnapshot = await getDocs(q);

    const jobs = [];
    for (const docRef of querySnapshot.docs) {
      const jobData = docRef.data();

      // Use collection() for querying collections and doc() for referencing documents
      const userQ = query(
        collection(db, "users"),
        where("userId", "==", jobData.createdBy)
      );
      const userQuerySnapshot = await getDocs(userQ);

      if (!userQuerySnapshot.empty) {
        // Since userId should be unique, we can directly access the first document
        const userData = userQuerySnapshot.docs[0].data();
        jobs.push({ id: docRef.id, ...jobData, user: userData });
      } else {
        jobs.push({ id: docRef.id, ...jobData, user: null });
      }
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error getting jobs by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markJobAsListed = async (req, res) => {
  const { jobId } = req.params;

  try {
    const jobRef = doc(db, "jobs", jobId);
    const jobDoc = await getDoc(jobRef);

    if (jobDoc.exists()) {
      await updateDoc(jobRef, {
        isListed: true,
      });

      res.status(200).json({ message: "Job status updated successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markJobAsDelisted = async (req, res) => {
  const { jobId } = req.params;

  try {
    const jobRef = doc(db, "jobs", jobId); // line
    const jobDoc = await getDoc(jobRef);

    if (jobDoc.exists()) {
      await updateDoc(jobRef, {
        isListed: false,
      });

      res.status(200).json({ message: "Job status updated successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const jobRef = doc(db, "jobs", jobId);
    const jobDoc = await getDoc(jobRef);

    if (jobDoc.exists()) {
      // Delete the job document
      await deleteDoc(jobRef);
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const submitCompanyJobApplication = async (req, res) => {
  const {
    jobName,
    jobId,
    companyName,
    companyId,
    name,
    phoneNumber,
    email,
    city,
    state,
    resumeLink,
  } = req.body;

  try {
    const docRef = await addDoc(collection(db, "companyapplications"), {
      jobName,
      jobId,
      companyName,
      companyId,
      name,
      phoneNumber,
      email,
      city,
      state,
      resumeLink,
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

export const getCompanyJobApplicants = async (req, res) => {
  const { userId } = req.params;

  try {
    const companyApplicationsSnapshot = await getDocs(
      query(collection(db, "companyapplications"), where("companyId", "==", userId))
    );

    const jobApplicants = [];
    companyApplicationsSnapshot.forEach((doc) => {
      jobApplicants.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json(jobApplicants);
  } catch (error) {
    console.error("Error getting job applicants:", error);
    res.status(500).json({ message: "Error getting job applicants" });
  }
};

export const searchRecords = async (req, res) => {
  const { query } = req.query;

  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const matchedUsers = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();

      const matchedUser = {
        userId: userData.userId,
        organizationName: userData.organizationName,
        profilePicture: userData.profilePicture,
        accountType: userData.accountType
      };

      const fields = Object.values(userData);
      const match = fields.some((field) => {
        if (typeof field === 'string' && field.toLowerCase().includes(query.toLowerCase())) {
          return true;
        }
        return false;
      });

      if (match) {
        matchedUsers.push(matchedUser);
      }
    });

    res.status(200).json(matchedUsers);
  } catch (error) {
    console.error("Error searching Firestore:", error);
    res.status(500).json({ message: "Error searching Firestore" });
  }
};

export const searchRelevantUsersFake = async (req, res) => {
  const queryString = req.query.query;

  const givenQueryWords = queryString.trim().toLowerCase().split(/\s+/);
  const queryWords = [...givenQueryWords];

  try {
    const promises = queryWords.map(async keyword => {
      const keywordCollectionRef = doc(db, "keywords", keyword);
      const keywordDocument = await getDoc(keywordCollectionRef);

      if (keywordDocument.exists()) {
        return keywordDocument.data().relevantUsers || [];
      } else {
        return [];
      }
    });

    const results = await Promise.all(promises);
  
    let relevantUserIds = results.length ? results.reduce((acc, val) => acc.filter(id => val.includes(id))) : [];

    // console.log(relevantUserIds);

    const userDataPromises = relevantUserIds.map(async userId => {
      const q = query(collection(db, "users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => {
        const userData = doc.data();
        return {
          userId: userData.userId,
          organizationName: userData.organizationName,
          profilePicture: userData.profilePicture,
          accountType: userData.accountType,
          district: userData.district
        };
      });
      return userData.length > 0 ? userData[0] : null;
    });

    const userDataResults = await Promise.all(userDataPromises);

    const relevantUserData = userDataResults.filter(userData => userData !== null);

    // console.log(relevantUserData);
    res.status(200).json({ relevantUserData });
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const createKeywords = async (req, res) => {
  const { userId } = req.params;

  const {
    organizationName, // will be there
    shortName, // may not be there
    district, // will be there
    state, // will be there
    country, // will be there
    selectedCourses, // may not be there
    courses, // may not be there
    instituteType, // may not be there
    profilePicture, // will be there
    accountType // will be there
  } = req.body;

  const organizationNameWords = organizationName.toLowerCase().split(/\s+/);
  // let searchKeywords = [...organizationNameWords, organizationName.toLowerCase(), country.toLowerCase(), state.toLowerCase(), district.toLowerCase()];
  let searchKeywords = [...organizationNameWords, country.toLowerCase(), state.toLowerCase(), district.toLowerCase()];

  if(shortName != null){
    const shortNameLower = shortName.toLowerCase();
    searchKeywords.push(shortNameLower);
  }

  if(selectedCourses != null){
    const selectedCoursesWords = selectedCourses.toLowerCase().split(/[,\s]+/);
    searchKeywords = [...searchKeywords, ...selectedCoursesWords];
  }

  if(courses != null){
    const coursesWords = courses.toLowerCase().split(/[,\s]+/);
    searchKeywords = [...searchKeywords, ...coursesWords];
  }

  if(instituteType != null) {
    const instituteTypeLower = instituteType.toLowerCase();
    searchKeywords.push(instituteTypeLower);
  }

  const promises = searchKeywords.map(async keyword => {
    const keywordCollectionRef = doc(db, "keywordstest", keyword);
    const keywordDocumentRef = await getDoc(keywordCollectionRef);
    const keywordDocumentSnapshot = keywordDocumentRef.exists() ? keywordDocumentRef.data() : {};

    keywordDocumentSnapshot.relevantUsers = keywordDocumentSnapshot.relevantUsers || [];
    // if (!keywordDocumentSnapshot.relevantUsers.includes(userId)) {
    //     keywordDocumentSnapshot.relevantUsers.push(userId);
    // }

    const keywordString = userId + ';' + organizationName + ';' + district + ';' + state + ';' + profilePicture  + ';' + accountType;
    if(!keywordDocumentSnapshot.relevantUsers.includes(keywordString)) {
      keywordDocumentSnapshot.relevantUsers.push(keywordString);
    }
    
    await setDoc(keywordCollectionRef, keywordDocumentSnapshot);
  });

  await Promise.all(promises);
}

export const searchRelevantUsersNew = async (req, res) => {
  const queryString = req.query.query;
  const queryWords = queryString.trim().toLowerCase().split(/\s+/);

  try {
    const promises = queryWords.map(async (keyword) => {
      const startAt = doc(db, "keywordstest", keyword);
      const endAt = doc(db, "keywordstest", keyword + '\uffff');

      const q = query(collection(db, "keywordstest"), where('__name__', '>=', startAt), where('__name__', '<', endAt));
      const querySnapshot = await getDocs(q);

      const relevantUsers = querySnapshot.docs.flatMap(doc => doc.data().relevantUsers || []);
      return relevantUsers;
    });

    const allRelevantUsers = (await Promise.all(promises));
    // console.log(allRelevantUsers);

    const arrayOfArrays = Array.from(allRelevantUsers);
    // console.log(arrayOfArrays);

    const relevantUserIds = arrayOfArrays.reduce((acc, currentArray) => {
      if (acc.length === 0) {
        return currentArray;
      } else {
        return acc.filter(element => currentArray.includes(element));
      }
    }, []);

    console.log(relevantUserIds);

    const relevantUsers = relevantUserIds.map(userString => {
      const [userId, organizationName, district, state, profilePicture, accountType] = userString.split(';');
      return {
        userId,
        organizationName,
        district,
        state,
        profilePicture,
        accountType
      };
    });

    res.status(200).json(relevantUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchRelevantUsers = async (req, res) => {
  const queryString = req.query.query;
  const queryWords = queryString.trim().toLowerCase().split(/\s+/);

  try {
    const promises = queryWords.map(async (keyword) => {
      const startAt = doc(db, "keywords", keyword);
      const endAt = doc(db, "keywords", keyword + '\uffff');

      const q = query(collection(db, "keywords"), where('__name__', '>=', startAt), where('__name__', '<', endAt));
      const querySnapshot = await getDocs(q);

      const relevantUsers = querySnapshot.docs.flatMap(doc => doc.data().relevantUsers || []);
      return relevantUsers;
    });

    const allRelevantUsers = (await Promise.all(promises));

    const arrayOfArrays = Array.from(allRelevantUsers);

    const relevantUserIds = arrayOfArrays.reduce((acc, currentArray) => {
      if (acc.length === 0) {
        return currentArray;
      } else {
        return acc.filter(element => currentArray.includes(element));
      }
    }, []);

    // console.log(relevantUserIds);

    const userDataPromises = relevantUserIds.map(async userId => {
      const q = query(collection(db, "users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => {
        const userData = doc.data();
        return {
          userId: userData.userId,
          organizationName: userData.organizationName,
          profilePicture: userData.profilePicture,
          accountType: userData.accountType,
          district: userData.district
        };
      });
      return userData.length > 0 ? userData[0] : null;
    });

    const userDataResults = await Promise.all(userDataPromises);

    const relevantUserData = userDataResults.filter(userData => userData !== null);

    res.status(200).json({ relevantUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const completeCourseApplication = async (req, res) => {
  const { userId } = req.params;

  const {
    fullName,
    dateOfBirth,
    gender,
    email,
    phoneNumber,
    courseId,
    courseName,
    organizationName,
    hasBachelorsDegree,
    bachelorsDegreeOrganization,
    isPursuingBachelorsDegree,
    pursuingBachelorsDegreeOrganization,
    pursuingBachelorsDegreeEndDate,
    isWorking,
    workingOrganization
  } = req.body;

  try {
    const docRef = await addDoc(collection(db, "courseapplications"), {
      fullName,
      applicantId: userId,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      courseId,
      courseName,
      organizationName,
      hasBachelorsDegree,
      bachelorsDegreeOrganization,
      isPursuingBachelorsDegree,
      pursuingBachelorsDegreeOrganization,
      pursuingBachelorsDegreeEndDate,
      isWorking,
      workingOrganization
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

export const getUserCourses = async (req, res) => {
  const { userId } = req.params;

  try {

    const purchasedCoursesSnapshot = await getDocs(
      query(collection(db, "users"), where("userId", "==", userId))
    );

    const purchasedCourses = [];
    purchasedCoursesSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.purchasedCourses) {
        userData.purchasedCourses.forEach((course) => {
          purchasedCourses.push(course);
        });
      }
    });

    res.status(200).json(purchasedCourses);
  } catch (error) {
    console.error("Error getting user courses:", error);
    res.status(500).json({ message: "Error getting user courses" });
  }
};

export const registerStudentDetails = async (req, res) => {
  const { userId } = req.params;
  const {
    fullName,
    dateOfBirth,
    gender,
    email,
    phoneNumber,
    bloodGroup,
    studentPicture,
    fatherName,
    motherName,
    course,
    rollNo,
    session,
    address
  } = req.body;

  console.log(studentPicture);

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    querySnapshot.forEach(async (document) => {
      const docRef = document.ref;

      const student = {
        fullName,
        dateOfBirth,
        gender,
        email,
        phoneNumber,
        bloodGroup,
        studentPicture,
        fatherName,
        motherName,
        course,
        rollNo,
        session,
        address
      };

      await updateDoc(docRef, {
        students: arrayUnion(student)
      });

      console.log("Student registered successfully");
    });

    res.status(200).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  const { userId } = req.params;
  console.log("YAHOO");

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    let students = [];

    querySnapshot.forEach((document) => {
      const userData = document.data();
      if (userData.students && userData.students.length > 0) {
        students = [...students, ...userData.students];
      }
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: error.message });
  }
};
