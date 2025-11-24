import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import "./global.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const swapFor = location.state?.swapFor || null;

  useEffect(() => {
    axios
      .get("http://rewear-backend-a1uz.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSwapSelection = (selectedProduct) => {
    const priceA = Number(swapFor?.price);
    const priceB = Number(selectedProduct.price);
    const diff = Math.abs(priceA - priceB);

    if (diff <= 200) {
      alert("Swap Successful! 🎉");
      console.log("Swapping:", swapFor, "WITH", selectedProduct);
    } else {
      alert(
        `Swap Failed ❌\nPrice difference is ₹${diff} — must be ≤ ₹200`
      );
    }
  };

  return (
    <div className="home-page">

      {/* HERO SECTION WITH UPDATED IMAGE */}
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "80px 20px",
          borderRadius: "12px",
          color: "white",
          textShadow: "0 4px 10px rgba(0,0,0,0.5)",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "10px", fontWeight: "700" }}>
          Welcome to Rewear
        </h1>

        <p
          className="tagline"
          style={{ fontSize: "20px", fontWeight: "500", opacity: 0.95 }}
        >
          Buy • Sell • Swap — Sustainable Fashion 🌱
        </p>
      </div>

      {/* ACTION BUTTON BAR */}
      <div className="action-bar">
        <button
          className="action-btn"
          onClick={() => navigate("/", { replace: true })}
        >
          Buy / Swap
        </button>

        <button className="action-btn" onClick={() => navigate("/create")}>
          Sell Item
        </button>
      </div>

      {/* TITLE SECTION */}
      {swapFor ? (
        <h2 className="section-title">
          Select a product to swap with:
          (Your item: {swapFor.title}, ₹{swapFor.price})
        </h2>
      ) : (
        <h2 className="section-title">Latest Products</h2>
      )}

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            swapMode={!!swapFor}
            onSwapSelect={() => handleSwapSelection(p)}
          />
        ))}
      </div>
    </div>
  );
}
