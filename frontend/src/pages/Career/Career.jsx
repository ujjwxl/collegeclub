import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import "./Career.css";

const Career = () => {
  return (
    <>
      <Navbar />
      <div className="career">
        <img src={backgroundImage} alt="" className="home1-img" />
        <div className="career-overlay">
          <div className="career-box">
            <h3>Current Openings</h3>
            <hr />
            <h2>
              Welcome to the world of possibilities, Join our team today...
            </h2>
            {/* <h4>Sales Executive - # 202401</h4>
            <hr/>
            <h4>Full-Stack developer - # 202402</h4>
            <hr/>
            <h4>Marketing Executive - # 202403</h4>
            <hr/>
            <h4>Freshers - # 202404</h4>
            <hr/> */}
            <Accordion className="accordion">
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    Sales Executive - # 202401
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <h2>About CollegeClub</h2>
                  <p>
                    CollegeClub is a dynamic platform that connects students,
                    colleges/universities, and company partners. It is a
                    one-stop solution for educational opportunities, career
                    connections, and collaborative initiatives. CollegeClub is
                    committed to the cause of transforming education in India
                    through our investments in made-in-India technology
                    innovations, customer-centric features and constructs, a
                    diverse category landscape, and a world-class supply chain.
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
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    Full-Stack developer - # 202402
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <h2>About CollegeClub</h2>
                  <p>
                    CollegeClub is a dynamic platform that connects students,
                    colleges/universities, and company partners. It is a
                    one-stop solution for educational opportunities, career
                    connections, and collaborative initiatives. CollegeClub is
                    committed to the cause of transforming education in India
                    through our investments in made-in-India technology
                    innovations, customer-centric features and constructs, a
                    diverse category landscape, and a world-class supply chain.
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
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    Marketing Executive - # 202403
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <h2>About CollegeClub</h2>
                  <p>
                    CollegeClub is a dynamic platform that connects students,
                    colleges/universities, and company partners. It is a
                    one-stop solution for educational opportunities, career
                    connections, and collaborative initiatives. CollegeClub is
                    committed to the cause of transforming education in India
                    through our investments in made-in-India technology
                    innovations, customer-centric features and constructs, a
                    diverse category landscape, and a world-class supply chain.
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
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                  Freshers - # 202404
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <h2>About CollegeClub</h2>
  <p>
    CollegeClub is a dynamic platform that connects students, colleges/universities, and company partners. It is a one-stop solution for educational opportunities, career connections, and collaborative initiatives. CollegeClub is committed to the cause of transforming education in India through our investments in made-in-India technology innovations, customer-centric features and constructs, a diverse category landscape, and a world-class supply chain.
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
    <br/>
    <li>
      <strong>Learning and Development:</strong>
      <ul>
        <li>Participate in training programs designed to enhance your skills and knowledge in [specific skills relevant to your industry].</li>
        <li>Embrace continuous learning and growth opportunities within the company.</li>
      </ul>
    </li>
    <br/>
    <li>
      <strong>Project Support:</strong>
      <ul>
        <li>Assist in the execution of projects by providing valuable insights and contributing to project deliverables.</li>
        <li>Learn and apply best practices in project management and execution.</li>
      </ul>
    </li>
    <br/>
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
<br/>
  <h3>Location:</h3>
  <li>Patna</li>
<br/>
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
<br/>
  <h3>Year of experience:</h3>
  <li>0-0</li>
<br/>
  <h3>Designation:</h3>
  <li>FJT</li>
<br/>
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
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            <hr></hr>
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
      <Footer />
    </>
  );
};

export default Career;
