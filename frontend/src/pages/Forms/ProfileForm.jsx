import React from 'react'
import backgroundImage from '../../assets/home-1.jpg'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import ProfileFormComponent from '../../components/Forms/ProfileFormComponent'
import './ProfileForm.css'
import CompanyProfileComponent from '../../components/Forms/CompanyProfileComponent'
import AmbassadorProfileComponent from '../../components/Forms/AmbassadorProfileComponent'

const ProfileForm = () => {

    const type = localStorage.getItem('type');

    return (
        <div>
            <>
                <Navbar />
                <img src={backgroundImage} alt="" className='form-background-image' />
                <div className='dashboard-overlay dashboard-container form-overlay'>
                    {type === 'College' ? <ProfileFormComponent /> : null}
                    {type == 'Company' ? <CompanyProfileComponent /> : null}
                    {type == 'CC-Ambassador' ? <AmbassadorProfileComponent /> : null}
                </div>
                <Footer />
            </>
        </div>
    )
}

export default ProfileForm
