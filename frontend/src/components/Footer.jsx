import React from "react";
import styled from "styled-components";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Wrapper>
      <footer className="footer">
        <div className="footer-social">
          <h4>follow me</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/michiko.kento">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://www.instagram.com/michyrabbit/?next=%2F&hl=en">
              <FaInstagramSquare className="social-icon" />
            </a>
            <a href="mailto:michytaguchi@gmail.com">
              <MdEmail className="social-icon" />
            </a>
          </div>
        </div>
        <div className="copyright">
          <p className="copyright">Michiko Taguchi &copy; {currentYear}</p>
        </div>
      </footer>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    bottom: 0px;
    height: 12rem;
    width: 100%;
    padding: 2rem;
    background-color: var(--clr-primary-4);
    clip-path: polygon(0% 24%, 100% 0, 100% 100%, 0% 100%);
  }

  .footer-social h4 {
    font-size: 1rem;
    color: #fff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
  }
  .footer-social h4::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: var(--clr-red);
    height: 2px;
    box-sizing: border-box;
    width: 65%;
  }

  .footer-social {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
  }

  .social-links {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .social-icon {
    font-size: 2rem;
    color: #fff;
    transition: color 0.3s ease; /* Smooth transition effect */
  }

  .social-icon:hover {
    color: var(--clr-grey); /* Change to the desired hover color */
  }

  .copyright {
    color: #fff;
    font-style: italic;
  }
`;
export default Footer;
