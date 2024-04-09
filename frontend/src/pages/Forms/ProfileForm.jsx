import React from 'react'
import backgroundImage from '../../assets/home-1.jpg'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import DashboardMenu from '../../components/Dashboard/DashboardMenu'
import ProfileFormComponent from '../../components/Forms/ProfileFormComponent'
import './ProfileForm.css'  
import CompanyProfileComponent from '../../components/Forms/CompanyProfileComponent'

const ProfileForm = () => {

    const type = sessionStorage.getItem('type');

    return (
        <div>
            <>
                <Navbar />
                {/* <img src={backgroundImage} alt="" className='home1-img' /> */}
                <img src={backgroundImage} alt="" className='form-background-image' />
                <div className='dashboard-overlay dashboard-container form-overlay'>
                    {/* <DashboardMenu /> */}
                    {type === 'College' ? <ProfileFormComponent/> : null}
                    {type == 'Company' ? <CompanyProfileComponent/> : null}
                    {/* <CompanyProfileComponent/> */}
                </div>
                <Footer />
            </>
        </div>
    )
}

export default ProfileForm
