import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, } from 'react-icons/fa6';
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
      <FaFacebookF aria-label="Facebook" />
      <FaInstagram aria-label="Instagram" />
      <FaYoutube aria-label="YouTube" />  
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
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px 3%;
  }

  @media (max-width: 480px) {
    padding: 15px 2%;
  }
`;

const FooterIcons = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 20px;
  margin-bottom: 20px;
  cursor: pointer;

  svg {
    font-size: 1.5rem;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const FooterLinks = styled.ul`
  display: grid;
  text-align: left;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 30px;
  list-style: none;
  color: grey;
  cursor: pointer;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 5px;
  }
`;

const FooterLinkItem = styled.li`
  &:hover {
    color: #ddd;
    transition: ease-in-out;

    @media (max-width: 480px) {
      text-align: left;
    }
  }
`;

const CopyrightText = styled.p`
  color: grey;
  font-size: 14px;
  margin-top: 20px;
  text-align: left;
  cursor: none;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export default Footer;
