// Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import '../../styles/cart.scss';
import Footer from "../home/Footer";
import { useCart } from "../Context/CartContext.jsx";

const Cart = () => {
  const { cartItems } = useCart();

  // Calculate total quantity and total price
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.18;
  const shippingCharges = 200;
  const grandTotal = total + tax + shippingCharges;

  return (
    <section className="cart">
      <main>
        {/* Render cart items */}
        {cartItems.map((item, index) => (
          <div className="cartItem" key={index}>
            <div>
              <h4>{item.title} {item.quantity > 1 && `(${item.quantity})`}</h4>
              <p>₹{item.price} x {item.quantity}</p>
            </div>
          </div>
        ))}
        {/* Render total and checkout button */}
        <article>
          <div>
            <h4>Total Items</h4>
            <p>{totalItems}</p>
          </div>
          <div>
            <h4>Sub Total </h4>
            <p>₹{total}</p>
          </div>
          <div>
            <h4>Tax</h4>
            <p>₹{tax}</p>
          </div>
          <div>
            <h4>Shipping Charges</h4>
            <p>₹{shippingCharges}</p>
          </div>{" "}
          <div>
            <h4>Total</h4>
            <p>₹{grandTotal}</p>
          </div>
          {/* Link to the shipping page */}
          <Link to="/shipping">Checkout</Link>
        </article>
      </main>
      {/* <Footer /> */}
    </section>
  );
};

export default Cart;