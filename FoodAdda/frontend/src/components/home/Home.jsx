import React from "react";
import { motion } from "framer-motion";
import Menu from "../menu/Menu";
import '../../styles/home.scss'
import Founder from "../founders/Founder";
import Footer from "./Footer";

const Home = () => {
  const options = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <section className="home">
        <div>
          <motion.h1 {...options}>Food Adda</motion.h1>
          <motion.p
            {...options}
            transition={{
              delay: 0.2,
            }}
          >
            Let's Break Hunger !!!
          </motion.p>
        </div>

        <motion.a
          href="#menu"
          style={{ textDecoration: 'none' }}
          initial={{
            y: "-100%",
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
        >
          Explore Menu
        </motion.a>
      </section>

    

      <Menu />

      <Footer/>
    </>
  );
};

export default Home;
