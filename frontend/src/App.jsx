import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard';
import PaymentSuccess from './components/Dashboard/PaymentSuccess';
import College from './pages/College/College';
import ProfileForm from './pages/Forms/ProfileForm';
import DetailsForm from './pages/Forms/DetailsForm';
import UploadsForm from './pages/Forms/UploadsForm';
import CollegeDetails from './pages/CollegeDetails/CollegeDetails';
import SlotBooking from './pages/SlotBooking/SlotBooking';
import AboutUs from './pages/AboutUs/AboutUs';
import Career from './pages/Career/Career';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Mission from './pages/Mission/Mission';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Contact from './pages/Contact/Contact';
import Faqs from './pages/FAQs/FAQs';
import Feedback from './pages/Feedback/Feedback';
import Courses from './pages/Courses/Courses';
import Exams from './pages/Exams/Exams';
import Skills from './pages/Skills/Skills';
import Openings from './pages/Openings/Openings';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
        <Route path='/colleges' element={<College/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/exams' element={<Exams/>}/>
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/openings' element={<Openings/>}/>
        <Route path='/skills/:courseId' element={<Skills/>}/>
        <Route path='/form/profile' element={<ProfileForm/>}/>
        <Route path='/form/details' element={<DetailsForm/>}/>
        <Route path='/form/uploads' element={<UploadsForm/>}/>
        <Route path='/college/:collegeId' element={<CollegeDetails/>}/>
        <Route path='/slot' element={<SlotBooking/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/mission' element={<Mission/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/career' element={<Career/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/faqs' element={<Faqs/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
