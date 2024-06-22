import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login/Login";
import "./App.css";
import Home from "./pages/Home/Home";
import Slots from "./pages/Slots";
import Partners from "./pages/Partners/Partners";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/partners" element={<Partners/>} />
          <Route path="/slots" element={<Slots />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
