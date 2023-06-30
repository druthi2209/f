import React from "react";

import "./Footer.css";
import { SiGmail } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <SiGmail /> <FaFacebook /> <FaInstagram /> <FaTwitter />
      </div>
      <p> &copy; 2023 emedicinestore.com </p>
    </div>
  );
}

export default Footer;
