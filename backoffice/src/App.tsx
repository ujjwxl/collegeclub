import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Home from "./pages/Home";
import Slots from "./pages/Slots";
import Partners from "./pages/Partners";
import Users from "./pages/Users";
import CollegeDetails from "./pages/CollegeDetails";
import Message from "./pages/Message";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/partners" element={<Partners/>} />
          <Route path="/slots" element={<Slots />} />
          <Route path="/college/:collegeId" element={<CollegeDetails/>} />
          <Route path="/users" element={<Users />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
