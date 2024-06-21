import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login/Login";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
