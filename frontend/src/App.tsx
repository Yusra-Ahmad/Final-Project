import { Routes, Route } from "react-router-dom";
// import"./App.scss";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Services from "./components/services/Services";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./context/Cart";
import { ServiceProvider } from "./context/serviceContext";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <>
      <CartProvider>
        <ServiceProvider>
          <Navbar />
          <Routes>
            {/* <div className="backgroundAnim"> */}
            {/* <div className="main"> */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />

            {/* </div> */}
            {/* </div> */}
          </Routes>
        </ServiceProvider>
      </CartProvider>
    </>
  );
}

export default App;
