import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <FooterContainer>
      <FooterIcons>
        <FaYoutube aria-label="YouTube" />
        <FaFacebookF aria-label="Facebook" />
        <FaWhatsapp aria-label="WhatsApp" />
        <FaXTwitter aria-label="Twitter" />
      </FooterIcons>
      <FooterLinks>
        <FooterLinkItem>Media Centre</FooterLinkItem>
        <FooterLinkItem>Investor Relations</FooterLinkItem>
        <FooterLinkItem>Jobs</FooterLinkItem>
        <FooterLinkItem>Terms of Use</FooterLinkItem>
        <FooterLinkItem>Cookie Preferences</FooterLinkItem>
        <FooterLinkItem>Legal Notice</FooterLinkItem>
        <FooterLinkItem>About Us</FooterLinkItem>
        <FooterLinkItem>Contact Us</FooterLinkItem>
        <FooterLinkItem>FAQ</FooterLinkItem>
        <FooterLinkItem>Privacy Policy</FooterLinkItem>
        <FooterLinkItem>Terms & Conditions</FooterLinkItem>
        <FooterLinkItem>Help Centre</FooterLinkItem>
      </FooterLinks>
      <CopyrightText>1997-2024 Netflix Inc.</CopyrightText>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  padding: 30px 4%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: inherit;
  color: white;
`;

const FooterIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const FooterLinks = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 15px;
  margin-bottom: 30px;
  list-style: none;
  color: white;
  cursor: pointer;
`;

const FooterLinkItem = styled.li`
  &:hover {
    color: #ddd;
    transition: ease-in-out;
  }
`;

const CopyrightText = styled.p`
  color: grey;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  cursor: none;
`;


export default Footer;
