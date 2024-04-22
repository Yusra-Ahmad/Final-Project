import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const [showPassword, setShowpassword] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowpassword((prev) => !prev);
  };

  const submitHandler = () => {
    const loginInfo = {
      email: emailInput.current.value.trim(),
      password: passwordInput.current.value.trim(),
    };
    console.log(loginInfo);
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <p>Login</p>
        <div className="input-div">
          <input
            ref={emailInput}
            className="login-input"
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="input-div">
          {showPassword ? (
            <input
              ref={passwordInput}
              className="login-input "
              type="text"
              placeholder="Password"
            />
          ) : (
            <input
              ref={passwordInput}
              className="login-input "
              type="password"
              placeholder="Password"
            />
          )}

          <span className="eye-icon" onClick={handleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="login-div">
          <button type="submit" className="login-button">
            Login
          </button>{" "}
          <Link className="register" to="/register">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
