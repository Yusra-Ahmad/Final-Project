import React, { useRef, useState } from "react";
import "./register.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiError } from "react-icons/bi";

const Register = () => {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errormessages, setErrorMessages] = useState<string>("");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleSuccessMessage = () => {
    setSuccessMessage("You have registered successfully");
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value.trim() || "";
    const firstname = firstnameRef.current?.value.trim() || "";
    const lastname = lastnameRef.current?.value.trim() || "";
    const confirmPassword = confirmPasswordRef.current?.value.trim() || "";

    try {
      const user = {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      };
      const response = await fetch(`${import.meta.env.VITE_backend_url}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log("result", response.status);
      if (!result.error) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
        toggleSuccessMessage();
        const CheckoutForm = location.state?.from || "/login";
        setTimeout(() => {
          navigate(CheckoutForm);
        }, 5000);
      } else if (
        firstname === "" ||
        lastname === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        console.log("Registration error:", result.error);
        setErrorMessages("All Fields are Mandatory");

        console.log(" This is errormessages", errormessages);
      } else {
        if (typeof result.error === "string") {
          setErrorMessages(result.error);
        } else {
          setErrorMessages(result.error[0].msg);
        }
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };
  return (
    <>
      <div className="register-container">
        {errormessages && (
          <div className="error-message">
            <BiError className="error-icon" />
            <div className="error-container">
              <span className="error-span">There was a problem</span>

              <p className="error-para"> {errormessages} </p>
            </div>
          </div>
        )}
        <form onSubmit={submitHandler} className="register-form">
          <p>Registration </p>

          <div className="input-div">
            <input
              ref={firstnameRef}
              className="register-input"
              type="text"
              placeholder="First Name*"
            />
          </div>
          <div className="input-div">
            <input
              ref={lastnameRef}
              className="register-input"
              type="text"
              placeholder="Last Name*"
            />
          </div>
          <div className="input-div">
            <input
              ref={emailRef}
              className="register-input"
              type="email*"
              placeholder="Email"
            />
          </div>
          <div className="input-div">
            {showPassword ? (
              <input
                ref={passwordRef}
                className="register-input"
                type="text"
                placeholder="Password"
              />
            ) : (
              <input
                ref={passwordRef}
                className="register-input"
                type="password"
                placeholder="Password"
              />
            )}
            <span className="eye-icon" onClick={handleShowPassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="input-div">
            {showPassword ? (
              <input
                ref={confirmPasswordRef}
                className="register-input"
                type="text"
                placeholder="Confirm-Password"
              />
            ) : (
              <input
                ref={confirmPasswordRef}
                className="register-input"
                type="password"
                placeholder="Confirm-Password"
              />
            )}
            <span className="eye-icon" onClick={handleShowPassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="register-button-div">
            <button type="submit" className="register-button">
              Submit
            </button>

            <Link className="login" to="/login">
              Already have an account?
            </Link>
          </div>

          {successMessage && (
            <div className="success-message">{successMessage} </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Register;
