import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import './UploadsFormComponent.css';

const UploadsFormComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [authorizationLetter, setAuthorizationLetter] = useState(null);
    const [rankingReference, setRankingReference] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [type, setType] = useState(localStorage.getItem('type'));


    const organizationName = localStorage.getItem('keywordOrganizationName');
    const shortName = localStorage.getItem('keywordShortName');
    const district = localStorage.getItem('keywordDistrict');
    const state = localStorage.getItem('keywordState');
    const country = localStorage.getItem('keywordCountry');
    const selectedCourses = localStorage.getItem('keywordSelectedCourses');
    const courses = localStorage.getItem('keywordCourses');
    const instituteType = localStorage.getItem('keywordInstituteType');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleBannerImageChange = (event) => {
        setBannerImage(event.target.files[0]);
    };

    const handleAuthorizationLetterChange = (event) => {
        setAuthorizationLetter(event.target.files[0]);
    };

    const handleRankingReferenceChange = (event) => {
        setRankingReference(event.target.files[0]);
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newSelectedImages = [...selectedImages];
        for (let i = 0; i < files.length; i++) {
            newSelectedImages.push(files[i]);
        }
        setSelectedImages(newSelectedImages);
    };

    const userId = localStorage.getItem('id');

    const handleFileUpload = (file, endpoint) => {
        const formData = new FormData();
        formData.append("filename", file);

        axios.post(`http://localhost:5000/upload/${endpoint}/${userId}`, formData)
            .then((response) => {
                toast('File uploaded successfully!');
                console.log('File uploaded successfully');

                if(endpoint === "profile"){
                    localStorage.setItem('keywordProfilePicture', response.data.downloadURL);
                }
            })
            .catch((error) => {
                toast('File could not be uploaded!')
                console.error('Error uploading file:', error);
            });
    };

    const handleGalleryUpload = () => {
        const formData = new FormData();
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });

        axios.post(`http://localhost:5000/upload/images/${userId}`, formData)
            .then((response) => {
                toast('Images uploaded successfully!');
                console.log('Images uploaded successfully');
            })
            .catch((error) => {
                toast('Images could not be uploaded!');
                console.error('Error uploading images:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/auth/profilecompleted/${userId}`)
            .then((response) => {
                toast('Application form completed successfully!');
            })
            .catch((error) => {
                toast('Application form could not be completed!');
                console.log(error);
            })

        const profilePicture = localStorage.getItem('keywordProfilePicture');
        const accountType = localStorage.getItem('type');

        if(profilePicture === null){
            toast('Please upload a profile picture');
            return;
        }

        axios.post(`http://localhost:5000/auth/createkeywords/${userId}`, {
            organizationName,
            shortName,
            district,
            state,
            country,
            selectedCourses,
            courses,
            instituteType,
            profilePicture,
            accountType
        })
            .then((response) => {
                console.log('Keywords created!');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='profile-form'>
            <h2>Uploads</h2>
            <form onSubmit={handleSubmit}>
                <h3>Upload relevant documents</h3>
                <h4>Note: Upload each image separately using the upload button provided</h4>
                <hr />

                <div className="form-input-flex-two">
                    {/* Logo in Square */}
                    <div className="form-input-group">
                        <label htmlFor="logo">Profile picture in Square*</label>
                        <div className='form-file-input-group'>
                            <input type='file' id="logo" onChange={handleFileChange} required />
                            <button type='button' onClick={() => handleFileUpload(selectedFile, "profile")}>Upload</button>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="form-input-flex-two">
                    {type === 'College' && (
                        <div className="form-input-group">
                            <label htmlFor="authLetter">Authorization Letter*</label>
                            <div className='form-file-input-group'>
                                <input type='file' id="authLetter" onChange={handleAuthorizationLetterChange} required />
                                <button type='button' onClick={() => handleFileUpload(authorizationLetter, "authorization")}>Upload</button>
                            </div>
                        </div>
                    )}

                    {type === 'Company' && (
                        <div className="form-input-group">
                            <label htmlFor="registrationCert">Company Registration Certificate*</label>
                            <div className='form-file-input-group'>
                                <input type='file' id="registrationCert" onChange={handleAuthorizationLetterChange} required />
                                <button type='button' onClick={() => handleFileUpload(authorizationLetter, "registration")}>Upload</button>
                            </div>
                        </div>
                    )}

                    {type === 'CC-Ambassador' && (
                        <div className="form-input-group">
                            <label htmlFor="registrationCert">Address Proof*</label>
                            <div className='form-file-input-group'>
                                <input type='file' id="registrationCert" onChange={handleAuthorizationLetterChange} required />
                                <button type='button' onClick={() => handleFileUpload(authorizationLetter, "address")}>Upload</button>
                            </div>
                        </div>
                    )}
                    
                    {type === 'College' && (
                        <div className="form-input-group">
                            <label htmlFor="rankingRef">Ranking reference document*</label>
                            <div className='form-file-input-group'>
                                <input type='file' id="rankingRef" onChange={handleRankingReferenceChange} required />
                                <button type='button' onClick={() => handleFileUpload(rankingReference, "ranking")}>Upload</button>
                            </div>
                        </div>
                    )}

                    {type === 'Company' && (
                        <div className="form-input-group">
                            <label htmlFor="panCard">PAN Card*</label>
                            <div className='form-file-input-group'>
                                <input type='file' id="panCard" onChange={handleRankingReferenceChange} required />
                                <button type='button' onClick={() => handleFileUpload(rankingReference, "pancard")}>Upload</button>
                            </div>
                        </div>
                    )}

                    {type === 'CC-Ambassador' && (
                        <div className="form-input-group">
                            <label htmlFor="panCard">PAN Card*</label>
                            <div className='form-file-input-group'>
                                <input type='file' id="panCard" onChange={handleRankingReferenceChange} required />
                                <button type='button' onClick={() => handleFileUpload(rankingReference, "pancard")}>Upload</button>
                            </div>
                        </div>
                    )}
                </div>
                <hr />

                {/* Upload images */}
                <div className="form-input-group">
                    <label htmlFor="gallery">Select upto 5 JPEG/JPG images*</label>
                    <div className='form-file-input-group'>
                        <input type='file' id="gallery" multiple onChange={handleImageChange} required />
                        {/* <button type='button' onClick={() => handleGalleryUpload(selectedImages, "images")}>Upload images</button> */}
                        <button type='button' onClick={handleGalleryUpload}>Upload images</button>
                    </div>
                </div>
                <hr />

                <button type='submit' className='form-submit-button'>Save and continue</button>
            </form>
        </div>
    );
};

export default UploadsFormComponent;
