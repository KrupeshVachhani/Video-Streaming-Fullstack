import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import CustomScrollbar from "./components/layoutes/CustomScrollbar";
import { CartProvider } from "./components/Context/CartContext.jsx";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomScrollbar>
      <CartProvider>
        <App />
      </CartProvider>
    </CustomScrollbar>
  </React.StrictMode>
);

