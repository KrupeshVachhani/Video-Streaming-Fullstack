import React from "react";
import { motion } from "framer-motion";
import '../../styles/founder.scss';
import me from "../../assets/MyImge.png";
import me2 from "../../assets/Me2.png";
const Founder = () => {
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
      <div>
      <div className="founderHad">
        <h1 >Founder</h1>
      </div>
    <div className="mainFounder">


    <section className="founder">
      <motion.div {...options}>
        <img src={me} alt="Founder" height={200} width={200} />
        <h3>Krupesh Vachhani</h3>

        <p>
          Hey, Everyone I am Krupesh Vachhani, the Developer And Designer.
          <br />
          Our aim is to give best service to every customer.        </p>
      </motion.div>
    </section>
    <section className="founder">
      <motion.div {...options}>
        <img src={me2} alt="Founder" height={200} width={200} />
        <h3>Riddhi Sonavane</h3>

        <p>
          Hey, Everyone I am Riddhi Sonavane, the Developer And Designer.
          <br />
          Our aim is to give best service to every customer.
        </p>
      </motion.div> 
     </section>
    </div>
      </div>
  );
};

export default Founder;
