import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./register.scss";
const Register = () => {
  const firstnameInput = useRef<HTMLInputElement>(null);
  const lastnameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const handleShowPassword = () => {
    setShowpassword((prev) => !prev);
  };
  // useEffect(() => {}, [register]);
  // function handleData(e) {
  //   setInputData({ ...inputData, [e.target.name]: e.target.value });
  //   console.log("inputData", inputData);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   !firstnameInput ||
    //   !lastnameInput ||
    //   !emailInput ||
    //   !passwordInput ||
    //   !confirmPasswordInput
    // ) {
    //   alert("All fields are Mandatory");
    // }
    const email = emailInput.current.value.trim();
    const firstname = firstnameInput.current.value.trim();
    const lastname = lastnameInput.current.value.trim();
    const password = passwordInput.current.value.trim();
    const confirmPassword = confirmPasswordInput.current.value.trim();
    try {
      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
        }),
      };
      const request = await fetch(
        "http://localhost:3020/auth/register",
        config
      );
      const result = await request.json();
      console.log("result", result);
      if (!result.error) {
        setMessage(
          "Congratulations on successfully completing your registration! You're all set to get started."
        );
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="register-container">
      {/* <pre>
        {" "}
        {register ? (
          <h2>Hello {inputData.name}, you have Registered successfully</h2>
        ) : (
          ""
        )}{" "}
      </pre> */}
      <form className="register-form" onSubmit={handleSubmit}>
        <p>Registration </p>
        <div className="input-div">
          <input
            className="register-input"
            type="text"
            placeholder="First Name*"
            name="name"
            ref={firstnameInput}
          />
        </div>
        <div className="input-div">
          <input
            className="register-input"
            type="text"
            placeholder="Last Name*"
            name="name"
            ref={lastnameInput}
          />
        </div>
        <div className="input-div">
          <input
            className="register-input"
            type="email"
            placeholder="Email*"
            name="email"
            ref={emailInput}
          />
        </div>
        <div className="input-div">
          {showPassword ? (
            <input
              ref={passwordInput}
              className="register-input "
              type="text"
              placeholder="Password*"
            />
          ) : (
            <input
              ref={passwordInput}
              className="register-input "
              type="password"
              placeholder="Password*"
            />
          )}
          <span className="eye-icon" onClick={handleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="input-div">
          {showPassword ? (
            <input
              ref={confirmPasswordInput}
              className="register-input "
              type="text"
              placeholder="Confirm Password*"
            />
          ) : (
            <input
              ref={confirmPasswordInput}
              className="register-input "
              type="password"
              placeholder="Confirm Password*"
            />
          )}
          <span className="eye-icon" onClick={handleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="register-div">
          <button className="register-button" type="submit">
            Submit
          </button>
          <Link to="/login" className="login">
            Already have an account
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register;