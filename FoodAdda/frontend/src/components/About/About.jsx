import React from "react";
import { Link } from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
import '../../styles/about.scss'
import Footer from "../home/Footer";
import Founder from '../founders/Founder'

const About = () => {
  return (
    <div>

    <section className="about">
      <main>
        <h1>About Us</h1>

        <article>
          <h4>FoodAdda.com</h4>
          <p >
            Hungry? FoodAdda.com is the perfect place to:<br/> break your hunger<br/>Fastest delivery<br/>Thebest service.</p>

          <p>
            To explore the various type of food and beverages, Click below to see the
            menu
          </p>

          <Link to="/">
            <RiFindReplaceLine />
          </Link>
        </article>

      </main>
    </section>
        <Founder/>
      <Footer/>
    </div>
  );
};

export default About;
