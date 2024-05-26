import { Link } from "react-router-dom";
import "./confirmationPage.scss";
import { ImMail4 } from "react-icons/im";

const ConfirmationPage = () => {
  return (
    <div className="confirmationPage-container">
      <div>
        <ImMail4 className="mail-icon" />

        <h1>Check Your Email</h1>
        <p>
          We've sent a password reset link to your email address. Please check
          your inbox and follow the instructions to reset your password.
        </p>
        <Link className="back-to-home" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
