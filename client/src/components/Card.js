import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from '../contextReducer/ContextReducer';
import '../css/card.css'; // Importing the CSS file

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');
    const options = props.options;
    const priceOptions = Object.keys(options);

    const handleAddToCart = async () => {
        let food = data.find(item => item.id === props.foodItem._id);

        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
            } else {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
            }
        } else {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        }
    };

    const finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div className="card-container">
            <div className="card">
                <img src={props.foodItem.img} alt="Food Item" className="card-img" />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="card-options">
                        <select className="card-select" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select className="card-select" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map(data => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className="card-price">
                            ₹{finalPrice}
                        </div>
                    </div>
                    <hr />
                    <button className="card-btn" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
