import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineInstagram } from "react-icons/ai";
import { FiMail } from "react-icons/fi";

const Footer = () => {
    return (
      <footer>
        <div className="footer-top">
          <ul>
            <li>
              <Link to="/">Home</Link>
              {/* <a href="/index.html">Home</a> */}
            </li>
            <li>
              <Link to="/projects">Projects</Link>

              {/* <a href="about.html">Chi sono</a> */}
            </li>
            <li>
              <Link to="/contact">Contact</Link>

              {/* <a href="projects.html">Progetti</a> */}
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <a href="index.html">
            <h2>
              Simple
              <br />
              Photographer
            </h2>
          </a>
          <div className="icons-container">
            <div className="icon">
              <a href="https://www.instagram.com" target="_blank">
                <AiOutlineInstagram />
              </a>
            </div>
            <div className="icon">
              <a href="mailto:#">
                <FiMail />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer
