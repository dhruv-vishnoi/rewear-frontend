import React, { useState } from "react";
import axios from "axios";
import "./global.css";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("image", image);
    formData.append("ownerId", user._id);

    try {
      const res = await axios.post("http://rewear-backend-a1uz.onrender.com/api/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        alert("Product uploaded!");
        setTitle("");
        setDescription("");
        setPrice("");
        setSize("");
        setImage(null);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div className="page-center">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Sell an Item</h2>

        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

        <input type="text" placeholder="Item Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <textarea placeholder="Item Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required />

        <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <select value={size} onChange={(e) => setSize(e.target.value)} required>
          <option value="">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <button type="submit">Upload Item</button>
      </form>
    </div>
  );
}
