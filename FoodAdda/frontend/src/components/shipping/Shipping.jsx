// Shipping.jsx
import React, { useState } from "react";
import { Country, State } from "country-state-city";
import "../../styles/shipping.scss";
import { useCart } from "../Context/CartContext.jsx";
import Loader from "../../CustomThings/CustomAlterBox.jsx";

const Shipping = () => {
  const countries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  //cart functions

  // Calculate total quantity and total price
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = total * 0.18;
  const shippingCharges = 200;
  const grandTotal = total + tax + shippingCharges;

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderItems = {};
    await cartItems.forEach((item) => {
      orderItems[item.title] = {
        price: item.price,
        quantity: item.quantity,
      };
    });

    const shippingInfo = {
      Hno: e.target.houseNo.value,
      city: e.target.city.value,
      state: selectedState,
      country: selectedCountry,
      postalCode: parseInt(e.target.pincode.value),
      phoneNumber: parseInt(e.target.phone.value),
    };

    
    const orderData = {
      userName: name, // Add name to order data
      email: email, // Add email to order data
      shippingInfo,
      orderItems,
      totalPrice: grandTotal,
    };

    const jsonData = JSON.stringify(orderData);
    console.log(jsonData);

    fetch("http://localhost:3000/api/orders/postorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Alert the user that the order was successfully placed
        setLoading(false);
        window.location.href = "/order";
        // alert("Order placed successfully!");
        // Redirect to the home page
      })
      .catch((error) => {
        // Alert the user of the error
        alert("Error placing order: " + error.message);
        setLoading(false);
      });
      
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div className="mainShipping">
      <section className="shipping">
        <main>
          {!isOrderPlaced ? (
            <>
              <h1>Shipping Details</h1>
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div>
                  <label>House/Flat No.</label>
                  <input
                    type="text"
                    name="houseNo"
                    placeholder="Enter House No."
                    required
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    required
                  />
                </div>
                <div>
                  <label>Country</label>
                  <select onChange={handleCountryChange} required>
                    <option value="">Country</option>
                    {countries.map((country) => (
                      <option value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>State</label>
                  <select onChange={handleStateChange} required>
                    <option value="">State</option>
                    {State.getStatesOfCountry(selectedCountry).map((state) => (
                      <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Pin Code</label>
                  <input
                    type="number"
                    name="pincode"
                    placeholder="Enter Pincode"
                    required
                  />
                </div>
                <div>
                  <label>Phone No.</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter Phone No."
                    required
                  />
                </div>
                <button type="submit">Confirm Order</button>
              </form>
              {loading && <Loader />} {/* Display loader when loading is true */}
    
            </>
          ) : (
            <div className="orderPlaced">
              <h1>Order Placed Successfully!</h1>
              <p>
                Your order has been placed successfully. You will receive an
                email with the order details.
              </p>
            </div>
          )}
        </main>
      </section>

      <section className="cartDetails">
        <main>
          {/* Render cart items */}
          {cartItems.map((item, index) => (
            <div className="cartItem" key={index}>
              <div>
                <h5>
                  {item.title} {item.quantity > 1 && `(${item.quantity})`}
                </h5>
                <p>
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
          {/* Render total and checkout button */}
          <article>
            <div>
              <h5>Total Items</h5>
              <p>{totalItems}</p>
            </div>
            <div>
              <h5>Sub Total </h5>
              <p>₹{total}</p>
            </div>
            <div>
              <h5>Tax</h5>
              <p>₹{tax}</p>
            </div>
            <div>
              <h5>Shipping Charges</h5>
              <p>₹{shippingCharges}</p>
            </div>{" "}
            <div>
              <h5>Total</h5>
              <p>₹{grandTotal}</p>
            </div>
          </article>
        </main>
      </section>
    </div>
  );
};

export default Shipping;
