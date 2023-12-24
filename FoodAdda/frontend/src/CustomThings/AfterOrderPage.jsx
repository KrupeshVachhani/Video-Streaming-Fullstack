import React from "react";
import { Link } from "react-router-dom";
import "../styles/AfterOrderPage.scss";

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation">
      <h2>Order successfully submitted.</h2>
      <p>We will inform you soon via email.</p>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
