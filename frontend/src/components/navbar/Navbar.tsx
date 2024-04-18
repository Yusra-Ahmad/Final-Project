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
      <ul>
        {dropMenu ? (
          <li
            onClick={handleDropMenu}
            className={`menu-icon ${dropMenu ? "active" : ""}`}
          >
            Menu <TfiAlignLeft />
          </li>
        ) : (
          <li className={`menu-icon ${dropMenu ? "open" : ""}`}>
            <AiOutlineClose onClick={handleDropMenu} />
            <Menu />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
