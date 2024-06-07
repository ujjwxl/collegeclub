import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import './ProfileFormComponent.css'
import { count } from 'firebase/firestore';

const ProfileFormComponent = () => {

    const [universityFullName, setUniversityFullName] = useState('');
    const [universityShortName, setUniversityShortName] = useState('');
    const [foundedYear, setFoundedYear] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [rankedBy, setRankedBy] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    
    const [fullAddress, setFullAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');

    const [alternateContact, setAlternateContact] = useState('');
    const [alternateNumber, setAlternateNumber] = useState('');

    const [referralCode, setReferralCode] = useState('');

    const userId = localStorage.getItem('id');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        localStorage.setItem('keywordOrganizationName',universityFullName);
        localStorage.setItem('keywordShortName', universityShortName);
        localStorage.setItem('keywordDistrict', district);
        localStorage.setItem('keywordState', state);
        localStorage.setItem('keywordCountry', country);
    
        try {
          await axios.post(`http://localhost:5000/auth/profileform/${userId}`, {
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
            referralCode
          })
            .then(res => {
              if (res.status == 200) {
                toast("Profile form submitted successfully!")
                navigate('/form/details')
              }
            })
            .catch(e => {
              toast("Form could not be submitted!")
              console.log(e);
            })
        }
        catch (e) {
          console.log(e);
        }
      }

    return (
        <div className='profile-form'>
            <h2>New Registration</h2>
            <form onSubmit={handleSubmit}>
                <h3>Basic Details</h3>
                <hr />

                {/* basic details start here */}
                {/* first line of basic details */}
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Institute/University Name*</label>
                        <input type="text" placeholder='Enter the institute name' onChange={(e) => setUniversityFullName(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">College Short Name*</label>
                        <input type="text" placeholder='Enter college short name' onChange={(e) => setUniversityShortName(e.target.value)} required/>
                    </div>
                </div>

                {/* second line of basic details */}
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Founded year*</label>
                        <input type="text" placeholder='Enter the year' onChange={(e) => setFoundedYear(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Approved by*</label>
                        <input type="text" placeholder='Enter the body name' onChange={(e) => setApprovedBy(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Ranked by*</label>
                        <input type="text" placeholder='Enter the body name' onChange={(e) => setRankedBy(e.target.value)} required/>
                    </div>
                </div>

                {/* third line of basic details */}
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Contact No.*</label>
                        <input type="text" placeholder='Enter the contact number' onChange={(e) => setContactNumber(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Email*</label>
                        <input type="text" placeholder='Enter the email' onChange={(e) => setEmail(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Website*</label>
                        <input type="text" placeholder='Enter the website' onChange={(e) => setWebsite(e.target.value)} required/>
                    </div>
                </div>
                {/* basic details section end here */}
                <hr />

                {/* address section starts here */}
                <h3>Address</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Full Address*</label>
                        <input type="text" placeholder='Enter the full address' onChange={(e) => setFullAddress(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">PIN Code*</label>
                        <input type="text" placeholder='Enter pin code' onChange={(e) => setPinCode(e.target.value)} required/>
                    </div>
                </div>

                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Country*</label>
                        <input type="text" placeholder='Enter country' onChange={(e) => setCountry(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">State*</label>
                        <input type="text" placeholder='Enter state' onChange={(e) => setState(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">District*</label>
                        <input type="text" placeholder='Enter district' onChange={(e) => setDistrict(e.target.value)} required/>
                    </div>
                </div>
                {/* address section ends here */}

                <hr />

                {/* alternate contact info starts here */}
                <h3>Alt. Contact Info</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Alt. Contact Person Name*</label>
                        <input type="text" placeholder='Enter the full name' onChange={(e) => setAlternateContact(e.target.value)} required/>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Alternate Contact No.*</label>
                        <input type="text" placeholder='Enter the contact no.' onChange={(e) => setAlternateNumber(e.target.value)} required/>
                    </div>
                </div>
                {/* alternate contact section ends here */}
                
                <hr />

                {/* referral code section */}
                <h3>Do you have a referral code?</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Do you have a referral code?</label>
                        <input type="text" placeholder='Enter the referral code' onChange={(e) => setReferralCode(e.target.value)} />
                    </div>
                </div>

                <button type='submit' className='form-submit-button'>Save and Continue</button>

            </form>
        </div>
    )
}

export default ProfileFormComponent
