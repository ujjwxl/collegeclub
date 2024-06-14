import React from 'react'
import homeOneImage from '../../assets/home-1.jpg'
import collegeClubLogo from '../../assets/collegeclub-logo.png'
import BIT from '../../assets/BIT.png'
import Pilani from '../../assets/Pilani.png'
import NIT from '../../assets/NIT.png'
import IIT from '../../assets/IIT.png'
import Marquee from "react-fast-marquee";
import './CollegePartner.css'

const CollegePartner = () => {
    return (
        <div>
            <img src={homeOneImage} alt="" className='home1-img'></img>
            <div className="home-five-overlay">
                <h2>COLLEGE PARTNER</h2>
                <div className="circle-logos-container">
                    <svg width="400" height="400" className='circle-rotating-svg'>
                        {/* Outer circle */}
                        <circle cx="200" cy="200" r="150" fill="none" stroke="black" strokeWidth="2" />
                        {/* Inner circle */}
                        <circle cx="200" cy="200" r="60" fill="none" stroke="black" strokeWidth="2" />

                        <image href={collegeClubLogo} x="180" y="182" width="40" height="40" />

                        <g transform="rotate(-45 200 200)">
                            <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="260" y="50" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/5/52/Indian_Institute_of_Technology%2C_Patna.svg" x="150" y="30" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" x="65" y="75" width="50" height="50" />

                            <image href="https://upload.wikimedia.org/wikipedia/en/b/b5/National_Institute_of_Technology%2C_Patna_Logo.png" x="65" y="275" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/f/fe/Srmseal.png" x="150" y="320" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/b/b5/National_Institute_of_Technology%2C_Patna_Logo.png" x="250" y="305" width="50" height="50" />

                            <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="315" y="240" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/5/52/Indian_Institute_of_Technology%2C_Patna.svg" x="320" y="140" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" x="25" y="180" width="50" height="50" />
                        </g>

                        <g transform="rotate(90 200 200)">
                            <image href="https://upload.wikimedia.org/wikipedia/en/5/52/Indian_Institute_of_Technology%2C_Patna.svg" x="150" y="180" width="50" height="140" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="150" y="120" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" x="230" y="180" width="50" height="50" />
                            
                        </g>
                    </svg>

                    <div className='home-college-partners-details'>
                        <p>CollegeClub: The trusted choice for promotions and admissions among India's premier educational institutions</p>
                        <p>Some of our partners include</p>
                        <div className='colleges'>
                        <p>BIT Mesra</p>
                        <p>NIT Patna</p>
                        <p>IIT Patna</p>
                        <p>VIT Vellore</p>
                        </div>
                        <div className='marquee'>
                        <Marquee className='marquee' speed={300} pauseOnHover gradient={false}>
                            <div className='bit'>
                                <img src={BIT}></img>
                            </div>
                            <div className='pilani'>
                                <img src={Pilani}></img>
                            </div>
                            <div className='nit'>
                                <img src={NIT}></img>
                            </div>
                            <div className='iit'>
                                <img src={IIT}></img>
                            </div>
                        </Marquee>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CollegePartner
