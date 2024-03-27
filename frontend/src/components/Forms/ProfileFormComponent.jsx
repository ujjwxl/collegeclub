import React from 'react'
import './ProfileFormComponent.css'

const ProfileFormComponent = () => {
    return (
        <div className='profile-form'>
            <h2>New Registration</h2>
            <form action="">
                <h3>Basic Details</h3>
                <hr />

                {/* basic details start here */}
                {/* first line of basic details */}
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Institute/University Name*</label>
                        <input type="text" placeholder='Enter the institute name' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">College Short Name*</label>
                        <input type="text" placeholder='Enter college short name' />
                    </div>
                </div>

                {/* second line of basic details */}
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Founded year*</label>
                        <input type="text" placeholder='Enter the year' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Approved by*</label>
                        <input type="text" placeholder='Enter the body name' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Ranked by*</label>
                        <input type="text" placeholder='Enter the body name' />
                    </div>
                </div>

                {/* third line of basic details */}
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Contact No.*</label>
                        <input type="text" placeholder='Enter the contact number' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Email*</label>
                        <input type="text" placeholder='Enter the email' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Website*</label>
                        <input type="text" placeholder='Enter the website' />
                    </div>
                </div>
                {/* basic details section end here */}
                <hr />

                {/* address section starts here */}
                <h3>Address</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Full Address*</label>
                        <input type="text" placeholder='Enter the full address' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">PIN Code*</label>
                        <input type="text" placeholder='Enter pin code' />
                    </div>
                </div>

                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Country*</label>
                        <input type="text" placeholder='Enter country' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">State*</label>
                        <input type="text" placeholder='Enter state' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">District*</label>
                        <input type="text" placeholder='Enter district' />
                    </div>
                </div>
                {/* address section ends here */}

                <hr />

                {/* alternate contact info starts here */}
                <h3>Alt. Contact Info</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Alt. Contact Person Name*</label>
                        <input type="text" placeholder='Enter the full name' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Alternate Contact No.*</label>
                        <input type="text" placeholder='Enter the contact no.' />
                    </div>
                </div>
                {/* alternate contact section ends here */}
                
                <hr />

                {/* referral code section */}
                <h3>Do you have a referral code?</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Do you have a referral code?</label>
                        <input type="text" placeholder='Enter the referral code' />
                    </div>
                </div>

                <button type='submit' className='form-submit-button'>Save and Continue</button>

            </form>
        </div>
    )
}

export default ProfileFormComponent
