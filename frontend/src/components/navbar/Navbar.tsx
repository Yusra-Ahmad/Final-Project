import { TfiAlignLeft } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { PiShoppingCart } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { Link } from "react-router-dom";
import "animate.css";
import { useNavigate } from "react-router-dom";
import bliss from "../../assets/bliss2.png";
import "./navbar.scss";
import { useContext, useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import { CartContext } from "../../context/Cart";
import { useUser } from "../../context/UserContext";
const Navbar = () => {
  const [dropMenu, setDropMenu] = useState(true);
  const [userIcon, setUserIcon] = useState(true);
  const { cartItems } = useContext(CartContext);
  const { user, token } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const [showIcons, setShowIcons] = useState(false);
  let firstLatter = "";
  if (user) {
    console.log(user);
    firstLatter = user.firstname.charAt(0).toUpperCase();
    console.log(firstLatter);
  }
  const handleUserIcon = () => {
    if (token) {
      setUserIcon(false);
    }
  };
  const handleDropMenu = () => {
    console.log("this runs");
    setDropMenu((prevDropMenu) => !prevDropMenu);
    // Toggle the menu-open class on the body element
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    document.body.classList.toggle("menu-open");
  };
  const navigate = useNavigate();
  const handleAppointment = () => {
    if (user) {
      navigate("/book-appointment");
    } else {
      navigate("/login", { state: { from: "/service" } });
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // const handleToggle = () => {
  //   console.log("this runs");
  //   setShowIcons((prev) => !prev);
  // };
  return (
    <div className="navbar-container">
      <div className="navbar">
        <ul>
          {dropMenu ? (
            <li onClick={handleDropMenu} className="menu-icon">
              {!isMobile && <span>Menu</span>}
              <TfiAlignLeft />
            </li>
          ) : (
            <li className="menu-icon">
              <AiOutlineClose onClick={handleDropMenu} />
            </li>
          )}
          <Menu handleDropMenu={handleDropMenu} dropMenu={dropMenu} />
        </ul>
        <Link className={`${dropMenu ? "" : "hidden"}`} to="/">
          <img src={bliss} alt="" />
        </Link>
        <ul
          className={`cart-ul ${dropMenu ? "" : "hidden"} ${
            !isMobile ? "" : "hidden"
          } `}
        >
          {token ? (
            <Link onChange={handleUserIcon} className="cart-li" to="/logout">
              <span className="first-latter">{firstLatter}</span>
            </Link>
          ) : (
            <Link onChange={handleUserIcon} className="cart-li" to="/login">
              <FaUser className="cart-icon" />
            </Link>
          )}
          <Link className="cart-li" to="/cart">
            <PiShoppingCart className="cart-icon" />
            {cartItems.length > 0 && (
              <span className="btn-badge">{cartItems.length}</span>
            )}
          </Link>
          <MdOutlineCalendarMonth
            className="cart-icon"
            onClick={handleAppointment}
          />
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
