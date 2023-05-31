import React from 'react';
import './Landing.css';
import { FaSearch } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useRef } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import image1 from '../../assets/images/image1.png';
import mobile from '../../assets/images/mobile.jpg';
import digital from '../../assets/images/digital.jpg';
import content from '../../assets/images/content.jpg';
import video from '../../assets/images/video.jpg';
import web from '../../assets/images/web.jpg';
import design from '../../assets/images/design.jpg';
import image2 from '../../assets/images/image2.png';

import ismail from '../../assets/images/ismail.jpeg';
import anas from '../../assets/images/anas.jpeg';
import sohaib from '../../assets/images/sohaib.jpg';
import bakr from '../../assets/images/bakr.jpg';
import samir from '../../assets/images/samir.jpg';

function Landing() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(
      "responsive_nav"
    );
  };
  return (


    <body className="landing-page__wrapper">

      <div className="hero">
        <header>
          <h3 className="main-navigation__logo">FreelanceConnect</h3>
          <nav ref={navRef}>
            <a href="#freelancers">For Freelancers</a>
            <a href="#quote">Why FreelanceConnect</a>
            <a href="#reviews">Client Reviews</a>
            <a href="#categories">Categories</a>
            <a href="#clients">for Clients</a>
            <a href="#contact">Contact Us</a>
            <button
              className="nav-btn nav-close-btn"
              onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button
            className="nav-btn"
            onClick={showNavbar}>
            <FaBars />
          </button>
          <div className="login-singup-wrapper">
            <a href="/login" className="login-btn">Login</a>
            <a href="/signup" className="signup-btn">Sign Up</a>
          </div>
        </header>
        <div className="text-hero" id="home">
          <h1>Welcome to FreelanceConnect</h1>
          <p>Find the best freelance services for your business</p>
          <div className="search-bar">
            <input type="text" placeholder="Search for any service..." />
            <FaSearch className="search-icon" />

          </div>
          <br></br><br></br>

        </div>
        <div classe="svg-hero" style={{ height: '150px', overflow: 'hidden' }}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
            <path d="M0.00,49.98 C149.99,150.00 351.77,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#fff ' }}></path>
          </svg>
        </div>
      </div>

      <section className="wave-contenedor website" id="freelancers">
        <LazyLoadImage src={image1} alt="" />
        <div className="contenedor-textos-main">
          <h2 class="title left">For Freelancers</h2>
          <p class="parrafo"><FaStar class="etoile"></FaStar><b style={{ color: '#2DB67C', fontSize: '20px' }}>     Showcase benefits:</b><br></br><q>Boost your freelancing career with our website's unique advantages.</q><br></br><br></br>
            <FaStar class="etoile"></FaStar><b style={{ color: '#2DB67C', fontSize: '20px' }}>     Emphasize reliability:</b><br></br><q>Experience a hassle-free and trusted platform for freelancers like you.</q><br></br><br></br>
            <FaStar class="etoile"></FaStar><b style={{ color: '#2DB67C', fontSize: '20px' }}>     Highlight success stories:</b><br></br><q>Discover success through our website's proven track record and thriving freelancer community.</q>  </p>
          <a href='/signup' id="quote" class="cta">Get Started</a>
        </div>
      </section>
      <section class="info" >
        <div class="contenedor">
          <h2 class="title left" >Ismail OUKHA & Anas LAMAIIZ, <b style={{ color: 'black' }}>Developers</b></h2><br></br><br></br>
          <p>“FreelanceConnect is an innovative and dynamic online platform designed to revolutionize the world of freelancing.<br></br> It serves as a centralized hub, connecting talented freelancers with businesses and individuals seeking their expertise.”</p>
        </div>
      </section>
      <section className="cards contenedor" id="reviews">
        <h2 className="title">Client Reviews</h2><br></br><br></br>
        <div className="content-cards">
          <article className="card">
            <div className="person-icon">
              <LazyLoadImage
                src={bakr} alt="Bakr Asskali" className="person-image" />
            </div><br></br>
            <h3>Bakr Asskali</h3>
            <p><q>I recently had the pleasure of using FreelanceConnect. This website is a great tool for freelancers to find jobs and post their own services.</q></p>
          </article>
          <article className="card">
            <div className="person-icon">
              <LazyLoadImage
                src={samir} alt="Samir Ziani" className="person-image" />
            </div><br></br>
            <h3>Samir Ziani</h3>
            <p><q>The website is also secure and provides a secure payment system. Payment is done through the website and is secure and reliable.</q></p>
          </article>
          <article className="card">
            <div className="person-icon">
              <LazyLoadImage
                src={sohaib} alt="Sohaib Manah" className="person-image" />
            </div><br></br>
            <h3>Sohaib Manah</h3>
            <p><q>Overall, I highly recommend FreelanceConnect for freelancers looking for jobs or services. The website is reliable, secure, and user-friendly.</q></p>
          </article>
        </div>
      </section>

      <section class="galery" >
        <div class="contenedor">
          <h2 class="title">Categories</h2><br></br><br></br>
          <article class="galery-cont" id="categories">
            <LazyLoadImage
              src={mobile} alt="" />
            <LazyLoadImage
              src={digital} alt="" />
            <LazyLoadImage
              src={content} alt="" />
            <LazyLoadImage
              src={video} alt="" />
            <LazyLoadImage
              src={web} alt="" />
            <LazyLoadImage
              src={design} alt="" />
          </article>
        </div>

      </section>

      <section class="info-last" id="clients">
        <div class="contenedor last-section">
          <div class="contenedor-textos-main">
            <h2 class="title left">For Clients</h2>
            <p class="parrafo"><FaStar class="etoile"></FaStar><b style={{ color: '#2DB67C', fontSize: '20px' }}>     Showcase benefits:</b><br></br><q>Unlock your business potential with our website's exclusive features and growth opportunities.</q><br></br><br></br>
              <FaStar class="etoile"></FaStar><b style={{ color: '#2DB67C', fontSize: '20px' }}>     Emphasize reliability:</b><br></br><q>Trust in our platform's secure and seamless experience for businesses like yours.</q><br></br><br></br>
              <FaStar class="etoile"></FaStar><b style={{ color: '#2DB67C', fontSize: '20px' }}>     Highlight success stories:</b><br></br><q>Join a thriving community of satisfied clients who have achieved remarkable success through our website.</q> </p>
            <a href="/signup" class="cta">Get started</a>

          </div>
          <LazyLoadImage
            src={image2} alt="" />
        </div>

        <div classe="svg-wave" style={{ height: '150px', overflow: 'hidden' }}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
            <path d="M0.00,49.98 C149.99,150.00 351.77,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#6575FB' }}></path>
          </svg>
        </div>
      </section>
      <footer id="contact">
        <div class="container-footer"></div>
        <h2 class="title">Contact us</h2>
        <div className="content-cards1">
          <article className="card1">
            <div className="person-icon">
              <LazyLoadImage
                src={ismail} alt="Ismail OUKHA" className="person-image" />
            </div><br></br>
            <h3>Ismail OUKHA</h3>
            <p>
              <a class="xx" href="https://github.com/itsmeismaill">
                <FaGithub />
              </a>
              <span style={{ marginRight: '10px' }}></span>
              <a class="xx" href="https://www.linkedin.com/in/ismail-oukha-90a070227">
                <FaLinkedin />
              </a>
            </p>
          </article>
          <article className="card1">
            <div className="person-icon">
              <LazyLoadImage
                src={anas} alt="Anas Lamaiz" className="person-image" />
            </div><br></br>
            <h3>Anas LAMAIZ</h3>
            <p>
              <a class="xx" href="https://github.com/Anass001">
                <FaGithub />
              </a>
              <span style={{ marginRight: '10px' }}></span>
              <a class="xx" href="https://www.linkedin.com/in/anas-lamaiz-b7a82213a">
                <FaLinkedin />
              </a>
            </p>
          </article>
        </div>
      </footer>
    </body>

  );
}

export default Landing;
