// import React from 'react'
// import { useState } from 'react';
// import axios from 'axios';
// import './UploadsFormComponent.css'

// const UploadsFormComponent = () => {

//     const [selectedFile, setSelectedFile] = useState(null);
//     const [bannerImage, setBannerImage] = useState(null);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleBannerImageChange = (event) => {
//         setBannerImage(event.target.files[0]);
//     };

//     const userId = sessionStorage.getItem('id');

//     const handleFileUpload = (e) => {

//         e.preventDefault();

//         if (!selectedFile) {
//             alert('Please select a file');
//             return;
//         }

//         const formData = new FormData();
//         formData.append("filename", selectedFile);

//         axios.post(`http://localhost:5000/upload/profile/${userId}`, formData)
//             .then((response) => {
//                 alert('File uploaded successfully');
//                 console.log('File uploaded successfully');
//             })
//             .catch((error) => {
//                 console.error('Error uploading file:', error);
//             });
//     };

//     const handleBannerImageUpload = (e) => {

//         e.preventDefault();

//         if (!bannerImage) {
//             alert('Please select a file');
//             return;
//         }

//         const formData = new FormData();
//         formData.append("filename", bannerImage);

//         axios.post(`http://localhost:5000/upload/banner/${userId}`, formData)
//             .then((response) => {
//                 alert('File uploaded successfully');
//                 console.log('File uploaded successfully');
//             })
//             .catch((error) => {
//                 console.error('Error uploading file:', error);
//             });
//     };

//     return (
//         <div className='profile-form'>
//             <h2>Uploads</h2>
//             <form >
//                 <h3>Upload relevant documents</h3>
//                 <hr />

//                 <div className="form-input-flex-two">
//                     <div className="form-input-group">
//                         <label htmlFor="collegename">Logo in Square*</label>
//                         <div className='form-file-input-group'>
//                             <input type='file' onChange={handleFileChange} />
//                             <button type='button' onClick={handleFileUpload}>Upload</button>
//                         </div>
//                     </div>

//                     <div className="form-input-group">
//                         <label htmlFor="collegename">Banner 16:9*</label>
//                         <div className='form-file-input-group'>
//                             <input type='file' onChange={handleBannerImageChange}/>
//                             <button type='button' onClick={handleBannerImageUpload}>Upload</button>
//                         </div>
//                     </div>
//                 </div>
//                 <hr />

//                 <h3>College/Institute Authorization & Rank related document</h3>
//                 <div className="form-input-flex-two">
//                     <div className="form-input-group">
//                         <label htmlFor="collegename">Authorization Letter*</label>
//                         <div className='form-file-input-group'>
//                             <input type='file' />
//                             <button>Upload</button>
//                         </div>
//                     </div>

//                     <div className="form-input-group">
//                         <label htmlFor="collegename">Ranking reference document*</label>
//                         <div className='form-file-input-group'>
//                             <input type='file' />
//                             <button>Upload</button>
//                         </div>
//                     </div>
//                 </div>
//                 <hr />

//                 <h3>Upload upto 5 images for gallery use</h3>
//                 <div className="form-input-flex-two">
//                     <div className="form-input-group">
//                         <label htmlFor="collegename">Select upto 5 JPEG/JPG images*</label>
//                         <div className='form-file-input-group'>
//                             <input type='file' />
//                             <button>Upload images</button>
//                         </div>
//                     </div>
//                 </div>
//                 <hr />


//                 <button type='submit' className='form-submit-button'>Save and Continue</button>

//             </form>
//         </div>
//     )
// }

// export default UploadsFormComponent


import React, { useState } from 'react';
import axios from 'axios';
import './UploadsFormComponent.css';

const UploadsFormComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [authorizationLetter, setAuthorizationLetter] = useState(null);
    const [rankingReference, setRankingReference] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

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

    // const handleImageChange = (event) => {
    //     setSelectedImages([...selectedImages, ...event.target.files]);
    // };

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newSelectedImages = [...selectedImages];
        for (let i = 0; i < files.length; i++) {
            newSelectedImages.push(files[i]);
        }
        setSelectedImages(newSelectedImages);
    };

    const userId = sessionStorage.getItem('id');

    const handleFileUpload = (file, endpoint) => {
        const formData = new FormData();
        formData.append("filename", file);

        axios.post(`http://localhost:5000/upload/${endpoint}/${userId}`, formData)
            .then((response) => {
                alert('File uploaded successfully');
                console.log('File uploaded successfully');
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };

    // const handleGalleryUpload = (files, endpoint) => {

    //     const userId = sessionStorage.getItem('id');

    //     const formData = new FormData();
    //     for (let i = 0; i < files.length; i++) {
    //         formData.append("filename", files[i]);
    //     }

    //     axios.post(`http://localhost:5000/upload/${endpoint}/${userId}`, formData)
    //         .then((response) => {
    //             alert('File uploaded successfully');
    //             console.log('File uploaded successfully');
    //         })
    //         .catch((error) => {
    //             console.error('Error uploading file:', error);
    //         });
    // };

    const handleGalleryUpload = () => {
        const formData = new FormData();
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });

        axios.post(`http://localhost:5000/upload/images/${userId}`, formData)
            .then((response) => {
                alert('Images uploaded successfully');
                console.log('Images uploaded successfully');
            })
            .catch((error) => {
                console.error('Error uploading images:', error);
            });
    };

    return (
        <div className='profile-form'>
            <h2>Uploads</h2>
            <form>
                <h3>Upload relevant documents</h3>
                <hr />

                <div className="form-input-flex-two">
                    {/* Logo in Square */}
                    <div className="form-input-group">
                        <label htmlFor="logo">Logo in Square*</label>
                        <div className='form-file-input-group'>
                            <input type='file' id="logo" onChange={handleFileChange} />
                            <button type='button' onClick={() => handleFileUpload(selectedFile, "profile")}>Upload</button>
                        </div>
                    </div>

                    {/* Banner 16:9 */}
                    <div className="form-input-group">
                        <label htmlFor="banner">Banner 16:9*</label>
                        <div className='form-file-input-group'>
                            <input type='file' id="banner" onChange={handleBannerImageChange} />
                            <button type='button' onClick={() => handleFileUpload(bannerImage, "banner")}>Upload</button>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="form-input-flex-two">
                    {/* Authorization Letter */}
                    <div className="form-input-group">
                        <label htmlFor="authLetter">Authorization Letter*</label>
                        <div className='form-file-input-group'>
                            <input type='file' id="authLetter" onChange={handleAuthorizationLetterChange} />
                            <button type='button' onClick={() => handleFileUpload(authorizationLetter, "authorization")}>Upload</button>
                        </div>
                    </div>

                    {/* Ranking reference document */}
                    <div className="form-input-group">
                        <label htmlFor="rankingRef">Ranking reference document*</label>
                        <div className='form-file-input-group'>
                            <input type='file' id="rankingRef" onChange={handleRankingReferenceChange} />
                            <button type='button' onClick={() => handleFileUpload(rankingReference, "ranking")}>Upload</button>
                        </div>
                    </div>
                </div>
                <hr />
                
                {/* Upload images */}
                <div className="form-input-group">
                    <label htmlFor="gallery">Select upto 5 JPEG/JPG images*</label>
                    <div className='form-file-input-group'>
                        <input type='file' id="gallery" multiple onChange={handleImageChange} />
                        {/* <button type='button' onClick={() => handleGalleryUpload(selectedImages, "images")}>Upload images</button> */}
                        <button type='button' onClick={handleGalleryUpload}>Upload images</button>
                    </div>
                </div>
                <hr />

                <button type='submit' className='form-submit-button'>Save and Continue</button>
            </form>
        </div>
    );
};

export default UploadsFormComponent;
