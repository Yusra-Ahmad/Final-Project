import { Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Services from "./components/services/Services";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./context/Cart";

function App() {
  return (
    <>
      <Homepage />
      <Login />
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
    </>
  );
}

export default App;
