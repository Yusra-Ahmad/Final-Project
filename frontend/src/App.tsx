import { Routes, Route, NavLink } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
