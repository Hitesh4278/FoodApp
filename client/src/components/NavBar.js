import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contextReducer/ContextReducer';
import Cart from '../pages/Cart';
import '../css/navbar.css';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false); 
  const data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setShowCart(!showCart); 
  };

  const closeCart = () => {
    setShowCart(false); 
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">MyFood</Link>
          <button type="button" className="navbar-toggle" onClick={toggleMenu}>
            &#9776;
          </button>
        </div>
        <div className="navbar-links">
          <ul className={`navbar-menu ${menuOpen ? 'show' : ''}`}>
            <li>
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            {localStorage.getItem('authToken') && (
              <li>
                <Link to="/myOrder" className="navbar-link">MyOrder</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem('authToken') ? (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/createuser" className="auth-link">SignUp</Link>
            </div>
          ) : (
            <div className="auth-controls">
              <div className="cart" onClick={toggleCart}>
                MyCart ({data.length})
              </div>
              <div className="logout" onClick={handleLogout}>
                LogOut
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Popup Modal */}
      {localStorage.getItem('authToken') && showCart && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeCart}>&times;</span>
            <Cart />
          </div>
        </div>
      )}
    </div>
  );
}
