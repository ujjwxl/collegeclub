import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateJob.css";
import "./CMS.css";
import jobsIcon from "../../assets/suitcase.png";
import leadsIcon from "../../assets/leads-icon.png";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CMS = () => {
  const [activeDiv, setActiveDiv] = useState(null);
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [course, setCourse] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [session, setSession] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const [sidebarOption, setSidebarOption] = useState("");

  const [studentDetailsPage, setStudentDetailsPage] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);

  const userId = localStorage.getItem("id");

  const navigate= useNavigate();

  const handleClick = (event) => {
    const key = event.currentTarget.getAttribute("data-key");
    setActiveDiv(key);
  };

  const handleSidebarOptionClick = (option) => {
    setSidebarOption(option);
    setSelectedStudent([]);
    setStudentDetailsPage(false);
    if (option === "second-option") {
      fetchAllStudents();
    }
  };

  const handleFocus = (event) => {
    const key = event.currentTarget.getAttribute("data-key");
    setActiveDiv(key);
  };
  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/getallstudents/${userId}`
      );
      setStudents(response.data);
      console.log(students);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  const handleFileUpload = (file, endpoint) => { };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = "";

      if (selectedImage) {
        const formData = new FormData();
        formData.append("filename", selectedImage);

        const uploadResponse = await axios.post(
          `http://localhost:5000/upload/studentprofilepicture/${userId}`,
          formData
        );
        console.log("File uploaded successfully");
        imageURL = uploadResponse.data.downloadURL;
        console.log("imageURL:", imageURL);
      }

      axios
        .post(`http://localhost:5000/auth/submitstudentdetails/${userId}`, {
          fullName,
          dateOfBirth,
          gender,
          email,
          phoneNumber,
          bloodGroup,
          studentPicture: imageURL,
          fatherName,
          motherName,
          course,
          rollNo,
          session,
          address,
        })
        .then((response) => {
          if (response.status == 200) {
            toast("Student registered successfully!");
            fetchAllStudents();
            setFullName("");
            setAddress("");
            setBloodGroup("");
            setCourse("");
            setDateOfBirth("");
            setEmail("");
            setFatherName("");
            setGender("");
            setMotherName("");
            setPhoneNumber("");
            setRollNo("");
            setSession("");
            setSelectedImage(null);
            setStudentPicture(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const showStudentDetails = (student) => {
    setStudentDetailsPage(true);
    setSelectedStudent(student);
  };

  const renderForm = () => {
    if (activeDiv === "Student Cell") {
      if (sidebarOption === "second-option" && studentDetailsPage) {
        return (
          <div className="cms-student-details">
            <h2>Student Details</h2>
            <div className="cms-student-details-header">
              <h1>{selectedStudent.fullName}</h1>
              <img src={selectedStudent.studentPicture} alt="Student" />
            </div>

            <div className="cms-student-detail">
              <strong>Address:</strong> {selectedStudent.address}
            </div>
            <div className="cms-student-detail">
              <strong>Blood Group:</strong> {selectedStudent.bloodGroup}
            </div>
            <div className="cms-student-detail">
              <strong>Course:</strong> {selectedStudent.course}
            </div>
            <div className="cms-student-detail">
              <strong>Date of Birth:</strong> {selectedStudent.dateOfBirth}
            </div>
            <div className="cms-student-detail">
              <strong>Email:</strong> {selectedStudent.email}
            </div>
            <div className="cms-student-detail">
              <strong>Father's Name:</strong> {selectedStudent.fatherName}
            </div>
            <div className="cms-student-detail">
              <strong>Gender:</strong> {selectedStudent.gender}
            </div>
            <div className="cms-student-detail">
              <strong>Mother's Name:</strong> {selectedStudent.motherName}
            </div>
            <div className="cms-student-detail">
              <strong>Phone Number:</strong> {selectedStudent.phoneNumber}
            </div>
            <div className="cms-student-detail">
              <strong>Roll No:</strong> {selectedStudent.rollNo}
            </div>
            <div className="cms-student-detail">
              <strong>Session:</strong> {selectedStudent.session}
            </div>
          </div>
        );
      } else if (sidebarOption === "second-option" && !studentDetailsPage) {
        return (
          <div className="table-container">
            <h2>List of Registered Students</h2>
            <table className="college-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td style={{ textAlign: "center" }}><button className="form-submit-button" style={{ width: "70%" }} onClick={() => showStudentDetails(student)}>View More</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }


      else {
        return (
          <form>
            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="fullName">Name*</label>
                <input
                  type="text"
                  placeholder="Enter the full name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  required
                />
              </div>

              <div class="form-input-group">
                <label for="dateOfBirth">DOB*</label>
                <input
                  type="date"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  value={dateOfBirth}
                  required
                />
              </div>
            </div>

            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="gender">Gender*</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  class="gender"
                >
                  <option value="">Select gender*</option>
                  {genders.map((gender) => (
                    <option key={gender.value} value={gender.value}>
                      {gender.label}
                    </option>
                  ))}
                </select>
              </div>

              <div class="form-input-group">
                <label for="bloodGroup">Blood Group*</label>
                <input
                  type="text"
                  placeholder="Enter blood group"
                  onChange={(e) => setBloodGroup(e.target.value)}
                  value={bloodGroup}
                  required
                />
              </div>
            </div>

            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="phoneNumber">Phone Number*</label>
                <input
                  type="text"
                  placeholder="Enter the phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  required
                />
              </div>

              <div class="form-input-group">
                <label for="email">Email*</label>
                <input
                  type="email"
                  placeholder="Enter the email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>

            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="uploadPhoto">Upload Photo*</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  required
                />
              </div>
            </div>

            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="fatherName">Father's Name*</label>
                <input
                  type="text"
                  placeholder="Enter father's name"
                  onChange={(e) => setFatherName(e.target.value)}
                  value={fatherName}
                  required
                />
              </div>

              <div class="form-input-group">
                <label for="motherName">Mother's Name*</label>
                <input
                  type="text"
                  placeholder="Enter mother's name"
                  onChange={(e) => setMotherName(e.target.value)}
                  value={motherName}
                  required
                />
              </div>
            </div>

            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="address">Address*</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required
                />
              </div>
            </div>

            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="course">Course*</label>
                <input
                  type="text"
                  placeholder="Enter course"
                  onChange={(e) => setCourse(e.target.value)}
                  value={course}
                  required
                />
              </div>

              <div class="form-input-group">
                <label for="session">Session*</label>
                <input
                  type="text"
                  placeholder="Enter session"
                  onChange={(e) => setSession(e.target.value)}
                  value={session}
                  required
                />
              </div>
            </div>

            <div class="form-input-flex-two create-job-input-flex">
              <div class="form-input-group">
                <label for="branch">Branch*</label>
                <input
                  type="text"
                  placeholder="Enter branch"
                  // onChange={(e) => setBranch(e.target.value)}
                  // value={branch}
                />
              </div>

              <div class="form-input-group">
                <label for="rollNo">Roll No.*</label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  onChange={(e) => setRollNo(e.target.value)}
                  value={rollNo}
                  required
                />
              </div>
            </div>


            <button className="form-submit-button" onClick={handleSubmit}>
              Continue
            </button>
          </form>
        );
      }
    } else if (activeDiv === "T&P Cell") {
      return (
        <p>Unfortunately, you have not been invited to participate in the Internships and Placement drive. We will keep you updated.</p>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-box create-job-box">
      <div className="dashboard-box-container create-job-container">
        <input className="cms-search" placeholder="Search"></input>
        <h2>CMS</h2>
        <div className="cms-box">
          <div
            className={activeDiv === "Student Cell" ? "active" : ""}
            onClick={handleClick}
            onFocus={handleFocus}
            tabIndex="0"
            data-key="Student Cell"
          >
            <img className="leadimg" src={leadsIcon} alt="leads icon"></img>
            <h2
              tabIndex="-1"
              className={activeDiv === "Student Cell" ? "active" : ""}
              onClick={handleClick}
              onFocus={handleFocus}
            >
              Student Directory
            </h2>
          </div>
          <div
            className={activeDiv === "T&P Cell" ? "active" : ""}
            onClick={handleClick}
            onFocus={handleFocus}
            tabIndex="0"
            data-key="T&P Cell"
          >
            <img className="leadimg" src={jobsIcon} alt="jobs icon"></img>
            <h2
              tabIndex="-1"
              className={activeDiv === "T&P Cell" ? "active" : ""}
              onClick={handleClick}
              onFocus={handleFocus}
            >
              T&P Cell
            </h2>
          </div>
        </div>

        {activeDiv === "Student Cell" && (
          <div className="student-cell-section">
            <div className="cms-sidebar">
              <div
                className="cms-sidebar-first-option"
                onClick={() => handleSidebarOptionClick("first-option")}
              >
                <img src={leadsIcon} alt="" />
                <h3>
                  Register <br /> Student
                </h3>
              </div>

              <div
                className="cms-sidebar-second-option"
                onClick={() => handleSidebarOptionClick("second-option")}
              >
                <img src={jobsIcon} alt="" />
                <h3>
                  View all <br /> Students
                </h3>
              </div>
            </div>

            <div className="cms-form">{renderForm()}</div>
          </div>
        )}

        {activeDiv === "T&P Cell" && <div>{renderForm()}</div>}
        <div className="college-cms-bottom-navigation"></div>
      </div>
    </div>
  );
};

export default CMS;
