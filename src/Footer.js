import React from 'react'
import './Footer.css'
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <div className='footer'>
      <div className='footer-icons'>
        <FaYoutube />
        <FaFacebookF />
        <FaWhatsapp />
        <FaXTwitter />
      </div>
      <ul>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Cookie Preferences</li>
        <li>Legal Notice</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>FAQ</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
        <li>Help Centre</li>
      </ul>
      <p className='copyright-text'>1997-2024 Netflix Inc.</p>
    </div>
  )
}

export default Footer
