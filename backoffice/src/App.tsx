import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Home from "./pages/Home";
import Slots from "./pages/Slots";
import Partners from "./pages/Partners";
import Users from "./pages/Users";
import CollegeDetails from "./pages/CollegeDetails";
import Message from "./pages/Message";
import HR from "./pages/HR";
import Courses from "./pages/Courses";
import CompanyDetails from "./pages/CompanyDetails";
import Events from "./pages/Events";
import NewOnboarding from "./pages/NewOnboarding";
import CourseApplications from "./pages/CourseApplications";
import PaidCourseApplicants from "./pages/PaidCourseApplicants";
import Settings from "./pages/Settings";
import Leads from "./pages/Leads";
import LeadsDetails from './pages/LeadsDetails';
import CollegeEditForm from "./pages/CollegeEditForm";
import CompanyEditForm from "./pages/CompanyEditForm";
import AmbassadorDetails from "./pages/AmbassadorDetails";
import AmbassadorEditForm from "./pages/AmbassadorEditForm";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/slots" element={<Slots />} />
          <Route path="/college/:collegeId" element={<CollegeDetails />} />
          <Route path="/company/:companyId" element={<CompanyDetails />} />
          <Route path="/ambassador/:ambassadorId" element={<AmbassadorDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/message" element={<Message />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/events" element={<Events />} />
          <Route path="/new-onboarding" element={<NewOnboarding />} />
          <Route path="/course-applications" element={<CourseApplications />} />
          <Route path="/paid-applications" element={<PaidCourseApplicants />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/leads/:applicationNumber" element={<LeadsDetails />} />
          <Route path="/college/edit/:collegeId" element={<CollegeEditForm />} />
          <Route path="/company/edit/:companyId" element={<CompanyEditForm />} />
          <Route path="/ambassador/edit/:ambassadorId" element={<AmbassadorEditForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
