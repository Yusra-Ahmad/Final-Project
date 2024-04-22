import { Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Services from "./components/services/Services";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Homepage />
      <Login />
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services/>}/>
      </Routes>
    </>
  );
}

export default App;
