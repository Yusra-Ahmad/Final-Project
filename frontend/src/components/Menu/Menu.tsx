import { useState } from "react";
import "./menu.scss";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleLoginStatus = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };
  return (
    <div className="menu">
      <ul>
        <Link to="/" className="link">
          <li>Home </li>
        </Link>
        <Link to="/products" className="link">
          <li>Products</li>
        </Link>
        <Link to="services" className="link">
          <li>Services</li>
        </Link>
        <Link to="about" className="link">
          <li>About</li>
        </Link>
        <Link to="register" className="link">
          <li>Register</li>
        </Link>

        {isLoggedIn ? (
          <Link to="/login" onChange={toggleLoginStatus} className="link">
            <li>Login</li>
          </Link>
        ) : (
          <li onChange={toggleLoginStatus}>Logout</li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
