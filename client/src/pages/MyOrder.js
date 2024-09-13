import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import '../css/myorder.css';
export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const data = await response.json();
            setOrderData(data.orderData?.order_data || []);
        } catch (error) {
            console.error('Error fetching order data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <NavBar className="navbar" />
            <div className="order-list">
                {orderData.length > 0 ? (
                    orderData.slice(0).reverse().map((order, index) => (
                        <div key={index} className="order-date-group">
                            {order[0]?.Order_date && (
                                <div className="order-date">
                                    <h3>{order[0].Order_date}</h3>
                                </div>
                            )}
                            <div className="order-items">
                                {order.map((item, subIndex) => (
                                    !item.Order_date && (
                                        <div key={subIndex} className="order-item">
                                            <img src={item.img} alt={item.name} />
                                            <div className="details">
                                                <h5>{item.name}</h5>
                                                <span>Quantity: {item.qty}</span>
                                                <span>Size: {item.size}</span>
                                                <div className="price">₹{item.price}/-</div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
            <Footer className="footer" />
        </div>
    );
}