import { FaTrash } from 'react-icons/fa';
import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import StripeCheckout from 'react-stripe-checkout';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [stripeToken, setStripeToken] = useState(null);

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{ color: 'white' }}>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async (token) => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:8000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
        token: token
      })
    });

    console.log("Order Response : ",response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      setStripeToken(token);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div >
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
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
          <tbody style={{ color: 'white' }}>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" style={{ color: 'white' }}><FaTrash onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2' style={{ color: 'white' }}>Total Price: {totalPrice}/-</h1></div>
        <div>
          {stripeToken ? (
            <div className="text-success fs-4">Payment Successful!</div>
          ) : (
            <StripeCheckout
              stripeKey="pk_test_51MsipeSEMRCrNiynwn0YwN0SIUuhKR7ERC98grVOFQKE1rPqdTijsQjystU34OaFbajOKJsQj8Jh2qXdTytHSmKr00CbromXsG"
              token={handleCheckOut}
              amount={totalPrice * 100}
              currency="INR"
              name="Food Ordering App"
              email={localStorage.getItem("userEmail")}
              billingAddress
              shippingAddress
              zipCode
            >
              <button className='btn bg-success mt-5'>Check Out</button>
            </StripeCheckout>
          )}
        </div>
      </div>
    </div>
  )
}
