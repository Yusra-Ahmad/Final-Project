import React, { useRef, useState } from "react";
import "./resetPassword.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const password = passwordInput.current?.value.trim() || "";
    const confirmPassword = confirmPasswordInput.current?.value.trim() || "";

    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, confirmPassword }),
      };
      const request = await fetch(
        `http://localhost:3020/auth/reset-password/${token}`,
        config
      );
      const result = await request.json();
      console.log("result:", result);

      if (!result.error) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Reset password error:", error.message);
    }
  };
  return (
    <div className="resetPassword-div">
      <form
        onSubmit={submitHandler}
        className="resetPassword-form"
        action="submit"
      >
        <div className="input-div">
          {showPassword ? (
            <input
              ref={passwordInput}
              className="resetPassword-input"
              type="text"
              placeholder="New Password"
            />
          ) : (
            <input
              ref={passwordInput}
              className="resetPassword-input"
              type="password"
              placeholder="New Password"
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
              className="resetPassword-input"
              type="text"
              placeholder="Confirm New Password"
            />
          ) : (
            <input
              ref={confirmPasswordInput}
              className="resetPassword-input"
              type="password"
              placeholder="Confirm New Password"
            />
          )}
          <span className="eye-icon" onClick={handleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
