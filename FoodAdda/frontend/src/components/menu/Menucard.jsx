// import React from "react";
// import { motion } from "framer-motion";
// import HoverRating from "../layoutes/Rating";
import "../../styles/menu.scss";

// const MenuCard = ({ itemNum, image, price, title, handler, delay = 0 }) => {

  
//   return (
//     <motion.div
//       className="menuCard"
//       initial={{
//         x: "-100%",
//         opacity: 0,
//       }}
//       whileInView={{
//         x: 0,
//         opacity: 1,
//       }}
//       transition={{
//         delay,
//       }}
//     >
//       <div>Item {itemNum}</div>
//       <main>
//         <img src={image} alt={itemNum} />

//         <h5>₹{price}</h5>

//         <p>{title}</p>

//         <HoverRating/>

//         <button onClick={() => handler(itemNum)}>Buy Now</button>
//       </main>
//     </motion.div>
//   );
// };

// export default MenuCard;


import React from "react";
import { motion } from "framer-motion";
import HoverRating from "../layoutes/Rating";

const MenuCard = ({ item, handler, delay = 0 }) => {
  return (
    <motion.div
      className="menuCard"
      initial={{
        x: "-100%",
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        delay,
      }}
    >
      <div>Item {item.itemNum}</div>
      <main>
        <img src={item.burgerSrc} alt={item.itemNum} />

        <h5>₹{item.price}</h5>

        <p>{item.title}</p>

        <HoverRating />

        <button onClick={() => handler(item)}>Buy Now</button>
      </main>
    </motion.div>
  );
};

export default MenuCard;
