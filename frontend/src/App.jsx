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
        <Route path='/form/profile' element={<ProfileForm/>}/>
        <Route path='/form/details' element={<DetailsForm/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
