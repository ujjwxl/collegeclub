import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import axios from "axios";
import "./ProfileFormComponent.css";

const AmbassadorProfileComponent = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [email, setEmail] = useState("");

  const [fullAddress, setFullAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  // const [alternateContact, setAlternateContact] = useState('');
  // const [alternateNumber, setAlternateNumber] = useState('');

  // const [referralCode, setReferralCode] = useState('');
  const [collegeName, setCollegeName] = useState("");
  const [collegePincode, setCollegePincode] = useState("");
  const [collegeCountry, setCollegeCountry] = useState("");
  const [collegeState, setCollegeState] = useState("");
  const [collegeDistrict, setCollegeDistrict] = useState("");

  const [whyJoinUs, setWhyJoinUs] = useState("");

  const userId = localStorage.getItem("id");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`http://localhost:5000/auth/ambassadorprofileform/${userId}`, {
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
        })
        .then((res) => {
          if (res.status == 200) {
            toast("Profile form submitted successfully!");
            navigate("/form/details");
          }
        })
        .catch((e) => {
          toast("Form could not be submitted!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="profile-form">
      <h2>Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <h3>Basic Details</h3>
        <hr />

        {/* basic details start here */}
        {/* first line of basic details */}
        <div className="form-input-flex-two">
          <div className="form-input-group">
            <label htmlFor="collegename">Name*</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">Gender*</label>
            {/* <input type="text" placeholder='Enter your gender' onChange={(e) => setGender(e.target.value)} required /> */}

            <select
              className="ambassador-form-gender-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select gender</option>
              {["Male", "Female", "Others"].map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-input-group">
            <label htmlFor="dob">Date of Birth*</label>
            <ReactDatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date of Birth"
              required
              showYearDropdown
              scrollableYearDropdown
              maxDate={new Date()}
              yearDropdownItemNumber={60}
            />
          </div>
        </div>

        <div className="form-input-flex-two">
          <div className="form-input-group">
            <label htmlFor="collegename">Contact No.*</label>
            <input
              type="text"
              placeholder="Enter the contact number"
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">LinkedIn Profile*</label>
            <input
              type="text"
              placeholder="Enter the LinkedIn Profile"
              onChange={(e) => setLinkedIn(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">Email*</label>
            <input
              type="text"
              placeholder="Enter the email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* <div className="form-input-group">
                        <label htmlFor="collegename">Website*</label>
                        <input type="text" placeholder='Enter the website' onChange={(e) => setWebsite(e.target.value)} required />
                    </div> */}
        </div>
        {/* basic details section end here */}
        <hr />

        {/* address section starts here */}
        <h3>Address</h3>
        <div className="form-input-flex-two">
          <div className="form-input-group">
            <label htmlFor="collegename">Complete Address*</label>
            <input
              type="text"
              placeholder="Enter the complete address"
              onChange={(e) => setFullAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">PIN Code*</label>
            <input
              type="text"
              placeholder="Enter pin code"
              onChange={(e) => setPinCode(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-input-flex-two">
          <div className="form-input-group">
            <label htmlFor="collegename">Country*</label>
            <input
              type="text"
              placeholder="Enter country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">State*</label>
            <input
              type="text"
              placeholder="Enter state"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">District*</label>
            <input
              type="text"
              placeholder="Enter district"
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
        </div>
        {/* address section ends here */}

        <hr />

        <h3>Higher Education Details</h3>
        <div className="form-input-flex-two">
          <div className="form-input-group">
            <label htmlFor="collegename">College Name*</label>
            <input
              type="text"
              placeholder="Enter the college name"
              onChange={(e) => setCollegeName(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">PIN Code*</label>
            <input
              type="text"
              placeholder="Enter the pincode"
              onChange={(e) => setCollegePincode(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-input-flex-two">
          <div className="form-input-group">
            <label htmlFor="collegename">Country*</label>
            <input
              type="text"
              placeholder="Enter country"
              onChange={(e) => setCollegeCountry(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">State*</label>
            <input
              type="text"
              placeholder="Enter state"
              onChange={(e) => setCollegeState(e.target.value)}
              required
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="collegename">District*</label>
            <input
              type="text"
              placeholder="Enter district"
              onChange={(e) => setCollegeDistrict(e.target.value)}
              required
            />
          </div>
        </div>

        <hr />

        <h3>Why join us?</h3>
        <textarea
          onChange={(e) => setWhyJoinUs(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          required
        ></textarea>
        <hr />

        {/* alternate contact info starts here */}
        {/* <h3>Alt. Contact Info</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Alt. Contact Person Name*</label>
                        <input type="text" placeholder='Enter the full name' onChange={(e) => setAlternateContact(e.target.value)} required />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Alternate Contact No.*</label>
                        <input type="text" placeholder='Enter the contact no.' onChange={(e) => setAlternateNumber(e.target.value)} required />
                    </div>
                </div> */}
        {/* alternate contact section ends here */}

        {/* <hr /> */}

        {/* referral code section */}
        {/* <h3>Do you have a referral code?</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Do you have a referral code?</label>
                        <input type="text" placeholder='Enter the referral code' onChange={(e) => setReferralCode(e.target.value)} />
                    </div>
                </div> */}

        <button type="submit" className="form-submit-button">
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default AmbassadorProfileComponent;
