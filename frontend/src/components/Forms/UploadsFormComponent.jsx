import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './UploadsFormComponent.css'

const UploadsFormComponent = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const userId = sessionStorage.getItem('id');

    const handleFileUpload = (e) => {

        e.preventDefault();

        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append("filename", selectedFile);

        axios.post(`http://localhost:5000/upload/profile/${userId}`, formData)
            .then((response) => {
                alert('File uploaded successfully');
                console.log('File uploaded successfully');
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    return (
        <div className='profile-form'>
            <h2>Uploads</h2>
            <form onSubmit={handleFileUpload}>
                <h3>Upload relevant documents</h3>
                <hr />

                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Logo in Square*</label>
                        <div className='form-file-input-group'>
                            <input type='file' onChange={handleFileChange} />
                            <button>Upload</button>
                        </div>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Banner 16:9*</label>
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
                        <label htmlFor="collegename">Authorization Letter*</label>
                        <div className='form-file-input-group'>
                            <input type='file' />
                            <button>Upload</button>
                        </div>
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Ranking reference document*</label>
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
                        <label htmlFor="collegename">Select upto 5 JPEG/JPG images*</label>
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
