import React from "react";
import { Link } from "react-router-dom";
import "../styles/AfterOrderPage.scss";

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation">
      <h2>Message was successfully submitted.</h2>
      <p>Our Staff Will Be Contact You Soon via Email !!!</p>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
