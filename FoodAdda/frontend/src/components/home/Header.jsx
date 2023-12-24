import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import '../../styles/header.scss'
import foodAdda from '../../assets/Food Adda.gif'
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
const Header = ({ isAuthenticated = false }) => {
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
    <div className='navbar' style={{zIndex:'10'}}>
      <div className="bg"></div>
      <nav className="navbar navbar-expand-lg main">
        <div className="container-fluid " >
          <motion.img {...options} src={foodAdda} className='logo' alt='FoodAdda' />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse clo-nav"  id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav" >
              <li className="nav-item">
                <Link to='/' className='links'><motion.p {...options}>Home</motion.p></Link>
              </li>
              <li className="nav-item">
                <Link className='links' to="/contact"><motion.p {...options}>Contact</motion.p></Link>

              </li>
              <li className="nav-item">
                <Link className='links' to="/about"><motion.p {...options}>About</motion.p></Link>
              </li>
              <li className="nav-item" style={{}}>
                <Link className='links' to='/cart'><motion.p {...options}><FiShoppingCart /></motion.p></Link>
              </li>
              <li className="nav-item" >
                <Link className='links' to={isAuthenticated ? "/me" : "/login"}>
                  {isAuthenticated ? <motion.p {...options}><FaUser /></motion.p> : <motion.p {...options}><FiLogIn /></motion.p>}
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header