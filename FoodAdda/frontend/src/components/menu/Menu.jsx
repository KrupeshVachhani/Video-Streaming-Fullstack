// import React from "react";
// import Menucard from "./Menucard.jsx";
// import menuItems from "../../assets/FoodItems.json";

// const Menu = () => {
//   const addToCartHandler = (itemNum) => {
//     // Add your logic for addToCartHandler
//     console.log(`Item ${itemNum} added to cart.`);
//   };

//   return (
//     <section id="menu">
//       <h1>MENU</h1>
//       <div>
//         {menuItems.map((item) => (
//           <Menucard
//             key={item.itemNum}
//             itemNum={item.itemNum}
//             image={item.burgerSrc}
//             price={item.price}
//             title={item.title}
//             handler={addToCartHandler}
//             delay={0.1}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Menu;

import React from "react";
import Menucard from "./Menucard.jsx";
import menuItems from "../../assets/FoodItems.json";
import { useCart } from "../Context/CartContext.jsx";

const Menu = () => {
  const { addToCartHandler } = useCart();

  const handleBuyNow = (item) => {
    addToCartHandler(item);
  };

  return (
    <section id="menu">
      <h1>MENU</h1>
      <div>
        {menuItems.map((item) => (
          <Menucard
            key={item.itemNum}
            item={item}
            handler={handleBuyNow} // Use handleBuyNow function here
            delay={0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Menu;
