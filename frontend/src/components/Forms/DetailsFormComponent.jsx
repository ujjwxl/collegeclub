import React from "react";
import { useState } from "react";
import axios from "axios";
import "./DetailsFormComponent.css";

const DetailsFormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const courses = [
    "Engineering",
    "Medical",
    "Fashion and Technology",
    "Management",
    "Commerce and Banking",
    "Sciences",
    "Hotel Management",
    "Information Technology",
    "Arts and Humanities",
    "Mass Communication",
    "Nursing",
    "Agriculture",
    "Design",
    "Law",
    "Pharmacy",
    "Dental",
    "Performing Arts",
    "Others",
  ];
  const instituteTypes = [
    "Central",
    "State",
    "Deemed",
    "Private",
    "Autonomous",
  ];

  const [studyMode, setStudyMode]= useState("");

  const [coursesCount, setCoursesCount] = useState(1);
  const [departmentsCount, setDepartmentsCount] = useState(1);
  const [newsCount, setNewsCount] = useState(1);
  const [rankingCount, setRankingCount] = useState(1);
  const [selectedInstituteType, setSelectedInstituteType] = useState("");

  const [aboutCollege, setAboutCollege] = useState("");
  const [admissionProcess, setAdmissionProcess] = useState("");
  const [overallPlacement, setOverallPlacement] = useState("");
  const [promo, setPromo] = useState("");
  const [scholarship, setScholarship] = useState("");

  const userId = sessionStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const coursesData = [];
      for (let i = 0; i < coursesCount; i++) {
        const courseName = e.target[`courseName${i}`].value;
        const minQualification = e.target[`minQualification${i}`].value;
        const duration = e.target[`duration${i}`].value;
        const fee = e.target[`fee${i}`].value;
        const distance = e.target[`distance${i}`].value;
        coursesData.push({
          courseName,
          minQualification,
          duration,
          fee,
          distance,
        });
      }

      const departmentsData = [];
      for (let i = 0; i < departmentsCount; i++) {
        const departmentName = e.target[`departmentName${i}`].value;
        const description = e.target[`description${i}`].value;
        const placementPercentage = e.target[`placementPercentage${i}`].value;
        departmentsData.push({
          departmentName,
          description,
          placementPercentage,
        });
      }

      const newsData = [];
      for (let i = 0; i < newsCount; i++) {
        const newsTitle = e.target[`newsTitle${i}`].value;
        const refLink = e.target[`refLink${i}`].value;
        newsData.push({ newsTitle, refLink });
      }

      const rankingsData = [];
      for (let i = 0; i < rankingCount; i++) {
        const agencyName = e.target[`agencyName${i}`].value;
        const rank = e.target[`rank${i}`].value;
        const year = e.target[`year${i}`].value;
        rankingsData.push({ agencyName, rank, year });
      }

      await axios
        .post(`http://localhost:5000/auth/detailsform/${userId}`, {
          selectedCourses,
          selectedFacilities,
          aboutCollege,
          admissionProcess,
          courses: coursesData,
          departments: departmentsData,
          news: newsData,
          rankings: rankingsData,
          overallPlacement,
          promo,
          scholarship,
          selectedInstituteType, 
          studyMode
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Details form sent successfully!");
          }
        })
        .catch((e) => {
          alert("Please fill all the required fields!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleFacilityChange = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const handleAddCourse = () => {
    setCoursesCount(coursesCount + 1);
  };

  const handleRemoveCourse = () => {
    setCoursesCount(coursesCount - 1);
  };

  const handleAddDepartment = () => {
    setDepartmentsCount(departmentsCount + 1);
  };

  const handleRemoveDepartment = () => {
    setDepartmentsCount(departmentsCount - 1);
  };

  const handleAddNews = () => {
    setNewsCount(newsCount + 1);
  };

  const handleRemoveNews = () => {
    setNewsCount(newsCount - 1);
  };

  const handleAddRanking = () => {
    setRankingCount(rankingCount + 1);
  };

  const handleRemoveRanking = () => {
    setRankingCount(rankingCount - 1);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCourseSelect = (course) => {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleCourseRemove = (course) => {
    setSelectedCourses(selectedCourses.filter((c) => c !== course));
  };

  const handleClick = () => {
    console.log(selectedCourses);
  };

  return (
    <div className="details-form">
      <form onSubmit={handleSubmit}>
        <h2>Business Details</h2>
        <div className="dropdown">
          <div className="dropdown-header" onClick={toggleDropdown}>
            Select Courses
          </div>
          {isOpen && (
            <div className="dropdown-content">
              {courses.map((course) => (
                <div key={course} onClick={() => handleCourseSelect(course)}>
                  {course}
                </div>
              ))}
            </div>
          )}
          <div className="dropdown-selected-items">
            {selectedCourses.map((course) => (
              <div key={course} className="dropdown-selected-item">
                <span>{course}</span>
                <span onClick={() => handleCourseRemove(course)}>&times;</span>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <h3>About college</h3>
        <textarea
          onChange={(e) => setAboutCollege(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <hr />

        <h3>Admission Process</h3>
        <textarea
          onChange={(e) => setAdmissionProcess(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <hr />

        <h3>Courses</h3>
        {[...Array(coursesCount)].map((_, index) => (
          <div className="form-input-flex-two" key={index}>
            <div className="form-input-group">
              <label htmlFor="collegename">Course Name*</label>
              {/* <input type="text" placeholder='Enter the course name' /> */}
              <input
                type="text"
                name={`courseName${index}`}
                placeholder="Enter the course name"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Min. Qualification*</label>
              {/* <input type="text" placeholder='Add qualification' /> */}
              <input
                type="text"
                name={`minQualification${index}`}
                placeholder="Add qualification"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Duration*</label>
              {/* <input type="text" placeholder='Years' /> */}
              <input
                type="text"
                name={`duration${index}`}
                placeholder="Years"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Fee*</label>
              {/* <input type="text" placeholder='Ex- 1-2L' /> */}
              <input type="text" name={`fee${index}`} placeholder="Ex- 1-2L" />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Distance*</label>
              {/* <input type="text" placeholder='YES/NO' /> */}
              <input
                type="text"
                name={`distance${index}`}
                placeholder="YES/NO"
              />
            </div>

            <button
              type="button"
              className="form-remove-button"
              onClick={handleRemoveCourse}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="form-remove-button form-add-button"
          onClick={handleAddCourse}
        >
          ADD
        </button>
        <hr />

        <h3>Departments</h3>
        {[...Array(departmentsCount)].map((_, index) => (
          <div className="form-input-flex-two" key={index}>
            <div className="form-input-group">
              <label htmlFor="collegename">Department Name*</label>
              {/* <input type="text" placeholder='eg: Name' /> */}
              <input
                type="text"
                name={`departmentName${index}`}
                placeholder="eg: Name"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Description*</label>
              {/* <input type="text" placeholder='eg: Details' /> */}
              <input
                type="text"
                name={`description${index}`}
                placeholder="eg: Details"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Placement %*</label>
              {/* <input type="text" placeholder='Years' />    */}
              <input
                type="text"
                name={`placementPercentage${index}`}
                placeholder="Years"
              />
            </div>

            <button
              type="button"
              className="form-remove-button"
              onClick={handleRemoveDepartment}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="form-remove-button form-add-button"
          onClick={handleAddDepartment}
        >
          ADD
        </button>
        <hr />

        <h3>News</h3>
        {[...Array(newsCount)].map((_, index) => (
          <div className="form-input-flex-two" key={index}>
            <div className="form-input-group">
              <label htmlFor="collegename">News Title*</label>
              {/* <input type="text" placeholder='Add news title' /> */}
              <input
                type="text"
                name={`newsTitle${index}`}
                placeholder="Add news title"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Ref. Link*</label>
              {/* <input type="text" placeholder='Add a reference link' /> */}
              <input
                type="text"
                name={`refLink${index}`}
                placeholder="Add a reference link"
              />
            </div>

            <button
              type="button"
              className="form-remove-button"
              onClick={handleRemoveNews}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="form-remove-button form-add-button"
          onClick={handleAddNews}
        >
          ADD
        </button>
        <hr />

        <h3>Ranking</h3>
        {[...Array(rankingCount)].map((_, index) => (
          <div className="form-input-flex-two" key={index}>
            <div className="form-input-group">
              <label htmlFor="collegename">Agency Name*</label>
              {/* <input type="text" placeholder='Add agency name' /> */}
              <input
                type="text"
                name={`agencyName${index}`}
                placeholder="Add agency name"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Rank*</label>
              {/* <input type="text" placeholder='Enter the rank' /> */}
              <input
                type="text"
                name={`rank${index}`}
                placeholder="Enter the rank"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="collegename">Year*</label>
              {/* <input type="text" placeholder='Add year' /> */}
              <input type="text" name={`year${index}`} placeholder="Add year" />
            </div>

            <button
              type="button"
              className="form-remove-button"
              onClick={handleRemoveRanking}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="form-remove-button form-add-button"
          onClick={handleAddRanking}
        >
          ADD
        </button>
        <hr />
        <h3>Facilities</h3>
        <div className="facilities-checkboxes">
          <label>
            <input
              type="checkbox"
              value="Hostel"
              onChange={() => handleFacilityChange("Hostel")}
            />
            Hostel
          </label>
          <label>
            <input
              type="checkbox"
              value="Cafeteria"
              onChange={() => handleFacilityChange("Cafeteria")}
            />
            Cafeteria
          </label>
          <label>
            <input
              type="checkbox"
              value="Library"
              onChange={() => handleFacilityChange("Library")}
            />
            Library
          </label>
          <label>
            <input
              type="checkbox"
              value="Transport"
              onChange={() => handleFacilityChange("Transport")}
            />
            Transport
          </label>
          <label>
            <input
              type="checkbox"
              value="Banking"
              onChange={() => handleFacilityChange("Banking")}
            />
            Banking
          </label>
          <label>
            <input
              type="checkbox"
              value="Gymnasium"
              onChange={() => handleFacilityChange("Gymnasium")}
            />
            Gymnasium
          </label>
          <label>
            <input
              type="checkbox"
              value="Security"
              onChange={() => handleFacilityChange("Security")}
            />
            Security
          </label>
          <label>
            <input
              type="checkbox"
              value="WiFi"
              onChange={() => handleFacilityChange("WiFi")}
            />
            Wi-Fi
          </label>
          <label>
            <input
              type="checkbox"
              value="Medical"
              onChange={() => handleFacilityChange("Medical")}
            />
            Medical
          </label>
        </div>
        <hr />

        <h3>Other Details</h3>
        <div className="form-input-flex-two">
          <div className="form-input-group">
            <label htmlFor="collegename">Overall placement*</label>
            <input
              type="text"
              onChange={(e) => setOverallPlacement(e.target.value)}
              placeholder="Enter placement %"
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">Promo/Documentary Video*</label>
            <input
              type="text"
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Enter the promo video link"
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">Scholarship offered?*</label>
            <input
              type="text"
              onChange={(e) => setScholarship(e.target.value)}
              placeholder="YES/NO"
            />
          </div>
        </div>
        <div className="form-input-flex-two">
          <div className="form-input-group form-select">
            <label htmlFor="collegename">Institute Type</label>
            <select
              value={selectedInstituteType}
              onChange={(e) => setSelectedInstituteType(e.target.value)}
            >
              <option value="">Select Institute Type</option>
              {instituteTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-input-group">
            <label htmlFor="collegename">Study Mode</label>
            <input
              type="text"
              onChange={(e) => setStudyMode(e.target.value)}
              placeholder="Regular/Distance"
            />
          </div>
        </div>
        <hr />

        <button type="submit" className="form-submit-button">
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default DetailsFormComponent;
