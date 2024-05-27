import { useRef, useState } from "react";
import "./forgotPassword.scss";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { RotatingLines } from "react-loader-spinner";

const ForgotPassword: React.FC = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current?.value.trim() || "";

    setShowSpinner(true);
    setError(false);

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      };
      const request = await fetch(
        "http://localhost:3020/auth/forgot-password",
        config
      );
      const result = await request.json();
      console.log(result);

      if (!result.error) {
        navigate("/confirmationPage");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <div className="forgotPassword-div">
      {error && (
        <div className="error-message">
          <BiError className="error-icon" />

          <div>
            <span>There was a problem</span>
            <p>We couldn't identify you with that email.</p>
          </div>
        </div>
      )}

      <form onSubmit={submitHandler} className="forgotPassword-form" action="">
        <h1>Password assistance</h1>
        <p>Enter the email address associated with your Bliss account.</p>
        <input
          className="forgotPassword-input"
          ref={emailInput}
          type="email"
          placeholder="Email"
          required
        />
        <button>Continue</button>
        <div style={{ marginLeft: "10px" }}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="0.75"
            width="35"
            visible={showSpinner}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
