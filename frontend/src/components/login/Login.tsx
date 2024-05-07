import "./login.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUser, token, setIsLoggedIn } = useUser();

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  useEffect(() => {
    if (token) {
      // Check if the user came from the cart, if so, navigate to checkout, else navigate to home or intended route
      const destination = location.state?.from?.pathname === "/cart" ? "/checkout" : location.state?.from || "/";
      navigate(destination);
    }
  }, [token, navigate, location.state]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current?.value.trim() || "";
    const password = passwordInput.current?.value.trim() || "";
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const request = await fetch("http://localhost:3020/auth/login", config);
      const result = await request.json();
      if (!result.error) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);

        setIsLoggedIn(true);
        // After setting the login state, the useEffect will handle redirection
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
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
              className="login-input"
              type="text"
              placeholder="Password"
            />
          ) : (
            <input
              ref={passwordInput}
              className="login-input"
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
          </button>
          <Link className="register" to="/register">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
