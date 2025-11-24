import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ProductPage from "./ProductPage";
import CreateListing from "./CreateListing";
import PaymentPage from "./PaymentPage";
import ThankYouPage from "./ThankYouPage";
import SwapRequests from "./SwapRequests";
import About from "./About";

import "./global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/create" element={<CreateListing />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Swap Requests */}
          <Route path="/requests" element={<SwapRequests />} />

          {/* Payment Flow */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
