import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const options = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    transition: {
      ease: "linear",
      repeat: "1000",
      repeatType: "reverse",
    },
  };
  return (
    <div className="loader">
        <motion.p {...options}>Loading...</motion.p>
    </div>
  );
};

export default Loader;
