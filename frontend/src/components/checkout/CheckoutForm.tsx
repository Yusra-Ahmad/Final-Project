import React, { useState ,} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './CheckoutForm.scss';
import { FaPaypal, FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';

interface FormState {
  email: string;
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
    email: '',
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

 


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): boolean => {
    const { email, fullName, telephone, address, city, country, postcode } = formState;
    const isValidTelephone = telephone.match(/^\d{10}$/);
    return email && fullName && isValidTelephone && address && city && country && postcode;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      console.log("Checking out...", formState);
      setIsCheckoutComplete(true); 
    } else {
      alert("Please ensure all fields are correctly filled.");
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="checkout-form-container">
      {isCheckoutComplete ? (
        <div className="thank-you-message">
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been placed and is being processed. Please review or update your contact information below.</p>
          <button className='continue-shopping-button' onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <form className="checkout-form">
          <div className="contact-info">
            <label htmlFor="email">Contact</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
            />
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
          <div className="payment-method">
            <label>Payment Method</label>
            <div className="icon-wrapper" >
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
            Pay now
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
