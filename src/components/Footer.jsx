import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaEnvelope, FaPinterest, FaLinkedinIn } from "react-icons/fa";
import "../Styles/Footer.css"; // Ensure you have this file for custom styling

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark py-4">
      <Container>
        <Row className="text-center text-md-start">
          {/* Logo Section */}
          <Col md={4} className="mb-3 mb-md-0">
            <h3 className="fw-bold">Recipe<span className="text-warning">Hub</span></h3>
          </Col>

          {/* About Section */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">ABOUT NCG</h5>
            <ul className="list-unstyled">
              <li><a href="/shop" className="text-dark">Shop</a></li>
              <li><a href="/about" className="text-dark">About</a></li>
              <li><a href="/work" className="text-dark">Work with me</a></li>
              <li><a href="/contact" className="text-dark">Contact</a></li>
            </ul>
          </Col>

          {/* Explore Section */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">EXPLORE</h5>
            <ul className="list-unstyled">
              <li><a href="/recipes" className="text-dark">Recipes</a></li>
              <li><a href="/fitness" className="text-dark">Fitness</a></li>
              <li><a href="/healthy-living" className="text-dark">Healthy Living</a></li>
              <li><a href="/blogs" className="text-dark">Blogs</a></li>
            </ul>
          </Col>
        </Row>

        {/* Social Media Section */}
        <Row className="mt-3">
          <Col className="text-center">
            <h5 className="fw-bold">Connect</h5>
            <a href="#" className="text-dark mx-2"><FaFacebookF /></a>
            <a href="#" className="text-dark mx-2"><FaTwitter /></a>
            <a href="#" className="text-dark mx-2"><FaEnvelope /></a>
            <a href="#" className="text-dark mx-2"><FaPinterest /></a>
            <a href="#" className="text-dark mx-2"><FaLinkedinIn /></a>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} Recipe Hub | All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
