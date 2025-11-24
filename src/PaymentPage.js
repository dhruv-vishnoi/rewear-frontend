import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./global.css";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;

  if (!product) return <h2 className="center-text">No product selected</h2>;

  const handlePayment = (method) => {
    console.log("Payment method:", method);

    navigate("/thankyou", {
      state: { product, method }
    });
  };

  return (
    <div className="payment-container">
      <h1>Choose Payment Method</h1>

      <h2 className="pay-product-title">
        {product.title} — ₹{product.price}
      </h2>

      <div className="payment-options">
        <button className="pay-btn" onClick={() => handlePayment("UPI")}>
          Pay with UPI
        </button>
        <button className="pay-btn" onClick={() => handlePayment("Card")}>
          Credit / Debit Card
        </button>
        <button className="pay-btn" onClick={() => handlePayment("COD")}>
          Cash on Delivery
        </button>
      </div>
    </div>
  );
}
