import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateJob.css";
import "./CMS.css";
import jobsIcon from "../../assets/suitcase.png";
import leadsIcon from "../../assets/leads-icon.png";
import { toast } from "sonner";

const CompanyCMS = () => {
  const [activeDiv, setActiveDiv] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [position, setPosition] = useState("");
  const [joiningYear, setJoiningYear] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const [sidebarOption, setSidebarOption] = useState("");
  const [studentDetailsPage, setStudentDetailsPage] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [events, setEvents] = useState([]);
  const [target, setTarget] = useState("");

  const userId = localStorage.getItem("id");

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
        `http://localhost:5000/auth/getallemployees/${userId}`
      );
      setStudents(response.data);
      console.log(students);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    const fetchEventsByTarget = async () => {
      try {
        const storedTarget = localStorage.getItem("type");
        if (!storedTarget) {
          throw new Error("Target type not found in local storage");
        }
        setTarget(storedTarget);

        const response = await fetch(
          `http://localhost:5000/auth/getEvents/${storedTarget}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEventsByTarget();
  }, []);

  const handleFileUpload = (file, endpoint) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let imageURL = "";

        if (selectedImage) {
          const formData = new FormData();
          formData.append("filename", selectedImage);

          const uploadResponse = await axios.post(
            `http://localhost:5000/upload/employeeprofilepicture/${userId}`,
            formData
          );
          console.log("File uploaded successfully");
          imageURL = uploadResponse.data.downloadURL;
          console.log("imageURL:", imageURL);
        }

      axios
        .post(`http://localhost:5000/auth/submitemployeedetails/${userId}`, {
          name,
          dob,
          gender,
          bloodGroup,
          position,
          joiningYear,
          mobileNo,
          address,
          employeePicture: imageURL,
        })
        .then((response) => {
          if (response.status == 200) {
            toast("Employee registered successfully!");
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

  const showStudentDetails = (student) => {
    setStudentDetailsPage(true);
    setSelectedStudent(student);
  };

  const renderForm = () => {
    if (activeDiv === "Student Cell") {
      if (sidebarOption === "second-option" && studentDetailsPage) {
        return (
          <div className="cms-student-details">
            <h2>Employee Details</h2>
            <div className="cms-student-details-header">
              <h1>{selectedStudent.name}</h1>
              <img src={selectedStudent.employeePicture} alt="Student" />
            </div>

            <div className="cms-student-detail">
              <strong>Address:</strong> {selectedStudent.address}
            </div>
            <div className="cms-student-detail">
              <strong>Blood Group:</strong> {selectedStudent.bloodGroup}
            </div>
            <div className="cms-student-detail">
              <strong>Date of Birth:</strong> {selectedStudent.dob}
            </div>
            <div className="cms-student-detail">
              <strong>Gender:</strong> {selectedStudent.gender}
            </div>
            <div className="cms-student-detail">
              <strong>Phone Number:</strong> {selectedStudent.mobileNo}
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
                  <th>Mobile No.</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.mobileNo}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="form-submit-button"
                        style={{ width: "70%" }}
                        onClick={() => showStudentDetails(student)}
                      >
                        View More
                      </button>
                    </td>
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
                <label htmlFor="name">Name*</label>
                <input
                  type="text"
                  placeholder="Enter the full name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="dob">Date of Birth*</label>
                <input
                  type="date"
                  onChange={(e) => setDOB(e.target.value)}
                  value={dob}
                  required
                />
              </div>
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group ">
                <label htmlFor="gender">Gender*</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="gender"
                >
                  <option value="">Select Gender*</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

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
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="position">Position*</label>
                <input
                  type="text"
                  placeholder="Enter position"
                  onChange={(e) => setPosition(e.target.value)}
                  value={position}
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="joiningYear">Joining Year*</label>
                <input
                  type="text"
                  placeholder="Enter joining year"
                  onChange={(e) => setJoiningYear(e.target.value)}
                  value={joiningYear}
                  required
                />
              </div>
            </div>

            <div className="form-input-flex-two create-job-input-flex">
              <div className="form-input-group">
                <label htmlFor="mobileNo">Mobile No.*</label>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  onChange={(e) => setMobileNo(e.target.value)}
                  value={mobileNo}
                  required
                />
              </div>

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
            <div className="form-input-flex-two create-job-input-flex">
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

            <button className="form-submit-button" onClick={handleSubmit}>
              Continue
            </button>
          </form>
        );
      }
    } else if (activeDiv === "Events") {
      return (
        <>
        <h2>Events</h2>
        <div className="events-list">
          {events.length > 0 ? (
            <div className="event-cards">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-card-content">
                    <h3>{event.message}</h3>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events-msg">No events found</p>
          )}
        </div>
        </>
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
              Employee Directory
            </h2>
          </div>
          <div
            className={activeDiv === "Events" ? "active" : ""}
            onClick={handleClick}
            onFocus={handleFocus}
            tabIndex="0"
            data-key="Events"
          >
            <img className="leadimg" src={jobsIcon} alt="jobs icon"></img>
            <h2
              tabIndex="-1"
              className={activeDiv === "Events" ? "active" : ""}
              onClick={handleClick}
              onFocus={handleFocus}
            >
              Events
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
                  Register <br /> Employee
                </h3>
              </div>

              <div
                className="cms-sidebar-second-option"
                onClick={() => handleSidebarOptionClick("second-option")}
              >
                <img src={jobsIcon} alt="" />
                <h3>
                  View all <br /> Employees
                </h3>
              </div>
            </div>

            <div className="cms-form">{renderForm()}</div>
          </div>
        )}

        {activeDiv === "Events" && <div>{renderForm()}</div>}
        <div className="college-cms-bottom-navigation"></div>
      </div>
    </div>
  );
};

export default CompanyCMS;
