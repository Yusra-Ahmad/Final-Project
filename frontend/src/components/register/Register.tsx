import React, { useEffect, useRef, useState } from "react";
import "./register.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

// interface UserContext {
//   setToken: (value: string) => void;
//   setUser: (value: UserType) => void;
//   token: string | null; // Assuming token is of type string
// }

// type UserType = {
//   id: number;
//   email: string;
//   password: string;
// };

const Register = () => {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUser, token } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      const destination = location.state?.form || "/";
      navigate(destination);
    }
  }, [token, navigate, location.state]);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value.trim() || "";
    const firstname = firstnameRef.current?.value.trim() || "";
    const lastname = lastnameRef.current?.value.trim() || "";

    try {
      const user = {
        firstname,
        lastname,
        email,
        password,
      };
      const response = await fetch("http://localhost:3020/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log(result);
      if (!result.error) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
        const CheckoutForm = location.state?.from || "/";
        navigate(CheckoutForm);
        // } else {
        //   console.log("Registration error:", result.error);
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };
  return (
    <>
      <div className="register-container">
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

          <div className="register-button-div">
            <button type="submit" className="register-button">
              Submit
            </button>
            <Link className="login" to="/login">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
