import React from 'react';
import { useState } from 'react';
import {AiOutlineInstagram} from 'react-icons/ai';
import {FiMail} from 'react-icons/fi';
import {GiHamburgerMenu} from 'react-icons/gi'
import { MobileMenu } from '..';
import { Link } from 'react-router-dom';

const Navbar = () => {

        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
      <>
        <nav className="nav">
          <div className="title">
            <Link to="/">
              <h2>
                Simple <br />
                Photographer
              </h2>
            </Link>
          </div>

          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="nav-icon-container">
            <a href="#" target="_blank">
              <i className="nav-icon fab fa-instagram">
                <AiOutlineInstagram />
              </i>
            </a>
            <a href="mailto:#">
              <i className="nav-icon far fa-envelope">
                <FiMail />
              </i>
            </a>
            <i
              className="burger-icon fas fa-bars active"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <GiHamburgerMenu />
            </i>
          </div>
        </nav>
        {isMobileMenuOpen && <MobileMenu />}
      </>
    );
}

export default Navbar
