import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./global.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://rewear-backend-2.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="product-detail">
      <div className="product-image-section">
        <img src={product.image} alt={product.title} className="detail-img" />
      </div>

      <div className="product-detail-info">
        <h1>{product.title}</h1>

        <p className="detail-price">₹{product.price}</p>
        <p className="detail-size">Size: {product.size}</p>
        <p className="detail-desc">{product.description}</p>

        <div className="product-actions">
          {/* BUY BUTTON → GO TO PAYMENTS PAGE */}
          <button
            className="buy-btn"
            onClick={() =>
              navigate("/payment", { state: { product } })
            }
          >
            Buy Now
          </button>

          {/* SWAP BUTTON → GO TO HOME WITH swapFor */}
          <button
            className="swap-btn"
            onClick={() =>
              navigate("/", { state: { swapFor: product } })
            }
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}
