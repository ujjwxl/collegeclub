import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from "../../assets/location.png";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import defaultImage from "../../assets/test-dp.jpg";
import axios from "axios";
import "./Exams.css";

const Exams = () => {
  const [selectedExam, setSelectedExam] = useState("JEE");
  const [examDetails, setExamDetails] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Details for each exam
  const examsDetails = {
    JEE: {
      title: "Joint Entrance Examination Main (JEE Main)",
      purpose:
        "The JEE Main serves as a crucial national-level entrance examination in India, specifically designed for facilitating admissions into undergraduate engineering programs at premier institutions like the National Institutes of Technology (NITs), Indian Institutes of Information Technology (IIITs), and other esteemed engineering colleges across the country.",
      conductingBody:
        "The responsibility of conducting the JEE Main lies with the National Testing Agency (NTA), an autonomous organization established by the Government of India.",
      frequency:
        "The examination is conducted multiple times a year, typically in the months of January and April, providing students with multiple opportunities to appear and improve their scores.",
      mode: "JEE Main is conducted in two modes: Computer-Based Test (CBT) and Pen and Paper Based Test (PBT), allowing candidates to choose the mode that best suits their preferences and comfort.",
      subjectsCovered:
        "The syllabus for JEE Main encompasses three core subjects: Physics, Chemistry, and Mathematics, thoroughly assessing the candidates proficiency in these fundamental areas of science and mathematics.",
      examPattern:
        "The examination pattern of JEE Main comprises multiple-choice questions (MCQs) as well as numerical value-based questions, ensuring a comprehensive evaluation of the candidates’ conceptual understanding and problem-solving skills.",
      eligibilityCriteria:
        "Candidates aspiring to appear for JEE Main must meet specific eligibility criteria pertaining to age, educational qualifications, and subject combination, ensuring that only eligible candidates participate in the examination.",
      registrationProcess:
        "The registration process for JEE Main is conducted online through the official website of the National Testing Agency (NTA), offering a convenient and accessible means for candidates to register for the examination from the comfort of their homes.",
      admitCard:
        "Registered candidates are issued admit cards, which contain essential details such as exam date, time, and venue, serving as a mandatory document for appearing in the examination.",
      resultAndCounseling:
        "The results of JEE Main are declared on the official website of NTA, following which counseling sessions are conducted by the Joint Seat Allocation Authority (JoSAA) for facilitating the seat allocation process in various participating institutions.",
      preparationResources:
        "A wide array of preparation resources are available to help candidates prepare for JEE Main, including coaching institutes, online platforms offering study materials and mock tests, as well as a plethora of books authored by subject matter experts.",
      importantDates:
        "It is imperative for candidates to stay updated with the important dates related to registration, examination, result declaration, and counseling sessions, thereby ensuring timely completion of various stages of the examination process.",
    },

    NEET: {
      title: "NEET (National Eligibility cum Entrance Test)",
      purpose:
        "NEET is conducted to facilitate admission to undergraduate medical courses like Bachelor of Medicine, Bachelor of Surgery (MBBS), Bachelor of Dental Surgery (BDS), and postgraduate courses (MD/MS) in government or private medical colleges in India. It aims to streamline the admission process and ensure fairness and transparency in selecting candidates for medical education.",
      conductingBody:
        "NEET is organized by the National Testing Agency (NTA), an autonomous and self-sustained premier testing organization under the Department of Higher Education, Ministry of Education, Government of India. NTA is responsible for conducting various national-level entrance examinations.",
      frequency:
        "NEET is conducted once a year, typically in May. However, the exact date may vary from year to year, and candidates are advised to stay updated with the latest announcements from the NTA.",
      mode: "The NEET examination is primarily conducted in Pen and Paper Based Test (PBT) mode. However, in recent years, an additional option of Computer Based Test (CBT) has also been introduced to provide flexibility to candidates.",
      subjectsCovered:
        "The NEET syllabus covers three main subjects: Physics, Chemistry, and Biology. Biology is further divided into Botany and Zoology. The syllabus is based on the curriculum prescribed by the Medical Council of India (MCI) for undergraduate medical courses.",
      examPattern:
        "NEET follows a multiple-choice question (MCQ) format. Candidates are required to choose the correct answer from the options provided. The examination assesses candidates knowledge, understanding, and application of concepts in the respective subjects.",
      eligibilityCriteria:
        "Candidates aspiring to appear for NEET must fulfill certain eligibility criteria set by the NTA. These criteria typically include age limit, educational qualifications, and subject combination. For example, candidates must have completed 17 years of age at the time of admission and must have passed the 10+2 examination or equivalent with Physics, Chemistry, Biology/Biotechnology, and English as core subjects.",
      registrationProcess:
        "The registration process for NEET is conducted online through the official website of the NTA. Candidates need to fill out the application form, provide necessary details and documents, and pay the requisite application fee within the specified deadline.",
      admitCard:
        "Upon successful registration, candidates can download the NEET admit card from the official website of the NTA. The admit card contains essential details such as the candidates name, roll number, examination center, date, and timing of the exam. It is mandatory for candidates to carry the admit card to the examination center along with a valid photo ID proof.",
      resultAndCounseling:
        "NEET results are typically declared on the official website of the NTA within a few weeks after the examination. Candidates can check their results using their roll number and other required details. Subsequently, counseling sessions are conducted by the Medical Counseling Committee (MCC) for All India Quota seats and by respective state authorities for state quota seats. Counseling involves the allocation of seats based on merit, preferences, and availability.",
      preparationResources:
        "Various resources are available to help candidates prepare for NEET effectively. These include coaching institutes, online platforms offering study materials, mock tests, and video lectures, as well as a wide range of books authored by subject matter experts. Additionally, the NTA also releases official NEET question papers and answer keys from previous years, which can serve as valuable study resources for aspirants.",
      importantDates:
        "Candidates are advised to stay updated with the important dates related to NEET, including registration dates, examination date, result declaration date, and counseling schedule. Timely preparation and adherence to deadlines are crucial for success in the examination.",
    },

    CAT: {
      title: "CAT (Common Admission Test)",
      purpose:
        "CAT is a national-level entrance examination conducted for admission to various management programs offered by Indian Institutes of Management (IIMs) and other prestigious management institutes across India. It serves as a benchmark for evaluating candidates aptitude and potential for pursuing management education.",
      conductingBody:
        "CAT is conducted by the Indian Institutes of Management (IIMs), which are autonomous public institutes of management education and research in India. Each year, one of the IIMs is designated as the conducting body for CAT.",
      frequency:
        "CAT is conducted once a year, typically in November or December. The exact date may vary from year to year, and candidates are advised to check the official CAT website for updates and announcements.",
      mode: "CAT is a Computer-Based Test (CBT), wherein candidates take the examination on computers provided at designated test centers. The CBT mode allows for efficient administration, timely results, and a standardized testing environment.",
      subjectsCovered:
        "The CAT syllabus comprises three main sections: Verbal Ability and Reading Comprehension (VARC), Data Interpretation & Logical Reasoning (DILR), and Quantitative Ability (QA). These sections assess candidates proficiency in language comprehension, logical reasoning, data interpretation, and quantitative analysis.",
      examPattern:
        "CAT features a combination of multiple-choice questions (MCQs) and non-MCQs (also known as TITA or Type in the Answer questions). MCQs require candidates to choose the correct answer from the options provided, while non-MCQs require candidates to type the answer using the virtual keyboard provided on the computer screen.",
      eligibilityCriteria:
        "To be eligible for CAT, candidates must have a bachelors degree with at least 50% marks or equivalent CGPA (45% for candidates belonging to Scheduled Castes, Scheduled Tribes, and Persons with Disability categories) from a recognized university or educational institution. Additionally, candidates in their final year of graduation are also eligible to apply, subject to fulfilling the prescribed eligibility criteria.",
      registrationProcess:
        "The registration process for CAT is conducted online through the official website of the conducting IIM. Candidates need to register, fill out the application form, upload required documents, and pay the registration fee within the specified deadline.",
      admitCard:
        "Upon successful registration, candidates can download the CAT admit card from the official website. The admit card contains essential details such as the candidates name, registration number, examination center, date, and timing of the exam. It is mandatory for candidates to carry the admit card to the examination center along with a valid photo ID proof.",
      resultAndCounseling:
        "CAT results are typically declared on the official CAT website. Candidates can check their results using their login credentials. Subsequently, individual participating institutes release their respective cutoff scores and conduct their counseling processes for shortlisting candidates for admission.",
      preparationResources:
        "Candidates preparing for CAT can avail themselves of various resources to enhance their preparation. These include coaching institutes offering specialized CAT preparation courses, online platforms providing study materials, mock tests, and video lectures, as well as a wide array of books authored by management experts and CAT toppers. Additionally, solving previous years question papers and participating in mock tests can help candidates familiarize themselves with the exam pattern and improve their time management skills.",
      importantDates:
        "It is essential for candidates to stay updated with the important dates related to CAT, including registration commencement and deadline, examination date, result declaration date, and counseling schedule. Timely preparation and adherence to deadlines are crucial for success in the examination.",
    },
    NIFT: {
      title: "NIFT Entrance Exam",
      purpose:
        "The NIFT Entrance Exam is conducted to facilitate admission to undergraduate and postgraduate programs in fashion design, accessory design, textile design, fashion communication, and other related fields offered by the National Institute of Fashion Technology (NIFT) campuses located across India. The exam aims to identify and select candidates with creative aptitude, design skills, and a passion for the fashion industry.",
      conductingBody:
        "The NIFT Entrance Exam is conducted by the National Institute of Fashion Technology (NIFT), which is a premier institution for fashion education in India. NIFT was established under the aegis of the Ministry of Textiles, Government of India, with the goal of nurturing talent and fostering excellence in the field of fashion and design.",
      frequency:
        "The NIFT Entrance Exam is typically conducted once a year, usually in the month of January or February. However, the exact date may vary from year to year, and candidates are advised to check the official NIFT website for updates and announcements regarding the examination schedule.",
      mode: "The NIFT Entrance Exam can be conducted in both Paper-Based Test (PBT) and Computer-Based Test (CBT) modes, depending on the program applied for and the specific requirements of the examination center. The availability of test modes may vary from center to center.",
      subjectsCovered:
        "The NIFT Entrance Exam consists of multiple components, including the General Ability Test (GAT), Creative Ability Test (CAT), and Situation Test (for Bachelor of Design (B.Des.) courses). The GAT assesses candidates general knowledge, analytical ability, and communication skills, while the CAT evaluates their creative and design skills through various tasks and exercises. The Situation Test is specifically designed to assess candidates ability to handle real-life design situations and challenges.",
      examPattern:
        "The exam pattern for the NIFT Entrance Exam varies according to the program applied for, with different weightage assigned to each component of the examination. For example, the B.Des. program may have a different exam pattern compared to the M.Des. program. Candidates are advised to refer to the official NIFT website or information brochure for detailed information about the exam pattern relevant to their chosen program.",
      eligibilityCriteria:
        "The eligibility criteria for the NIFT Entrance Exam vary according to the program applied for and may include educational qualifications, age limit, and specific requirements related to the candidates background and portfolio. Generally, candidates must have passed or appeared for their 10+2 examination from a recognized board or university. However, specific eligibility criteria may differ for undergraduate and postgraduate programs as well as for Indian and foreign nationals.",
      registrationProcess:
        "Candidates interested in appearing for the NIFT Entrance Exam are required to complete the online registration process through the official website of NIFT. The registration process typically involves filling out the application form, providing necessary details and documents, and paying the application fee within the specified deadline.",
      admitCard:
        "Upon successful registration, candidates can download the NIFT Entrance Exam admit card from the official website of NIFT. The admit card contains essential details such as the candidates name, roll number, examination center, date, and timing of the exam. It is mandatory for candidates to carry the admit card to the examination center along with a valid photo ID proof.",
      resultAndCounseling:
        "The results of the NIFT Entrance Exam are usually declared on the official website of NIFT within a few weeks after the examination. Candidates can check their results using their login credentials. Subsequently, counseling sessions are conducted by NIFT campuses for shortlisting candidates based on their performance in the entrance exam, portfolio evaluation, and other criteria specified by the institute.",
      preparationResources:
        "Candidates preparing for the NIFT Entrance Exam can avail themselves of various resources to enhance their preparation. These include coaching institutes offering specialized NIFT preparation courses, online platforms providing study materials, mock tests, and design exercises, as well as a wide range of books and resources focusing on design, creativity, and fashion trends. Additionally, practicing previous years question papers and participating in mock tests can help candidates familiarize themselves with the exam pattern and improve their performance on the day of the exam.",
      importantDates:
        "It is crucial for candidates to stay updated with the important dates related to the NIFT Entrance Exam, including registration commencement and deadline, examination date, result declaration date, and counseling schedule. Timely preparation and adherence to deadlines are essential for success in the examination and the subsequent admission process.",
    },
    ICAR: {
      title: "ICAR AIEEA (All India Entrance Examination for Admission)",
      purpose:
        "ICAR AIEEA serves as the gateway for admission to undergraduate, postgraduate, and doctoral programs in agricultural sciences offered by various agricultural universities, institutes, and colleges across India. The examination aims to assess candidates aptitude, knowledge, and understanding of agricultural concepts and principles, ensuring the selection of meritorious candidates for pursuing higher education and research in the field of agriculture.",
      conductingBody:
        "The Indian Council of Agricultural Research (ICAR) is responsible for conducting the ICAR AIEEA. ICAR is an autonomous organization under the Department of Agricultural Research and Education (DARE), Ministry of Agriculture and Farmers Welfare, Government of India. It serves as the apex body for coordinating, guiding, and managing agricultural research and education in the country.",
      frequency:
        "ICAR AIEEA is conducted once a year, usually in the month of June or July. The exact date may vary from year to year, and candidates are advised to refer to the official ICAR website for updates and announcements regarding the examination schedule.",
      mode: "The ICAR AIEEA is conducted in Computer-Based Test (CBT) mode, providing candidates with a standardized testing environment and efficient administration of the examination. The CBT mode allows for the timely conduct of the exam, quick evaluation of responses, and declaration of results.",
      subjectsCovered:
        "The subjects covered in ICAR AIEEA vary according to the program applied for, encompassing a wide range of disciplines related to agricultural sciences. Common subjects may include Agriculture, Biology, Mathematics, Chemistry, Physics, and General Knowledge. The syllabus for each program is designed to assess candidates knowledge and understanding of relevant concepts and principles.",
      examPattern:
        "The exam pattern for ICAR AIEEA varies according to the program applied for, with different question formats and weightage assigned to each subject or section. For example, the pattern for undergraduate programs may differ from that of postgraduate or doctoral programs. Candidates are advised to refer to the official ICAR AIEEA information brochure or website for detailed information about the exam pattern relevant to their chosen program.",
      eligibilityCriteria:
        "The eligibility criteria for ICAR AIEEA vary according to the program applied for and may include educational qualifications, age limit, and specific requirements related to the candidates background and specialization. Generally, candidates must have passed or appeared for their 10+2 examination from a recognized board or university with relevant subjects. Additional eligibility criteria may apply for specific programs or categories of candidates, such as reserved categories or foreign nationals.",
      registrationProcess:
        "Candidates interested in appearing for ICAR AIEEA are required to complete the online registration process through the official website of ICAR. The registration process typically involves filling out the application form, providing necessary details and documents, and paying the application fee within the specified deadline. Candidates are advised to carefully read the instructions and guidelines provided on the website before proceeding with the registration process.",
      admitCard:
        "Upon successful registration, candidates can download the ICAR AIEEA admit card from the official website of ICAR. The admit card contains essential details such as the candidates name, roll number, examination center, date, and timing of the exam. It is mandatory for candidates to carry the admit card to the examination center along with a valid photo ID proof for verification purposes.",
      resultAndCounseling:
        "The results of ICAR AIEEA are usually declared on the official website of ICAR within a few weeks after the examination. Candidates can check their results using their login credentials. Subsequently, counseling sessions are conducted by respective agricultural universities and institutes for shortlisting candidates based on their performance in the entrance exam, merit ranking, and other criteria specified by the participating institutions. The counseling process involves seat allocation, document verification, and final admission procedures.",
      preparationResources:
        "Candidates preparing for ICAR AIEEA can avail themselves of various resources to enhance their preparation. These include coaching institutes offering specialized ICAR AIEEA preparation courses, online platforms providing study materials, mock tests, and practice questions, as well as a wide range of books and resources focusing on agricultural sciences and related subjects. Additionally, solving previous years question papers and participating in mock tests can help candidates familiarize themselves with the exam pattern, improve their time management skills, and assess their readiness for the exam.",
      importantDates:
        "It is essential for candidates to stay updated with the important dates related to ICAR AIEEA, including registration commencement and deadline, examination date, result declaration date, and counseling schedule. Timely preparation and adherence to deadlines are crucial for success in the examination and the subsequent admission process.",
    },
    CLAT: {
      title: "CLAT (Common Law Admission Test)",
      purpose:
        "CLAT serves as the primary entrance examination for admission to undergraduate (LLB) and postgraduate (LLM) law programs offered by National Law Universities (NLUs) and other participating institutes across India. The examination aims to assess candidates aptitude, knowledge, and analytical skills relevant to the study and practice of law, ensuring the selection of meritorious candidates for legal education and training.",
      conductingBody:
        "The CLAT is conducted by the Consortium of National Law Universities, which is a collaborative body comprising various NLUs located across India. The consortium is responsible for coordinating and administering the CLAT examination, setting the syllabus, conducting the examination, and declaring the results.",
      frequency:
        "CLAT is conducted once a year, typically in the month of May. The exact date may vary from year to year, and candidates are advised to check the official CLAT website for updates and announcements regarding the examination schedule.",
      mode: "The CLAT examination is conducted in Computer-Based Test (CBT) mode, providing candidates with a standardized testing environment and efficient administration of the examination. The CBT mode allows for the timely conduct of the exam, quick evaluation of responses, and declaration of results.",
      subjectsCovered:
        "The CLAT syllabus covers various subjects essential for the study and practice of law, including English Language, Current Affairs Including General Knowledge, Legal Reasoning, Logical Reasoning, and Quantitative Techniques. These subjects are designed to assess candidates proficiency in language comprehension, awareness of current events, legal reasoning ability, logical reasoning skills, and quantitative aptitude.",
      examPattern:
        "The CLAT exam pattern includes multiple-choice questions (MCQs) based on the subjects covered in the syllabus. Candidates are required to choose the correct answer from the options provided for each question. The examination assesses candidates knowledge, understanding, and application of concepts relevant to the study and practice of law.",
      eligibilityCriteria:
        "The eligibility criteria for CLAT vary according to the program applied for and may include educational qualifications, age limit, and specific requirements related to the candidates background and specialization. Generally, candidates must have passed or appeared for their 10+2 examination from a recognized board or university. Additional eligibility criteria may apply for specific programs or categories of candidates, such as reserved categories or foreign nationals.",
      registrationProcess:
        "Candidates interested in appearing for CLAT are required to complete the online registration process through the official website of CLAT. The registration process typically involves filling out the application form, providing necessary details and documents, and paying the application fee within the specified deadline. Candidates are advised to carefully read the instructions and guidelines provided on the website before proceeding with the registration process.",
      admitCard:
        "Upon successful registration, candidates can download the CLAT admit card from the official website of CLAT. The admit card contains essential details such as the candidates name, roll number, examination center, date, and timing of the exam. It is mandatory for candidates to carry the admit card to the examination center along with a valid photo ID proof for verification purposes.",
      resultAndCounseling:
        "The results of CLAT are usually declared on the official website of CLAT within a few weeks after the examination. Candidates can check their results using their login credentials. Subsequently, counseling sessions are conducted by NLUs and participating institutes for shortlisting candidates based on their performance in the entrance exam, merit ranking, and other criteria specified by the respective institutions. The counseling process involves seat allocation, document verification, and final admission procedures.",
      preparationResources:
        "Candidates preparing for CLAT can avail themselves of various resources to enhance their preparation. These include coaching institutes offering specialized CLAT preparation courses, online platforms providing study materials, mock tests, and practice questions, as well as a wide range of books and resources focusing on legal reasoning, logical reasoning, English language, and current affairs. Additionally, solving previous years question papers and participating in mock tests can help candidates familiarize themselves with the exam pattern, improve their time management skills, and assess their readiness for the exam.",
      importantDates:
        "It is essential for candidates to stay updated with the important dates related to CLAT, including registration commencement and deadline, examination date, result declaration date, and counseling schedule. Timely preparation and adherence to deadlines are crucial for success in the examination and the subsequent admission process.",
    },
  };

  useEffect(() => {
    fetchExamDetails();
  }, [selectedExam]);

  const fetchExamDetails = async () => {
    try {
      setExamDetails(examsDetails[selectedExam] || {});
    } catch (error) {
      console.error("Error fetching exam details:", error.message);
    }
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img" />
      <div className="exams-overlay colleges-container">
        <div className="exams-title">
          <h2>Exams</h2>
          <button className="colleges-filter-btn" onClick={toggleFilterModal}>
            FILTER
          </button>
        </div>
        {isFilterModalOpen && (
          <div className="filter-modal">
            <div className="filter-modal-header">
              <h2>Courses Type</h2>
              <div className="clear-apply">
                <button
                  className="colleges-filter-modal-btn"
                  onClick={toggleFilterModal}
                >
                  APPLY
                </button>
              </div>
            </div>
            <div className="filter-modal-content-courses">
            {Object.keys(examsDetails).map((course, index) => (
              <div
                className={`exams-left-items ${
                  selectedExam === course ? "exams-selected-button" : ""
                }`}
                key={index}
                onClick={() => setSelectedExam(course)}
              >
                <h3>{course}</h3>
              </div>
            ))}
            </div>
          </div>
        )}
        <div className="exams-display-box">
          <div className="exams-display-box-filter">
            <h3 className="allexams">All exams</h3>

            {Object.keys(examsDetails).map((course, index) => (
              <div
                className={`exams-left-items ${
                  selectedExam === course ? "exams-selected-button" : ""
                }`}
                key={index}
                onClick={() => setSelectedExam(course)}
              >
                <h3>{course}</h3>
              </div>
            ))}
          </div>

          <div className="exams-display-box-list">
            <h1>{examDetails.title}</h1>
            <hr />
            <h2>Purpose</h2>
            <p>{examDetails.purpose}</p>

            <h2>Conducting Body</h2>
            <p>{examDetails.conductingBody}</p>

            <h2>Frequency</h2>
            <p>{examDetails.frequency}</p>

            <h2>Mode of Examination</h2>
            <p>{examDetails.mode}</p>

            <h2>Subjects Covered</h2>
            <p>{examDetails.subjectsCovered}</p>

            <h2>Exam Pattern</h2>
            <p>{examDetails.examPattern}</p>

            <h2>Eligibility Criteria</h2>
            <p>{examDetails.eligibilityCriteria}</p>

            <h2>Registration Process</h2>
            <p>{examDetails.registrationProcess}</p>

            <h2>Admit Card</h2>
            <p>{examDetails.admitCard}</p>

            <h2>Result and Counseling</h2>
            <p>{examDetails.resultAndCounseling}</p>

            <h2>Preparation Resources</h2>
            <p>{examDetails.preparationResources}</p>

            <h2>Important Dates</h2>
            <p>{examDetails.importantDates}</p>

            <hr />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Exams;
