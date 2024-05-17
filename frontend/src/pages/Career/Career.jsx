import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import "./Career.css";

const Career = () => {

  const [applicationModal, setApplicationModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [position, setPosition] = useState('');

  const handleCloseModal = () => {
    setApplicationModal(false);
  }

  const accordions = [
    {
      title: "Sales Executive - # 202401",
      content: (
        <>
          <h2>About CollegeClub</h2>
          <p>
            CollegeClub is a dynamic platform that connects students,
            colleges/universities, and company partners. It is a one-stop
            solution for educational opportunities, career connections, and
            collaborative initiatives. CollegeClub is committed to the cause
            of transforming education in India through our investments in
            made-in-India technology innovations, customer-centric features and
            constructs, a diverse category landscape, and a world-class supply
            chain.
          </p>

          <h2>Job Description: Sales Executive</h2>
          <h3>Job Responsibilities:</h3>
          <ul>
            <li>
              Onboard high-quality partners in the Programs, with the
              potential to grow exponentially with the platform.
            </li>
            <li>
              Build a strong pipeline of potential partners, using the
              existing lead leads or by generating new leads, in the
              high growth categories identified for the quarter.
            </li>
            <li>
              Develop a thorough understanding of the internal processes
              and Program guidelines.
            </li>
            <li>
              Fix appointments with the partners, convince them to come
              onto the CollegeClub programs, and assist at every stage
              of the process till the time of completion of services.
            </li>
            <li>
              Collaborating effectively with internal and
              cross-functional teams to solve any seller issues.
            </li>
            <li>
              Complete ownership of Sales targets and deliver
              daily/weekly/monthly.
            </li>
          </ul>

          <h3>Open position: 2</h3>
          <h3>Skills required:</h3>
          <li>
            Outbound/Inbound Calling, Excellent written and verbal
            communication abilities.
          </li>
          <br />
          <h3>Location:</h3>
          <li>Patna</li>
          <br />
          <h3>Education/Qualification:</h3>
          <li>Graduate</li>
          <br />
          <h3>Desirable Skills:</h3>
          <li>
            Outbound/Inbound Calling, Excellent written and verbal
            communication abilities.
          </li>
          <br />
          <h3>Year of experience:</h3>
          <li>0-2 years</li>
          <br />
          <h3>Designation:</h3>
          <li>Sales Executive</li>
          <br />
          <h3>How to Apply:</h3>
          <p>
            Interested candidates are invited to submit their resume,
            portfolio, and a cover letter outlining their relevant
            experience to{" "}
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>
            . Please include the subject line "Sales Executive
            Application - [Your Name]."
          </p>

          <p>
            CollegeClub is an equal opportunity employer and welcomes
            candidates from all backgrounds to apply.
          </p>

          <p className="accepting">
            We are accepting applications from February 20th until March
            28th. Please send your resume to{" "}
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>
            .
          </p>

          <button onClick={() => setApplicationModal(true)} className="form-submit-button career-button">Apply now</button>
        </>
      ),
    },
    {
      title: "Full-Stack developer - # 202402",
      content: (
        <>
          <h2>About CollegeClub</h2>
          <p>
            CollegeClub is a dynamic platform that connects students,
            colleges/universities, and company partners. It is a one-stop
            solution for educational opportunities, career connections, and
            collaborative initiatives. CollegeClub is committed to the cause
            of transforming education in India through our investments in
            made-in-India technology innovations, customer-centric features and
            constructs, a diverse category landscape, and a world-class supply
            chain.
          </p>
          <h2>Job Description: Software Engineer</h2>
          <h3>Job Responsibilities:</h3>
          <ul>
            <li>
              Design and develop responsive user interfaces using HTML,
              CSS, and JavaScript.
            </li>
            <li>
              Implement client-side logic with modern front-end
              frameworks such as React, Angular, or Vue.js.
            </li>
            <li>
              Develop and maintain server-side logic using Node.js,
              Python, or other server-side languages.
            </li>
            <li>
              Design and manage databases, write efficient queries, and
              ensure data integrity.
            </li>
            <li>
              Create and maintain RESTful or GraphQL APIs for seamless
              communication between front-end and back-end components.
            </li>
            <li>
              Collaborate with designers, product managers, and other
              team members to deliver high-quality software solutions.
            </li>
            <li>
              Conduct unit testing, integration testing, and end-to-end
              testing to ensure the reliability and functionality of
              applications.
            </li>
            <li>
              Implement security best practices to safeguard
              applications from common vulnerabilities.
            </li>
            <li>
              Troubleshoot and resolve software defects and issues on
              time.
            </li>
            <li>
              Stay updated with industry trends, emerging technologies,
              and best practices in web development.
            </li>
          </ul>

          <h3>Open position: 1</h3>
          <h3>Skills required:</h3>
          <ul>
            <li>Angular, JavaScript frameworks, CSS, etc.</li>
          </ul>

          <h3>Location:</h3>
          <li>Patna</li>
          <br />

          <h3>Education/Qualification:</h3>
          <li>
            Bachelor's degree in Computer Science, Engineering, or
            related field (or equivalent experience).
          </li>
          <br />

          <h3>Desirable Skills:</h3>
          <ul>
            <li>Angular, JavaScript frameworks, CSS, etc.</li>
          </ul>

          <h3>Year of experience:</h3>
          <li>2-5 years</li>
          <br />

          <h3>Designation:</h3>
          <li>Software Engineer</li>
          <br />

          <h3>How to Apply:</h3>
          <p>
            Interested candidates are invited to submit their resume,
            portfolio, and a cover letter outlining their relevant
            experience to
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>
            . Please include the subject line "Full Stack Developer
            Application - [Your Name]."
          </p>
          <br />

          <p>
            CollegeClub is an equal opportunity employer and welcomes
            candidates from all backgrounds to apply.
          </p>

          <p class="accepting">
            We are accepting applications from February 20th until March
            28th. Please send your resume to
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>
            .
          </p>
          <button onClick={() => setApplicationModal(true)} className="form-submit-button career-button">Apply now</button>
        </>
      ),
    },
    {
      title: "Marketing Executive - # 202403",
      content: (
        <>
          <h2>About CollegeClub</h2>
          <p>
            CollegeClub is a dynamic platform that connects students,
            colleges/universities, and company partners. It is a one-stop
            solution for educational opportunities, career connections, and
            collaborative initiatives. CollegeClub is committed to the cause
            of transforming education in India through our investments in
            made-in-India technology innovations, customer-centric features and
            constructs, a diverse category landscape, and a world-class supply
            chain.
          </p>
          <h2>Job Description: Marketing Executive</h2>
          <h3>Job Responsibilities:</h3>
          <ul>
            <li>
              Conduct market research to identify trends, competitor
              activities, and customer preferences.
            </li>
            <li>
              Develop and implement comprehensive marketing strategies
              to drive brand awareness and lead generation.
            </li>
            <li>
              Plan and execute multi-channel marketing campaigns,
              including digital, social media, print, and events.
            </li>
            <li>
              Collaborate with internal teams to create compelling and
              on-brand marketing materials.
            </li>
            <li>
              Manage and optimize digital marketing efforts, including
              SEO, SEM, social media, and email campaigns.
            </li>
            <li>
              Monitor and analyze key performance indicators (KPIs) to
              measure the success of marketing initiatives.
            </li>
            <li>
              Build and maintain relationships with media outlets,
              influencers, and other key partners.
            </li>
            <li>
              Oversee the planning and execution of events, product
              launches, and other promotional activities.
            </li>
            <li>
              Ensure consistency in brand messaging across all
              communication channels.
            </li>
            <li>
              Prepare and present regular reports on marketing
              performance and insights.
            </li>
            <li>
              Stay updated on industry trends, emerging technologies,
              and marketing best practices.
            </li>
          </ul>

          <h3>Open position: 1</h3>
          <h3>Skills required:</h3>
          <ul>
            <li>
              Proficiency with Microsoft Office tools, data handling and
              organization, stakeholder management
            </li>
          </ul>

          <h3>Location:</h3>
          <li>Patna</li>
          <br />

          <h3>Education/Qualification:</h3>
          <ul>
            <li>
              <strong>Qualifications:</strong>
              <br />
              <ul>
                <li>
                  Bachelor's degree in Marketing, Business, or a related
                  field.
                </li>
                <li>
                  Proven experience as a Marketing Executive or similar
                  role.
                </li>
                <li>
                  Strong understanding of various marketing channels and
                  strategies.
                </li>
                <li>
                  Excellent written and verbal communication skills.
                </li>
                <li>Creative thinker with a data-driven mindset.</li>
                <li>
                  Proficient in digital marketing tools and platforms.
                </li>
                <li>
                  Ability to manage multiple projects simultaneously.
                </li>
                <li>Strong analytical and problem-solving skills.</li>
                <li>
                  Ability to work independently and collaboratively in a
                  team.
                </li>
              </ul>
            </li>
          </ul>

          <h3>Year of experience:</h3>
          <li>1-5 years</li>
          <br />
          <h3>Designation:</h3>
          <li>Marketing Executive</li>
          <br />
          <h3>How to Apply:</h3>
          <p>
            Interested candidates are invited to submit their resume,
            portfolio, and a cover letter outlining their relevant
            experience to
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>
            . Please include the subject line "Marketing Executive
            Application - [Your Name]."
          </p>

          <p>
            CollegeClub is an equal opportunity employer and welcomes
            candidates from all backgrounds to apply.
          </p>

          <p class="accepting">
            We are accepting applications from February 20th until March
            28th. Please send your resume to
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>
            .
          </p>
          <button onClick={() => setApplicationModal(true)} className="form-submit-button career-button">Apply now</button>
        </>
      ),
    },
    {
      title: "Freshers - # 202404",
      content: (
        <>
          <h2>About CollegeClub</h2>
          <p>
            CollegeClub is a dynamic platform that connects students,
            colleges/universities, and company partners. It is a one-stop
            solution for educational opportunities, career connections, and
            collaborative initiatives. CollegeClub is committed to the cause
            of transforming education in India through our investments in
            made-in-India technology innovations, customer-centric features and
            constructs, a diverse category landscape, and a world-class supply
            chain.
          </p>
          <h2>Job Description: Junior Team Member</h2>
          <h3>Job Overview:</h3>
          <p>
            Are you a recent graduate or someone with a passion for [industry/field]? CollegeClub is actively seeking enthusiastic and dynamic individuals to join our team as Junior Team Members. If you have a knack for collaboration, a thirst for learning, and a desire to contribute to exciting projects, we want you on board! This is an excellent opportunity for freshers to kick-start their careers and grow with a dynamic organization.
          </p>

          <h3>Job Responsibilities:</h3>
          <ul>
            <li>
              <strong>Collaborative Teamwork:</strong>
              <ul>
                <li>Work closely with cross-functional teams to contribute to ongoing projects and initiatives.</li>
                <li>Collaborate with experienced professionals to gain hands-on experience and mentorship.</li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Learning and Development:</strong>
              <ul>
                <li>Participate in training programs designed to enhance your skills and knowledge in [specific skills relevant to your industry].</li>
                <li>Embrace continuous learning and growth opportunities within the company.</li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Project Support:</strong>
              <ul>
                <li>Assist in the execution of projects by providing valuable insights and contributing to project deliverables.</li>
                <li>Learn and apply best practices in project management and execution.</li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Problem-Solving:</strong>
              <ul>
                <li>Develop problem-solving skills by actively engaging in resolving challenges within your assigned projects.</li>
                <li>Contribute fresh perspectives to enhance team problem-solving dynamics.</li>
              </ul>
            </li>
          </ul>

          <h3>Open position: [Enter the number of open positions here]</h3>

          <h3>Skills required:</h3>
          <li>Please describe your core.</li>
          <br />
          <h3>Location:</h3>
          <li>Patna</li>
          <br />
          <h3>Education/Qualification:</h3>
          <ul>
            <li>
              <strong>Qualifications:</strong>
              <ul>
                <li>Bachelor's degree in [B.Tech, MBA, BBA, BCA] or equivalent.</li>
                <li>Strong communication and interpersonal skills.</li>
                <li>Eagerness to learn and adapt in a fast-paced environment.</li>
                <li>Ability to work collaboratively in a team and individually when required.</li>
                <li>Enthusiastic attitude and a proactive approach to tasks and challenges.</li>
              </ul>
            </li>
          </ul>


          <h3>Desirable Skills:</h3>
          <li>Please describe your core.</li>
          <br />
          <h3>Year of experience:</h3>
          <li>0-0</li>
          <br />
          <h3>Designation:</h3>
          <li>FJT</li>
          <br />
          <h3>How to Apply:</h3>
          <p>
            Interested candidates are invited to submit their resume and a brief cover letter expressing their interest in the Junior Team Member position at
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>. Please include the subject line "Fresher Junior Team Application - [Your Name]."
          </p>

          <p>
            CollegeClub is an equal opportunity employer and welcomes candidates from all backgrounds to apply.
          </p>

          <p class="accepting">
            We are accepting applications from February 20th until March 28th. Please send your resume to
            <a href="mailto:joinus@collegeclub.io">
              joinus@collegeclub.io
            </a>.
          </p>
          <button onClick={() => setApplicationModal(true)} className="form-submit-button career-button">Apply now</button>
        </>
      ),
    },
  ];

  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman & Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("filename", file);

    axios.post(`http://localhost:5000/upload/resume`, formData)
      .then((response) => {
        alert('File uploaded successfully');
        console.log('File uploaded successfully');
        console.log(response);
        localStorage.setItem('resumeLink', response.data.downloadURL)
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resumeLink = localStorage.getItem('resumeLink');

    if (!resumeLink) {
      alert('Please upload a resume first');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/auth/apply`, {
        name,
        phoneNumber,
        email,
        city,
        state,
        position,
        resumeLink
      })
        .then(res => {
          if (res.status == 200) {
            alert('Applied for job succesfully!');
            localStorage.removeItem('resumeLink');
          }
        })
        .catch(e => {
          console.log(e);
        })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Navbar />
      <div className="career">
        <img src={backgroundImage} alt="" className="home1-img" />
        <div className="career-overlay">
          <div className="career-box">
            <h3>Current Openings</h3>
            <hr />
            <h2>Welcome to the world of possibilities, Join our team today...</h2>

            <Accordion className="accordion" allowZeroExpanded={true}>
              {accordions.map((accordion, index) => (
                <AccordionItem key={index}>
                  <AccordionItemHeading>
                    <AccordionItemButton>{accordion.title}</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="accordian-contents">
                    {accordion.content}
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <hr />
            <h2>Why work with us?</h2>
            <p>
              At CollegeClub, we promise to maximize what you care about the
              most. You’ll get an opportunity to leave a mark and create your
              legacy, you’ll have the freedom to experiment, learn, and grow,
              you’ll get to work with the best in our inclusive teams and
              experience our culture of care to ensure that you can focus on
              doing your best work. <br />
              <br />
              We understand that your aspirations and journeys are unique. So
              you choose what you want to maximize, and we provide you the
              platform for it. Because when you maximize, we maximize.
            </p>
          </div>
        </div>
      </div>
      {applicationModal && (
        <div className="modal apply-job-modal">
          <div className="modal-content apply-job-modal-content">
            <button className="close-button form-submit-button" onClick={handleCloseModal}>Close</button>

            <h2>Apply for a job at CollegeClub</h2>

            <h3>Enter the following details</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="collegename">Your name*</label>
                  <input type="text" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="form-input-group">
                  <label htmlFor="collegename">Mobile number*</label>
                  <input type="text" placeholder='Enter your mobile number' onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>

                <div className="form-input-group">
                  <label htmlFor="collegename">Email*</label>
                  <input type="text" placeholder='Enter your email address' onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="collegename">City*</label>
                  <input type="text" placeholder='Enter your city' onChange={(e) => setCity(e.target.value)} required />
                </div>

                {/* <div className="form-input-group">
                  <label htmlFor="collegename">State*</label>
                  <input type="text" placeholder='Enter your state' onChange={(e) => setState(e.target.value)} required />
                </div> */}
              </div>

              <div className="form-input-group form-select apply-form-select">
                <label htmlFor="collegename">Position*</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option value="">Select position</option>
                  <option value="sales-executive">Sales Executive - #202401</option>
                  <option value="full-stack-developer">Full Stack Developer - #202402</option>
                  <option value="marketing-executive">Marketing Executive - #202403</option>
                  <option value="freshers">Freshers - #202404</option>
                </select>
              </div>

              <div className="form-input-group form-select apply-form-select">
                <label htmlFor="collegename">Position*</label>
                <select value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">Select state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="form-input-group">
                <label htmlFor="logo">Upload Resume*</label>
                <div className='form-file-input-group'>
                  <input type='file' id="logo" onChange={handleFileChange} />
                  <button type='button' onClick={() => handleFileUpload(selectedFile)}>Upload</button>
                </div>
              </div>

              <button className="form-submit-button apply-job-button">Apply</button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Career;
