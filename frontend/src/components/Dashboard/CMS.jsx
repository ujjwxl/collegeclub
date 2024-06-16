import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateJob.css";
import "./CMS.css";
import jobsIcon from "../../assets/suitcase.png";
import leadsIcon from "../../assets/leads-icon.png";
import { toast } from "sonner";

const StudentOpenings = () => {
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

  const userId = localStorage.getItem("id");

  const handleClick = (event) => {
    const key = event.currentTarget.getAttribute("data-key");
    setActiveDiv(key);
  };

  const handleSidebarOptionClick = (option) => {
    setSidebarOption(option);
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
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  const handleFileUpload = (file, endpoint) => {};

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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = () => {
    if (activeDiv === "Student Cell") {
      if (sidebarOption === "second-option") {
        return (
          <div className="table-container">
          <h2>List of Registered Students</h2>
            <table className="college-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <form>
            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="fullName">Full Name*</label>
                <input
                  type="text"
                  placeholder="Enter the full name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="dateOfBirth">Date of Birth*</label>
                <input
                  type="date"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  value={dateOfBirth}
                  required
                />
              </div>
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="course">Course*</label>
                <input
                  type="text"
                  placeholder="Enter course"
                  onChange={(e) => setCourse(e.target.value)}
                  value={course}
                  required
                />
              </div>

              <div className="form-input-group form-select apply-form-select">
                <label htmlFor="gender">Gender*</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select gender*</option>
                  {genders.map((gender) => (
                    <option key={gender.value} value={gender.value}>
                      {gender.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  placeholder="Enter the email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="phoneNumber">Phone Number*</label>
                <input
                  type="text"
                  placeholder="Enter the phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  required
                />
              </div>
            </div>
            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="bloodGroup">Blood Group*</label>
                <input
                  type="text"
                  placeholder="Enter blood group"
                  onChange={(e) => setBloodGroup(e.target.value)}
                  value={bloodGroup}
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="uploadPhoto">Upload Photo*</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  required
                />
              </div>
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="fatherName">Father's Name*</label>
                <input
                  type="text"
                  placeholder="Enter father's name"
                  onChange={(e) => setFatherName(e.target.value)}
                  value={fatherName}
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="motherName">Mother's Name*</label>
                <input
                  type="text"
                  placeholder="Enter mother's name"
                  onChange={(e) => setMotherName(e.target.value)}
                  value={motherName}
                  required
                />
              </div>
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="rollNo">Roll No.*</label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  onChange={(e) => setRollNo(e.target.value)}
                  value={rollNo}
                  required
                />
              </div>
              <div className="form-input-group">
                <label htmlFor="session">Session*</label>
                <input
                  type="text"
                  placeholder="Enter session"
                  onChange={(e) => setSession(e.target.value)}
                  value={session}
                  required
                />
              </div>
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              {/* <div className="form-input-group">
              <label htmlFor="session">Session*</label>
              <input
                type="text"
                placeholder="Enter session"
                onChange={(e) => setSession(e.target.value)}
                value={session}
                required
              />
            </div> */}

              <div className="form-input-group">
                <label htmlFor="address">Address*</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
        <form>
          <div className="form-input-group">
            <label htmlFor="jobTitle">Job Title*</label>
            <input type="text" placeholder="Enter the job title" required />
          </div>
          <button className="form-submit-button">Continue</button>
        </form>
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

export default StudentOpenings;
