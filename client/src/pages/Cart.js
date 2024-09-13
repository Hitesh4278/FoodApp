import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCart, useDispatchCart } from '../contextReducer/ContextReducer';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Cart = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const data = useCart();
  const dispatch = useDispatchCart();

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false); 
  };

  return (
    <div className='container mt-5'>
      {data.length === 0 ? (
        <div className='text-center fs-3 text-white'>The Cart is Empty!</div>
      ) : (
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-0"
                      style={{ color: 'white' }}
                      onClick={() => dispatch({ type: "REMOVE", index: index })}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div><h1 className='fs-2 text-white'>Total Price: ₹{totalPrice}/-</h1></div>
          <button className='btn btn-primary mt-3' onClick={handleCheckoutClick}>
            Checkout
          </button>

          {showCheckout && (
            <div className="mt-4">
              <Elements stripe={stripePromise}>
                <CheckoutForm closeCheckout={closeCheckout} />
              </Elements>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
