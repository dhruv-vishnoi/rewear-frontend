import React from "react";
import { useNavigate } from "react-router-dom";
import "./global.css";

export default function ProductCard({ product, swapMode, onSwapSelect }) {
  const navigate = useNavigate();

  const openProduct = () => {
    if (swapMode) {
      onSwapSelect();
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <div className="product-card" onClick={openProduct}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <p>Size: {product.size}</p>

      {swapMode && (
        <button className="swap-select-btn">Choose for Swap</button>
      )}
    </div>
  );
}
