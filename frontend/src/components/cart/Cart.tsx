import React, { useContext } from 'react';
import './Cart.scss';
import { CartContext } from '../../context/Cart';
import Login from '../login/Login';

const Cart = () => {

  const Base_Url = 'http://localhost:3020';

  const { cartItems, clearCart, getCartTotal, removeFromCart, addToCart } = useContext(CartContext);


  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping cart</h1>
      </div>
      <div className="cart-items">
        <div className="cart-item" >
          <div className="product-details">

            <div>
              <h2>Product</h2>

            </div>
          </div>
          <div className="price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {cartItems.map(product => (
          <div className="cart-item" key={product.id}>
            <div className="product-details">
              <img src={`${Base_Url}/${product.image}`} alt={product.title} />
              <div>
                <h2>{product.title}</h2>
                <button className="remove-button">Remove</button>
              </div>
            </div>
            <div className="price">€{product.price}</div>
            <div className="quantity">{product.quantity}</div>
            <div className="total">€{product.quantity * product.price}</div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h2>Order summary</h2>
        <div className="subtotal">
          <span>Subtotal</span>
          <span>€{cartItems.reduce((previousValue, item) => previousValue + (item.quantity * item.price), 0).toFixed(2)}</span>
        </div>
        <div className="total">
          <span>Total (Inclusive of tax €0.00)</span>
          <span>€{cartItems.reduce((previousValue, item) => previousValue + (item.quantity * item.price), 0).toFixed(2)}</span>
        </div>
        <button className="checkout-button">Checkout</button>
      </div>
      <div >
        <p>You need to login first to continue checkout</p>
        <Login></Login>
      </div>
    </div>
  );
};

export default Cart;
