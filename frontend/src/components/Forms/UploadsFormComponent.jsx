import React from 'react'
import './UploadsFormComponent.css'

const UploadsFormComponent = () => {
    return (
        <div className='profile-form'>
            <h2>KYC and Uploads</h2>
            <form action="">
                <h3>Upload relevant documents</h3>
                <hr />

                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Institute/University Name*</label>
                        <div className='form-file-input-group'>
                            <input type='file' />
                            <button>Upload</button>
                        </div>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">College Short Name*</label>
                        <div className='form-file-input-group'>
                            <input type='file' />
                            <button>Upload</button>
                        </div>
                    </div>
                </div>
                <hr />

                <h3>College/Institute Authorization & Rank related document</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Institute/University Name*</label>
                        <div className='form-file-input-group'>
                            <input type='file' />
                            <button>Upload</button>
                        </div>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">College Short Name*</label>
                        <div className='form-file-input-group'>
                            <input type='file' />
                            <button>Upload</button>
                        </div>
                    </div>
                </div>
                <hr />

                <h3>Upload upto 5 images for gallery use</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Institute/University Name*</label>
                        <div className='form-file-input-group'>
                            <input type='file' />
                            <button>Upload images</button>
                        </div>
                    </div>
                </div>
                <hr />


                <button type='submit' className='form-submit-button'>Save and Continue</button>

            </form>
        </div>
    )
}

export default UploadsFormComponent
