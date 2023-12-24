import React from "react";
import '../../styles/confirmOrders.scss'
import Footer from "../home/Footer";

const ConfirmOrders = () => {
  return (
    <section className="confirmOrder">
      <main>
        <h1>Confirm Order</h1>

        <form>
          <div>
            <label>Cash On Delivery</label>
            <input type="radio" name="payment" />
          </div>
          <div>
            <label>Online</label>
            <input type="radio" name="payment" />
          </div>

          <button type="submit">Place Order</button>
        </form>
      </main>
      <Footer/>
    </section>
  );
};

export default ConfirmOrders;
