import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Categories from '../../components/Home/Categories'
import CollegePartner from '../../components/Home/CollegePartner'
import CompanyPartner from '../../components/Home/CompanyPartner'
import Landing from '../../components/Home/Landing'
import Exams from '../../components/Home/Exams'
import Counselling from '../../components/Home/Counselling'
import Footer from '../../components/Home/Footer'

export const Home = () => {
  return (
    <>
      <Navbar/>
      <Landing/>
      <Exams/>
      <Categories />
      <Counselling/>
      <CollegePartner/>
      <CompanyPartner/>
      <Footer/>
    </>
  )
}

