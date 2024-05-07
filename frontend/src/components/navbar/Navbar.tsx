import { TfiAlignLeft } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { PiShoppingCart } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { Link } from "react-router-dom";
import "animate.css";

import bliss from "../../assets/bliss2.png";

import "./navbar.scss";
import { useContext, useState } from "react";
import Menu from "../Menu/Menu";
import { CartContext } from "../../context/Cart";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const [dropMenu, setDropMenu] = useState(true);
  const [userIcon, setUserIcon] = useState(true);
  const { cartItems } = useContext(CartContext);
  const { user, token } = useUser();

  let firstLatter = "";
  if (user) {
    firstLatter = user.firstname.charAt(0).toUpperCase();
    console.log(firstLatter);
  }
  const handleUserIcon = () => {
    if (token) {
      setUserIcon(false);
    }
  };

  const handleDropMenu = () => {
    setDropMenu((prevDropMenu) => !prevDropMenu);
  };
  return (
    <div>
      <div className="navbar">
        <ul>
          {dropMenu ? (
            <li
              onClick={handleDropMenu}
              className="menu-icon animate__rotateIn"
            >
              <span>Menu</span>
              <TfiAlignLeft className={dropMenu ? " animate__rotateIn" : ""} />
            </li>
          ) : (
            <li className="menu-icon">
              <AiOutlineClose
                onClick={handleDropMenu}
                className={dropMenu ? " animate__rotateIn" : ""}
              />
            </li>
          )}
          <Menu handleDropMenu={handleDropMenu} dropMenu={dropMenu} />
        </ul>
        <Link to="/">
          <img src={bliss} alt="" />
        </Link>

        <ul className="cart-ul">
          {token ? (
            <Link onChange={handleUserIcon} className="cart-li " to="/logout">
              {/* <span className="first-latter">{firstLatter}</span> */}
            </Link>
          ) : (
            <Link onChange={handleUserIcon} className="cart-li" to="/login">
              <FaUser className="cart-icon" />
            </Link>
          )}

          <Link className="cart-li" to="/cart">
            <PiShoppingCart className="cart-icon" />
            <span className="btn-badge">{cartItems.length}</span>
          </Link>
          <Link className="cart-li" to="/services">
            <MdOutlineCalendarMonth className="cart-icon" />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
