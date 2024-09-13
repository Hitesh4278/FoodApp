import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../contextReducer/ContextReducer';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ closeCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const data = useCart();
  const dispatch = useDispatchCart();

  // State for user inputs
  const [customerName, setCustomerName] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleOrder = async (transactionId) => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
        transactionId: transactionId,
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      closeCheckout();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('Error creating payment method:', error);
      alert(`Error: ${error.message}`);
      return;
    }

    const { id } = paymentMethod;

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          token: paymentMethod,
          order_data: data,
          customer_name: customerName, 
          customer_address: {
            line1: line1,    
            city: city,      
            state: state,    
            postal_code: postalCode,
            country: country,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Backend error:', result.error);
        alert(`Error: ${result.error}`);
        return;
      }

      const { clientSecret, status } = result.data;

      if (status === 'requires_action') {
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

        if (confirmError) {
          console.error('Error confirming payment:', confirmError);
          alert(`Error: ${confirmError.message}`);
        } else if (paymentIntent.status === 'succeeded') {
          handleOrder(paymentIntent.id);
          alert('Payment successful! Order placed.');
        } else {
          alert('Payment failed.');
        }
      } else if (status === 'succeeded') {
        handleOrder(clientSecret);
        alert('Payment successful! Order placed.');
      } else {
        alert('Payment failed.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="Address"
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="form-control mb-3"
        />
        <CardElement className="form-control mb-3" />
        <button type="submit" disabled={!stripe} className="btn btn-primary">
          Pay
        </button>
        {
            " "
        }
        <button type="button" onClick={closeCheckout} className="btn btn-secondary ml-2">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
