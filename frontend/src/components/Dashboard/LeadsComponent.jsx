import React, { useState } from "react";
import "./LeadsComponent.css";
import { toast } from 'sonner';
import axios from "axios";
import generateUniqueId from "generate-unique-id";


const LeadsComponent = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  // const [board, setBoard] = useState("");
  // const [yearOfPassing, setYearOfPassing] = useState("");
  // const [marksInPercentage, setMarksInPercentage] = useState("");
  const [schoolNameX, setSchoolNameX] = useState("");
  const [boardX, setBoardX] = useState("");
  const [yearOfPassingX, setYearOfPassingX] = useState("");
  const [marksInPercentageX, setMarksInPercentageX] = useState("");
  const [authLetterX, setAuthLetterX] = useState(null);

  const [schoolNameXII, setSchoolNameXII] = useState("");
  const [boardXII, setBoardXII] = useState("");
  const [yearOfPassingXII, setYearOfPassingXII] = useState("");
  const [marksInPercentageXII, setMarksInPercentageXII] = useState("");
  const [authLetterXII, setAuthLetterXII] = useState(null);

  const [schoolNameGrad, setSchoolNameGrad] = useState("");
  const [boardGrad, setBoardGrad] = useState("");
  const [yearOfPassingGrad, setYearOfPassingGrad] = useState("");
  const [marksInPercentageGrad, setMarksInPercentageGrad] = useState("");
  const [authLetterGrad, setAuthLetterGrad] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [preferredColleges, setPreferredColleges] = useState(["", "", ""]);
  const [preferredBranches, setPreferredBranches] = useState(["", "", ""]);
  const [authLetterGradFile, setAuthLetterGradFile] = useState(null);
  const [authLetterSignatureFile, setAuthLetterSignatureFile] = useState(null);
  const [authLetterIDFile, setAuthLetterIDFile] = useState(null);

  const [showPaymentOption, setShowPaymentOption] = useState(false);

  const userId = localStorage.getItem('id');

  const fname = localStorage.getItem('fname');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleFatherNameChange = (e) => {
    setFatherName(e.target.value);
  };

  const handleMotherNameChange = (e) => {
    setMotherName(e.target.value);
  };
  const validateForm1 = () => {
    // Example validation, check if required fields are filled
    if (!name || !email || !mobile || !gender || !address || !bloodGroup || !fatherName || !motherName) {
      toast("Please fill in all required fields.");
      return false;
    }
    return true;
  };
  const handleSaveChanges1 = (e) => {
    e.preventDefault();
    // if (!validateForm1()) {
    //   return;
    // }
    setShowForm1(false);
    setShowForm2(true);
    setShowForm3(false);
    setShowForm4(false);
  };
  const handleSaveChanges2 = (e) => {
    e.preventDefault();
    setShowForm1(false);
    setShowForm2(false);
    setShowForm3(true);
    setShowForm4(false);
  };
  const handleSaveChanges3 = (e) => {
    e.preventDefault();
    setShowForm1(false);
    setShowForm2(false);
    setShowForm3(false);
    setShowForm4(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast("Please agree to the disclaimer.");
      return;
    }

    const letterX = localStorage.getItem('authLetterX');
    const letterXII = localStorage.getItem('authLetterXII');
    const letterGrad = localStorage.getItem('authLetterGrad');
    const letterImage = localStorage.getItem('authLetterImage');
    const letterSignature = localStorage.getItem('authLetterSignature');
    const letterId = localStorage.getItem('authLetterId');

    const applicationNumber = generateUniqueId({
      length: 12,
      useLetters: false
    });

    localStorage.setItem('leadApplicationNumber', applicationNumber);

    try {
      const response = await axios.post(`http://localhost:5000/auth/leads/${userId}`, {
        applicationNumber,
        name,
        email,
        mobile,
        gender,
        address,
        bloodGroup,
        fatherName,
        motherName,
        schoolNameX,
        boardX,
        yearOfPassingX,
        marksInPercentageX,
        authLetterX: letterX,
        schoolNameXII,
        boardXII,
        yearOfPassingXII,
        marksInPercentageXII,
        authLetterXII: letterXII,
        schoolNameGrad,
        boardGrad,
        yearOfPassingGrad,
        marksInPercentageGrad,
        authLetterGrad: letterGrad,
        preferredColleges,
        preferredBranches,
        authLetterGradFile: letterImage,
        authLetterSignatureFile: letterSignature,
        authLetterIDFile: letterId,
        ccName: fname,
      });

      if (response.status === 200) {
        toast("Leads data submitted successfully!");
        setShowForm4(false);
        setShowPaymentOption(true);
      }
    } catch (error) {
      toast("Failed to submit leads data!");
      console.error('Error submitting leads data:', error);
    }
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePreferredCollegeChange = (index, value) => {
    const updatedColleges = [...preferredColleges];
    updatedColleges[index] = value;
    setPreferredColleges(updatedColleges);
  };

  const handlePreferredBranchChange = (index, value) => {
    const updatedBranches = [...preferredBranches];
    updatedBranches[index] = value;
    setPreferredBranches(updatedBranches);
  };

  const handleAuthLetterXChange = (event) => {
    setAuthLetterX(event.target.files[0]);
  };

  const handleAuthLetterXIIChange = (event) => {
    setAuthLetterXII(event.target.files[0]);
  };

  const handleAuthLetterGradChange = (event) => {
    setAuthLetterGrad(event.target.files[0]);
  };

  const handleFileUpload = (file, endpoint) => {
    const formData = new FormData();
    formData.append("filename", file);

    // axios.post(`http://localhost:5000/upload/${endpoint}`, formData)
    axios.post(`http://localhost:5000/upload/leadsform`, formData)
      .then((response) => {
        toast('File uploaded successfully!');
        console.log('File uploaded successfully');

        if (endpoint === "auth-letter-x") {
          localStorage.setItem('authLetterX', response.data.downloadURL);
        }
        else if (endpoint === "auth-letter-xii") {
          localStorage.setItem('authLetterXII', response.data.downloadURL);
        }
        else if (endpoint === "auth-letter-grad") {
          localStorage.setItem('authLetterGrad', response.data.downloadURL);
        }
        else if (endpoint === "auth-letter-image") {
          localStorage.setItem('authLetterImage', response.data.downloadURL);
        }
        else if (endpoint === "auth-letter-signature") {
          localStorage.setItem('authLetterSignature', response.data.downloadURL);
        }
        else if (endpoint === "auth-letter-id") {
          localStorage.setItem('authLetterId', response.data.downloadURL);
        }
      })
      .catch((error) => {
        toast('File could not be uploaded!')
        console.error('Error uploading file:', error);
      });
  };

  const checkoutHandler = async (amount) => {

    const leadApplicationNumber = localStorage.getItem('leadApplicationNumber');

    const { data: { key } } = await axios.get("http://localhost:5000/api/getkey")
    const { data: { order } } = await axios.post("http://localhost:5000/leadscheckout")

    console.log(window);

    const options = {
      key,
      amount: 151,
      currency: "INR",
      name: fname,
      description: "Leads Processing Fees",
      image: "https://media.licdn.com/dms/image/D4D0BAQHiy2Ug9laZOA/company-logo_200_200/0/1691938402527?e=2147483647&v=beta&t=Pbz6CO3ccliuj0uAJgDr81gG7IPPn_7lkKTrn7njOds",
      order_id: order.id,
      callback_url: `http://localhost:5000/leadspaymentverification?userid=${userId}&username=${fname}&applicationnumber=${leadApplicationNumber}`,
      prefill: {
        name: fname,
        // email: userData.email,
        // contact: userData.contactNumber
      },
      notes: {
        "address": "razorapy official"
      },
      theme: {
        "color": "#3399cc"
      }
    };
    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <div className="dashboard-box-leads">
      <div className="dashboard-box-container-leads">
        {showForm1 && (
          <form
            className="form1"
          >
            <h2>Complete your Lead</h2>
            <div className="form-input-flex-two">
              <div className="form-input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="form-input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="form-input-flex-two">
              <div className="form-input-group">
                <label htmlFor="number">Mobile Number</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={handleMobileChange}
                  pattern="[0-9]*"
                  maxLength={10}
                />
              </div>
              <div className="form-input-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" value={gender} onChange={handleGenderChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-input-flex-two">
              <div className="form-input-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="form-input-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <input
                  type="text"
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={handleBloodGroupChange}
                />
              </div>
            </div>
            <hr />
            <h2>Guardian Details</h2>
            <div className="form-input-flex-two">
              <div className="form-input-group">
                <label htmlFor="fatherName">Father's Name</label>
                <input
                  type="text"
                  id="fatherName"
                  value={fatherName}
                  onChange={handleFatherNameChange}
                />
              </div>
              <div className="form-input-group">
                <label htmlFor="motherName">Mother's Name</label>
                <input
                  type="text"
                  id="motherName"
                  value={motherName}
                  onChange={handleMotherNameChange}
                />
              </div>
            </div>
            <div className="form-input-flex-two">
              <button
                type="submit"
                className="form-submit-button"
                onClick={handleSaveChanges1}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
        {showForm2 && (
          <form className="form2" >
            <h2>Your higher education</h2>
            <div className="education-section">
              <h3>X</h3>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="schoolNameX">School Name</label>
                  <input
                    type="text"
                    id="schoolNameX"
                    value={schoolNameX}
                    onChange={(e) => setSchoolNameX(e.target.value)}
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="boardX">Board</label>
                  <input
                    type="text"
                    id="boardX"
                    value={boardX}
                    onChange={(e) => setBoardX(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="yearOfPassingX">Year of Passing</label>
                  <input
                    type="text"
                    id="yearOfPassingX"
                    value={yearOfPassingX}
                    onChange={(e) => setYearOfPassingX(e.target.value)}
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="marksInPercentageX">Marks in %</label>
                  <input
                    type="text"
                    id="marksInPercentageX"
                    value={marksInPercentageX}
                    onChange={(e) => setMarksInPercentageX(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-input-group">
                <label htmlFor="authLetterX">Authorization Letter*</label>
                <div className="form-file-input-group">
                  <input type="file" id="authLetterX" onChange={handleAuthLetterXChange} />
                  <button type="button" onClick={() => handleFileUpload(authLetterX, "auth-letter-x")}>Upload</button>
                </div>
              </div>
            </div>

            <div className="education-section">
              <h3>XII</h3>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="schoolNameXII">School Name</label>
                  <input
                    type="text"
                    id="schoolNameXII"
                    value={schoolNameXII}
                    onChange={(e) => setSchoolNameXII(e.target.value)}
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="boardXII">Board</label>
                  <input
                    type="text"
                    id="boardXII"
                    value={boardXII}
                    onChange={(e) => setBoardXII(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="yearOfPassingXII">Year of Passing</label>
                  <input
                    type="text"
                    id="yearOfPassingXII"
                    value={yearOfPassingXII}
                    onChange={(e) => setYearOfPassingXII(e.target.value)}
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="marksInPercentageXII">Marks in %</label>
                  <input
                    type="text"
                    id="marksInPercentageXII"
                    value={marksInPercentageXII}
                    onChange={(e) => setMarksInPercentageXII(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-input-group">
                <label htmlFor="authLetterXII">Authorization Letter*</label>
                <div className="form-file-input-group">
                  <input type="file" id="authLetterXII" onChange={handleAuthLetterXIIChange} />
                  <button type="button" onClick={() => handleFileUpload(authLetterXII, "auth-letter-xii")}>Upload</button>
                </div>
              </div>
            </div>

            <div className="education-section">
              <h3>Graduation</h3>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="schoolNameGrad">College</label>
                  <input
                    type="text"
                    id="schoolNameGrad"
                    value={schoolNameGrad}
                    onChange={(e) => setSchoolNameGrad(e.target.value)}
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="boardGrad">University</label>
                  <input
                    type="text"
                    id="boardGrad"
                    value={boardGrad}
                    onChange={(e) => setBoardGrad(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="yearOfPassingGrad">Year of Passing</label>
                  <input
                    type="text"
                    id="yearOfPassingGrad"
                    value={yearOfPassingGrad}
                    onChange={(e) => setYearOfPassingGrad(e.target.value)}
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="marksInPercentageGrad">Marks in %</label>
                  <input
                    type="text"
                    id="marksInPercentageGrad"
                    value={marksInPercentageGrad}
                    onChange={(e) => setMarksInPercentageGrad(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-input-group">
                <label htmlFor="authLetterGrad">Authorization Letter*</label>
                <div className="form-file-input-group">
                  <input type="file" id="authLetterGrad" onChange={handleAuthLetterGradChange} />
                  <button type="button" onClick={() => handleFileUpload(authLetterGrad, "auth-letter-grad")}>Upload</button>
                </div>
              </div>
            </div>

            <div className="form-input-flex-two">
              <button
                type="submit"
                className="form-submit-button"
                onClick={handleSaveChanges2}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
        {showForm3 && (
          <form className="form3">
            <h2>Uploads</h2>
            <div className="form-input-flex-two">
              <div className="form-input-group">
                <label htmlFor="authLetterGrad">Upload Image*</label>
                <div className="form-file-input-group">
                  <input
                    type="file"
                    id="authLetterGrad"
                    onChange={(e) => setAuthLetterGradFile(e.target.files[0])}
                  />
                  <button type="button" onClick={() => handleFileUpload(authLetterGradFile, "auth-letter-image")}>Upload</button>
                </div>
              </div>
              <div className="form-input-group">
                <label htmlFor="authLetterSignature">Upload Signature in PDF*</label>
                <div className="form-file-input-group">
                  <input
                    type="file"
                    id="authLetterSignature"
                    onChange={(e) => setAuthLetterSignatureFile(e.target.files[0])}
                  />
                  <button type="button" onClick={() => handleFileUpload(authLetterSignatureFile, "auth-letter-signature")}>Upload</button>
                </div>
              </div>
            </div>
            <div className="form-input-flex-two">
              <div className="form-input-group">
                <label htmlFor="authLetterID">Upload ID (Voter id/ Aadhar Card) in PDF*</label>
                <div className="form-file-input-group">
                  <input
                    type="file"
                    id="authLetterID"
                    onChange={(e) => setAuthLetterIDFile(e.target.files[0])}
                  />
                  <button type="button" onClick={() => handleFileUpload(authLetterIDFile, "auth-letter-id")}>Upload</button>
                </div>
              </div>
            </div>
            <div className="form-input-flex-two">
              <button
                type="submit"
                className="form-submit-button"
                onClick={handleSaveChanges3}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {showForm4 && (
          <form className="form4" onSubmit={handleSubmit}>
            <h2>Your Preferred Choice</h2>

            {/* Preferred Colleges */}
            <h3>Preferred Colleges</h3>
            {preferredColleges.map((college, index) => (
              <div key={index} className="form-input-group">
                <label htmlFor={`collegeName${index}`}>College {index + 1}</label>
                <input
                  type="text"
                  id={`collegeName${index}`}
                  value={college}
                  onChange={(e) => handlePreferredCollegeChange(index, e.target.value)}
                  required
                />
              </div>
            ))}

            {/* Preferred Branches */}
            <h3>Preferred Branches</h3>
            {preferredBranches.map((branch, index) => (
              <div key={index} className="form-input-group">
                <label htmlFor={`branchName${index}`}>Branch {index + 1}</label>
                <input
                  type="text"
                  id={`branchName${index}`}
                  value={branch}
                  onChange={(e) => handlePreferredBranchChange(index, e.target.value)}
                  required
                />
              </div>
            ))}

            {/* Disclaimer */}
            <p>
              DISCLAIMER: I agree that information provided by me is true and in case if
              any discrepancy is found between the information provided by me and the
              supporting document that I will submit, my admission for any forthcoming
              CollegeClub Leads program will be liable to get cancelled and in such an
              event, I will not be eligible for a refund.
            </p>
            <div className="checkbox-container">
              <label htmlFor="agreeCheckbox">
                <input
                  type="checkbox"
                  id="agreeCheckbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                I agree to the disclaimer
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-input-group">
              <button
                type="submit"
                className="form-submit-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {showPaymentOption && (
          <div className="payment-option">
            <h2>Complete Payment</h2>
            <h3>Please complete an application processing fee of Rs 151</h3>
            <button className="form-submit-button" onClick={checkoutHandler}>Pay Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsComponent;
