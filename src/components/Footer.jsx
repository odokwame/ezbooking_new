import { Link } from "@tanstack/react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  
  return (
    <footer className="bg-blue-700 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} EZBooking. All rights reserved.</p>
      </footer>
  );
};

export default Footer;
