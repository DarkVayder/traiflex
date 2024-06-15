import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const footerLinks = [
    { name: "Media Centre", path: "/help-center" },
    { name: "Investor Relations", path: "/help-center" },
    { name: "Jobs", path: "/help-center" },
    { name: "Terms of Use", path: "/help-center" },
    { name: "Cookie Preferences", path: "/help-center" },
    { name: "Legal Notice", path: "/help-center" },
    { name: "About Us", path: "/help-center" },
    { name: "Contact Us", path: "/help-center" },
    { name: "FAQ", path: "/help-center" },
    { name: "Privacy Policy", path: "/help-center" },
    { name: "Terms & Conditions", path: "/help-center" },
    { name: "Help Centre", path: "/help-center" },
  ];

  return (
    <FooterContainer>
      <FooterIcons>
        <FaYoutube aria-label="YouTube" />
        <FaFacebookF aria-label="Facebook" />
        <FaWhatsapp aria-label="WhatsApp" />
        <FaXTwitter aria-label="Twitter" />
      </FooterIcons>
      <FooterLinks>
        {footerLinks.map((link) => (
          <FooterLinkItem key={link.name}>
            <Link to={link.path} style={{ color: 'inherit', textDecoration: 'none' }}>
              {link.name}
            </Link>
          </FooterLinkItem>
        ))}
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
