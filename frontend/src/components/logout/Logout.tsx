import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./logout.scss";

const Logout = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsLoggedIn, setToken } = useUser();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    setIsLoggedIn(() => {
      return false;
    });
    setToken(null);
    navigate("/");
  };

  const handleCancelLogout = () => {
    navigate("/");
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const userName =
    user && `${capitalize(user.firstname)} ${capitalize(user.lastname)}`;

  return (
    <div className="logout-container">
      <div className="logout-div">
        <h1>{userName}</h1>
        <p>Are you sure you want to logout?</p>
        <div className="logout-buttons">
          <button onClick={handleLogout} className="confirm-button">
            <span>Yes</span>
          </button>
          <button onClick={handleCancelLogout} className="cancel-button">
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
