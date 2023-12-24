import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { GiArmoredBoomerang } from "react-icons/gi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchAdminData = async () => {
    try {
      const formattedName = userName.trim();
      const response = await fetch(
        `http://localhost:3000/api/orders/admin/${formattedName}`
      );
  console.log(response);
      if (response.ok) {
        const data = await response.json();
  
        // Transform the response data into the format expected by the component
        const transformedData = data.map((order) => {
          const { _id, userName, orderItems, totalPrice } = order;
          const totalQuantity = Object.values(orderItems).reduce(
            (total, item) => total + item.quantity,
            0
          );
          return {
            _id,
            userName,
            totalQuantity,
            totalPrice,
          };
        });
  
        setIsAdmin(true);
        setOrders(transformedData);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  return (
    <section className="tableClass">
      <main>
        <label htmlFor="username">Enter Admin Username:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={fetchAdminData}>Find Admin</button>
        {isAdmin ? (
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User</th>
                <th>Item Qty</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userName}</td>
                  <td>{order.totalQuantity}</td>
                  <td>₹{order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You are not an admin.</p>
        )}
      </main>
    </section>
  );
};

export default Orders;
/** *
 
{isAdmin ? (
  <table>
            <thead>
            <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Item Qty</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>User</th>
                <th>Action</th>
              </tr>
              </thead>
              
              <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                <td>{order._id}</td>
                <td>Processing</td>
                <td>
                {/* Calculate total quantity from orderItems object *//** }
                {Object.values(order.orderItems).reduce(
                  (total, item) => total + item.quantity,
                  0
                  )}
                  </td>
                  <td>₹{order.totalPrice}</td>
                  <td>COD</td>
                  <td>{order.userName}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <AiOutlineEye />
                    </Link>

                    <button>
                      <GiArmoredBoomerang />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
          <p>You are not an admin.</p>
        )}
          **/