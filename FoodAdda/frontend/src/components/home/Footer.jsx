import React from "react";
import { AiFillInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import '../../styles/footer.scss'

const Footer = () => {
  return (
    <footer>
      <div>
        <h2>Food Adda</h2>

        <p>We try to provide the best service possible.</p>
        <br />

        <em>We give attention to genuine feedback.</em>

        <strong>All rights reserved @foodadda</strong>
      </div>

      <aside>
        <h4>Follow Us</h4>

        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <AiFillYoutube />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <AiFillGithub />
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
