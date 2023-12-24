import React, { useState } from "react";
import { motion } from "framer-motion";
import contactImg from "../../assets/contactUsBg_prev_ui.png";
import '../../styles/contact.scss'
import Footer from "../home/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/msg/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success (e.g., show a success message to the user)
        console.log("Message sent successfully!");
        window.location.href = "/msg";
      } else {
        // Handle errors (e.g., show an error message to the user)
        console.error("Error sending message");
      }
    } catch (error) {
      // Handle network errors (e.g., show a network error message to the user)
      console.error("Network error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <section className="contact">
        <div className="bgCon"></div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{ delay: 0.2 }}
        >
          <h2>Contact Us</h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            placeholder="Message..."
            cols="30"
            rows="10"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send</button>
        </motion.form>

        <motion.div
          className="formBorder"
          initial={{
            x: "100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            initial={{
              y: "-100vh",
              x: "50%",
              opacity: 0,
            }}
            animate={{
              x: "50%",
              y: "-50%",
              opacity: 1,
            }}
            transition={{
              delay: 0.4,
            }}
          >
            <img src={contactImg} alt="contactImg" />
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
