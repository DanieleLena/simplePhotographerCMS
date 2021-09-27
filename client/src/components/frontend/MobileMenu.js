import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";


const MobileMenu = () => {

  const tl = useRef();
  const mobileMenu = useRef();
  const mobileLink1 = useRef();
  const mobileLink2 = useRef();
  const mobileLink3 = useRef();
  const mobileLink4 = useRef();
  const mobileLink5 = useRef();


  function animateOpenNav(mobileLinks) {
    tl.current = gsap
      .timeline()
      .to(mobileMenu.current, {
        duration: 0.3,
        ease: "power3.out",
        display: "flex",
        opacity: 0.9,
      })
      .to(mobileLinks, {
        opacity: 1,
        duration: 1,
        stagger: {
          each: 0.1,
          ease: "power1.in",
        },
      });
    // .reverse();
  }

  useEffect(() => {
       const mobileLinks = [
         mobileLink1.current,
         mobileLink2.current,
         mobileLink3.current,
         mobileLink4.current,
         mobileLink5.current,
       ];
    animateOpenNav(mobileLinks);
  }, []);


  return (
    <div className="mobile-menu" ref={mobileMenu}>
      <ul className="mobile-list">
        <li>
          <Link className="mobile-link" ref={mobileLink1} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="mobile-link" ref={mobileLink2} to="/projects">
            Projects
          </Link>
        </li>
        <li>
          <Link className="mobile-link" ref={mobileLink3} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
      <div className="mobile-icon-container">
        <div className="mobile-link icon" ref={mobileLink4}>
          <Link to="/">
            <AiOutlineInstagram />
          </Link>
        </div>
        <div className="mobile-link icon" ref={mobileLink5}>
          <a href="mailto:#">
            <FiMail />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
