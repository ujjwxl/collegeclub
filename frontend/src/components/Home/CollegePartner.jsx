import React from 'react'
import homeOneImage from '../../assets/home-1.jpg'
import collegeClubLogo from '../../assets/collegeclub-logo.png'
import './CollegePartner.css'

const CollegePartner = () => {
    return (
        <div>
            <img src={homeOneImage} alt="" className='home1-img'></img>
            <div className="home-five-overlay">
                <h2>COLLEGE PARTNER</h2>
                {/* <h2>UPDATING SOON</h2> */}
                <div className="circle-logos-container">
                    <svg width="400" height="400">
                        {/* Outer circle */}
                        <circle cx="200" cy="200" r="150" fill="none" stroke="black" strokeWidth="2" />
                        {/* Inner circle */}
                        <circle cx="200" cy="200" r="60" fill="none" stroke="black" strokeWidth="2" />

                        <image href={collegeClubLogo} x="175" y="175" width="50" height="50" />

                        {/* Logos in outer circle */}
                        <g transform="rotate(-45 200 200)">
                            <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="250" y="50" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/5/52/Indian_Institute_of_Technology%2C_Patna.svg" x="150" y="25" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" x="50" y="85" width="50" height="50" />

                            <image href="https://upload.wikimedia.org/wikipedia/en/b/b5/National_Institute_of_Technology%2C_Patna_Logo.png" x="50" y="260" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/f/fe/Srmseal.png" x="150" y="320" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/b/b5/National_Institute_of_Technology%2C_Patna_Logo.png" x="250" y="300" width="50" height="50" />

                            <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="320" y="240" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/5/52/Indian_Institute_of_Technology%2C_Patna.svg" x="320" y="140" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" x="20" y="180" width="50" height="50" />
                            {/* Add more image elements for other logos */}
                        </g>

                        {/* Logos in inner circle */}
                        <g transform="rotate(90 200 200)">
                            {/* <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="200" y="120" width="50" height="50" /> */}
                            <image href="https://upload.wikimedia.org/wikipedia/en/5/52/Indian_Institute_of_Technology%2C_Patna.svg" x="140" y="180" width="50" height="140" />
                            {/* <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="200" y="120" width="50" height="50" /> */}
                            <image href="https://upload.wikimedia.org/wikipedia/en/d/d2/Birla_Institute_of_Technology_Mesra.png" x="140" y="120" width="50" height="50" />
                            <image href="https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg" x="230" y="180" width="50" height="50" />
                            {/* Add more image elements for other logos */}
                        </g>
                    </svg>

                    <div className='home-college-partners-details'>
                        <p>CollegeClub: The trusted choice for promotions and admissions among India's premier educational institutions</p>
                        <p>Some of our partners include</p>
                        <p>BIT Mesra</p>
                        <p>NIT Patna</p>
                        <p>IIT Patna</p>
                        <p>VIT Vellore</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CollegePartner
