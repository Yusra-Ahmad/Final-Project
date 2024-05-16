import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaypal, FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';
import './CheckoutForm.scss';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/Cart';
import emailjs from "emailjs-com";

interface FormState {
  fullName: string;
  telephone: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  paymentMethod: 'paypal' | 'creditCard' | 'debitCard';
}

const CheckoutForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    telephone: '',
    address: '',
    city: '',
    country: '',
    postcode: '',
    paymentMethod: 'paypal',
  });
  const [isCheckoutComplete, setIsCheckoutComplete] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);
  const Base_Url = 'http://localhost:3020';
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);

  const submitOrder = () => {
    if (token) {
      const fetchOrders = async () => {
        const { fullName, address, city, country, postcode } = formState;
        const requestBody = {
          products: cartItems.map(item => ({
            product: item._id,
            quantity: item.quantity
          })),
          totalAmount: getCartTotal(),
          shippingAddress: {
            fullName,
            address,
            city,
            country,
            postcode
          },
          paymentMethod: formState.paymentMethod
        };
        try {
          const response = await fetch(`${Base_Url}/orders`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
          const data = await response.json();
          console.log('Order submitted:', data);
          setIsCheckoutComplete(true);
          clearCart(); // Clear the cart after successful checkout
          sendConfirmationEmail();
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
    }
  };

  useEffect(() => {
    emailjs.init('MCP7eN1sKKWReuKKW')
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): boolean => {
    const { fullName, telephone, address, city, country, postcode } = formState;
    const isValidTelephone = /^\d+$/.test(telephone); // Check if the telephone contains only numbers
    return fullName && isValidTelephone && address && city && country && postcode;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      console.log("Checking out...", formState);
      setIsCheckoutComplete(true);
      submitOrder();
    } else {
      alert("Please ensure all fields are correctly filled.");
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const sendConfirmationEmail = async () => {
    const { fullName } = formState;

    const formattedTemplate = {
      to_name: fullName,
      total_amount: getCartTotal(),
      user_email: user?.email,
      // user_id:user.id,  // Extract user ID from user context
    };
    try {
      console.log("formattedTemplate", formattedTemplate);

      await emailjs.send(
        "service_m46fwtd",
        "template_vovbtec",
        formattedTemplate,
      );

      console.log("Confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  };

  return (
    <div className={`checkout-form-container ${isCheckoutComplete ? 'thank-you-background' : ''}`}>
      {isCheckoutComplete ? (
        <div className="thank-you-message">
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been placed and is being processed.</p>
          <button className="continue-shopping-button" onClick={handleContinueShopping}><span>Continue Shopping</span></button>
        </div>
      ) : (
        <>
          <div className="form-section">
            <div className="contact-info">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={formState.fullName}
                onChange={handleInputChange}
              />
              <label htmlFor="telephone">Telephone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                placeholder="Telephone"
                value={formState.telephone}
                onChange={handleInputChange}
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formState.address}
                onChange={handleInputChange}
              />
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formState.city}
                onChange={handleInputChange}
              />
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formState.country}
                onChange={handleInputChange}
              >
                <option value="">Select a country</option>
                <option value="USA">United States</option>
                <option value="CAN">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AUS">Australia</option>
                <option value="IND">India</option>
                <option value="GER">Germany</option>
                <option value="JPN">Japan</option>
                <option value="CHN">China</option>
                <option value="FRA">France</option>
                <option value="ITA">Italy</option>
              </select>
              <label htmlFor="postcode">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="Postcode"
                value={formState.postcode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="payment-section">
            <div className="payment-method">
              <label>Payment Method</label>
              <div className="icon-wrapper">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formState.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                />
                <label htmlFor="paypal"><FaPaypal /> PayPal</label>
              </div>
              <div className="icon-wrapper">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formState.paymentMethod === 'creditCard'}
                  onChange={handleInputChange}
                />
                <label htmlFor="creditCard"><FaCreditCard /> Credit Card</label>
              </div>
              <div className="icon-wrapper">
                <input
                  type="radio"
                  id="debitCard"
                  name="paymentMethod"
                  value="debitCard"
                  checked={formState.paymentMethod === 'debitCard'}
                  onChange={handleInputChange}
                />
                <label htmlFor="debitCard"><FaMoneyCheckAlt /> Debit Card</label>
              </div>
            </div>
            <button
              type="button"
              className="continue-button"
              onClick={handleCheckout}
            >
              <span>Pay now</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
