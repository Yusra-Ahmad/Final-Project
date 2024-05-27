import { useRef, useState } from "react";
import "./resetPassword.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const ResetPassword = () => {
  const { token } = useParams();
  const newPasswordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPassword = newPasswordInput.current?.value.trim() || "";
    const confirmPassword = confirmPasswordInput.current?.value.trim() || "";

    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }
    setShowSpinner(true);
    setResetError("");

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      };
      const request = await fetch(
        `http://localhost:3020/auth/reset-password/${token}`,
        config
      );
      const result = await request.json();
      if (result.error) {
        setResetError(result.message || "Password reset failed");
      } else {
        setResetSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setShowSpinner(false);
      console.error("Reset password error:", error.message);
      setResetError("An unexpected error occurred");
    } finally {
      setShowSpinner(false);
    }
  };
  return (
    <div className="resetPassword-div">
      {resetSuccess ? (
        <div className="Success-message">
          <p>
            Password reset successfully! Please log in with your new password.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handlePasswordReset}
          className="resetPassword-form"
          action="submit"
        >
          <h2>Reset Password</h2>
          {resetError && <p className="error-message">{resetError}</p>}
          <div className="input-div">
            {showPassword ? (
              <input
                ref={newPasswordInput}
                className="resetPassword-input"
                type="text"
                placeholder="New Password"
              />
            ) : (
              <input
                ref={newPasswordInput}
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

          <button type="submit">Reset Password</button>
          <RotatingLines
            visible={showSpinner}
            height="35"
            width="35"
            color="grey"
            strokeWidth="3"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{ marginLeft: "10px" }}
          />
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
