import React from 'react'
import backgroundImage from '../../assets/home-1.jpg'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import UploadsFormComponent from '../../components/Forms/UploadsFormComponent'

const UploadsForm = () => {
    return (
        <div>
            <>
                <Navbar />
                <img src={backgroundImage} alt="" className='form-background-image' />
                <div className='dashboard-overlay dashboard-container form-overlay'>
                    <UploadsFormComponent />
                </div>
                <Footer />
            </>
        </div>
    )
}

export default UploadsForm
