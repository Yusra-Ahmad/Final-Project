import { TfiAlignLeft } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";

import "./navbar.scss";
import { useState } from "react";
import Menu from "../Menu/Menu";
const Navbar = () => {
  const [dropMenu, setDropMenu] = useState(true);
  const handleDropMenu = () => {
    setDropMenu((prevDropMenu) => !prevDropMenu);
  };
  return (
    <div className="navbar">
      <p>Saloon & Spa</p>
      <li onClick={handleDropMenu} className="menu-li">
        {dropMenu ? (
          <div className={`menu-icon ${dropMenu ? "active" : ""}`}>
            Menu <TfiAlignLeft />
          </div>
        ) : (
          <div className={`menu-icon ${dropMenu ? "open" : ""}`}>
            <AiOutlineClose />
            <Menu />
          </div>
        )}
      </li>
    </div>
  );
};

export default Navbar;
