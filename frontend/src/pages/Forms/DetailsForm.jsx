import React from 'react'
import backgroundImage from '../../assets/home-1.jpg'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import DetailsFormComponent from '../../components/Forms/DetailsFormComponent'
import './DetailsForm.css'
import CompanyDetailsComponent from '../../components/Forms/CompanyDetailsComponent'

const DetailsForm = () => {

    const type = localStorage.getItem('type');

    return (
        <div>
            <>
                <Navbar />
                {/* <img src={backgroundImage} alt="" className='home1-img' /> */}
                <img src={backgroundImage} alt="" className='details-form-background-image' />
                <div className='dashboard-overlay dashboard-container details-form-overlay'>
                    {/* <DashboardMenu /> */}
                    {/* <DetailsFormComponent/> */}
                    {type === 'College' ? <DetailsFormComponent/> : null}
                    {type === 'Company' ? <CompanyDetailsComponent/> : null}
                </div>
                <Footer />
            </>
        </div>
    )
}

export default DetailsForm
