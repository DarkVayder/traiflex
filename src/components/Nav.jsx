import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/Netflix logo.png';
import { FaSearch } from 'react-icons/fa';
import avatar from '../assets/Avatar.png';
import { IoMdArrowDropdown } from 'react-icons/io';
import { auth } from '../Utilities/Firebase';
import { signOut } from 'firebase/auth';

export default function Nav({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/Series" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/UserLiked" },
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center">
            <img src={logo} alt="Netflix logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Titles, People, Genres"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <div className="avatar flex a-center">
            <img src={avatar} alt="avatar" onClick={handleAvatarClick} />
            <IoMdArrowDropdown className="dropdown-icon" onClick={handleDropdownClick} />
            {dropdownVisible && (
              <div className="dropdown">
                <p onClick={handleLogout}>Sign Out of My Profile</p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: rgba(0, 0, 0, 0.9);
  }

  nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    align-items: center;
    z-index: 10;
    transition: background-color 0.5s ease;

    .left {
      display: flex;
      align-items: center;

      .brand img {
        height: 2.5rem;
        margin-right: 1.5rem;
      }

      .links {
        display: flex;
        list-style-type: none;
        gap: 2rem;

        li {
          a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;

            &:hover {
              color: #e50914;
            }
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 1rem;

      .search {
        background-color: inherit;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.3rem;
        border-radius: 5px;
        transition: width 0.3s ease;

        button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        input {
          background: none;
          border: none;
          color: white;
          outline: none;
          width: 0;
          transition: width 0.3s ease;
        }

        &.show-search input {
          width: 10rem;
        }
      }

      .avatar {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;

        img {
          height: 2rem;
          border-radius: 4px;
        }

        .dropdown-icon {
          color: white;
          margin-left: 0.5rem;
        }

        .dropdown {
          position: absolute;
          top: 2.5rem;
          right: 0;
          background-color: rgba(0, 0, 0, 0.75);
          padding: 1rem;
          border-radius: 5px;
          color: white;

          p {
            cursor: pointer;

            &:hover {
              color: #e50914;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    nav {
      padding: 0 1rem;

      .left {
        .brand img {
          height: 2rem;
        }

        .links {
          gap: 1rem;

          li {
            a {
              font-size: 0.9rem;
            }
          }
        }
      }

      .right {
        gap: 0.5rem;

        .search {
          input {
            width: 0;

            &.show-search {
              width: 7rem;
            }
          }
        }

        .avatar img {
          height: 1.5rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    nav {
      padding: 0 0.5rem;

      .left {
        .brand img {
          height: 1.5rem;
        }

        .links {
          display: none;
        }
      }

      .right {
        .search {
          button {
            font-size: 0.8rem;
          }

          input {
            &.show-search {
              width: 5rem;
            }
          }
        }

        .avatar img {
          height: 1.2rem;
        }
      }
    }
  }
`;
