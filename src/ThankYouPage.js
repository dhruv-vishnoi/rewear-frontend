import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./global.css";

export default function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, method } = location.state || {};

  return (
    <div className="thank-container">
      <h1 className="thank-title">🎉 Thank You for Shopping! 🎉</h1>
      <p className="thank-subtitle">
        Your payment was successful.
      </p>

      {product && (
        <div className="thank-product-box">
          <img src={product.image} alt="" />
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
        </div>
      )}

      <button className="back-home-btn" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
}
