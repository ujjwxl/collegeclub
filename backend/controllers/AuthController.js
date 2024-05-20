// import bcrypt from "bcryptjs";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, updateDoc } from "firebase/firestore";
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
        profileFormFilled: true,
      });

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

// export const completeProfileForm = async (req, res) => {
//   const { userId } = req.params;
//   const {
//     universityFullName,
//     universityShortName,
//     foundedYear,
//     approvedBy,
//     rankedBy,
//     contactNumber,
//     email,
//     website,
//     fullAddress,
//     pinCode,
//     country,
//     state,
//     district,
//     alternateContact,
//     alternateNumber,
//     referralCode,
//     companyName,
//   } = req.body;

//   try {
//     const usersCollectionRef = collection(db, "users");
//     const q = query(usersCollectionRef, where("userId", "==", userId));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     querySnapshot.forEach(async (doc) => {
//       const docRef = doc.ref;

//       if (companyName) { // If companyName exists, it's a company profile
//         await updateDoc(docRef, {
//           companyName,
//           foundedYear,
//           contactNumber,
//           email,
//           website,
//           fullAddress,
//           pinCode,
//           country,
//           state,
//           district,
//           alternateContact,
//           alternateNumber,
//           referralCode,
//           profileFormFilled: true
//         });
//         console.log('Company profile form updated successfully');
//       } else { // Otherwise, it's a college profile
//         await updateDoc(docRef, {
//           universityFullName,
//           universityShortName,
//           foundedYear,
//           approvedBy,
//           rankedBy,
//           contactNumber,
//           email,
//           website,
//           fullAddress,
//           pinCode,
//           country,
//           state,
//           district,
//           alternateContact,
//           alternateNumber,
//           referralCode,
//           profileFormFilled: true
//         });
//         console.log('College profile form updated successfully');
//       }
//     });

//     res.status(200).json({ message: "Profile form updated successfully" });
//   } catch (error) {
//     console.error("Error updating user profile:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

export const completeDetailsForm = async (req, res) => {
  const { userId } = req.params;

  const {
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
    selectedInstituteType,
    studyMode,
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
        instituteType: selectedInstituteType,
        studyMode,
        detailsFormFilled: true,
      });

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

// export const completeDetailsForm = async (req, res) => {
//   const { userId } = req.params;

//   const {
//     selectedCourses,
//     aboutCollege,
//     admissionProcess,
//     courses,
//     departments,
//     news,
//     rankings,
//     overallPlacement,
//     promo,
//     scholarship,
//     selectedInstituteType,
//     studyMode,
//     aboutCompany, // New fields for company details
//     companyMission,
//     registrationNumber,
//     industryType
//   } = req.body;

//   try {
//     const usersCollectionRef = collection(db, "users");
//     const q = query(usersCollectionRef, where("userId", "==", userId));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     querySnapshot.forEach(async (doc) => {
//       const docRef = doc.ref;

//       if (aboutCompany) { // If aboutCompany exists, it's a company profile
//         await updateDoc(docRef, {
//           aboutCompany,
//           companyMission,
//           news,
//           registrationNumber,
//           promo,
//           industryType,
//           detailsFormFilled: true
//         });
//         console.log('Company details form updated successfully');
//       } else { // Otherwise, it's a college profile
//         await updateDoc(docRef, {
//           selectedCourses,
//           aboutCollege,
//           admissionProcess,
//           courses,
//           departments,
//           news,
//           rankings,
//           overallPlacement,
//           promo,
//           scholarship,
//           instituteType:selectedInstituteType,
//           studyMode,
//           detailsFormFilled: true
//         });
//         console.log('College details form updated successfully');
//       }
//     });

//     res.status(200).json({ message: "Details form updated successfully" });
//   } catch (error) {
//     console.error("Error updating user details:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

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

// export const getCoursesByType = async (req, res) => {
//   const { courseType } = req.params;

//   console.log(courseType);

//   try {
//     const usersCollectionRef = collection(db, "users");
//     const q = query(usersCollectionRef, where("accountType", "==", "College"));
//     const querySnapshot = await getDocs(q);

//     const courses = [];
//     querySnapshot.forEach(doc => {
//       const college = doc.data();
//       college.courses.forEach(course => {
//         if (course.courseType === courseType) {
//           courses.push({
//             collegeName: college.organizationName,
//             courseName: course.courseName,
//             duration: course.duration,
//             fee: course.fee,
//           });
//         }
//       });
//     });

//     res.status(200).json({ courses });
//   } catch (error) {
//     console.error("Error fetching courses by type:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

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
      educationalQualification,
      createdBy: userId
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

// export const getJobsByUserId = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const q = query(collection(db, "jobs"), where("createdBy", "==", userId));
//     const querySnapshot = await getDocs(q);
    
//     const jobs = [];
//     querySnapshot.forEach((doc) => {
//       jobs.push({ id: doc.id, ...doc.data() });
//     });

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error("Error getting jobs by user ID:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getJobsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = query(collection(db, "jobs"), where("createdBy", "==", userId));
    const querySnapshot = await getDocs(q);

    const jobs = [];
    for (const docRef of querySnapshot.docs) {
      const jobData = docRef.data();

      // Use collection() for querying collections and doc() for referencing documents
      const userQ = query(collection(db, "users"), where("userId", "==", jobData.createdBy));
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
