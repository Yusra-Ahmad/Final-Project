import { TfiAlignLeft } from "react-icons/tfi";

import "./navbar.scss";
const Navbar = () => {
  return (
    <div className="navbar">
      <p>Saloon & Spa</p>
      <li className="menu-li">
        Menu
        <div className="menu-icon">
          <TfiAlignLeft />
        </div>
      </li>
    </div>
  );
};

export default Navbar;
