import { useState } from "react";
import "./menu.scss";

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoginStatus = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };
  return (
    <div className="menu">
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Services</li>
        <li>About</li>
        <li>Register</li>
        {isLoggedIn ? (
          <li onClick={toggleLoginStatus}>Login</li>
        ) : (
          <li onClick={toggleLoginStatus}>Logout</li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
