import "./header.scss";
import Navbar from "../navbar/Navbar";
import logo from "../../assets/logo.svg";
const Hero = () => {
  return (
    <div className="hero">
      <div>
        <Navbar />
      </div>
      <img src={logo} alt="" className="logo" />
      {/* <video src={logo} className="logo" autoPlay loop muted></video> */}
    </div>
  );
};

export default Hero;
