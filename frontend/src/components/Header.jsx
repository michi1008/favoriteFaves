import React from "react";
import styled from "styled-components";
import img1 from "../assets/positive.jpg";
import img2 from "../assets/memory.jpg";
import img3 from "../assets/how_to.png";

const Header = () => {
  return (
    <Wrapper>
      <div className="headerTitle">
        <h1>Discover and Share Your Top Picks</h1>
      </div>

      <div className="headerContent">
        <div className="content">
            <img src={img3} alt="how to abstract" />
            <h2>Get Started: Sign Up and Start Sharing Your Top Picks in Minutes</h2>
            <h4>
              Sign up by creating an account with your username and email address.
              After registering, you'll find a 'Create' option in the header,
              ready for you to start adding your top picks.
            </h4>
          </div>
        <div className="content">
          <img src={img1} alt="positive energy abstract" />
          <h2>Share Your Favorites Without the Fuss</h2>
          <h4>
            No need to worry about data collection or advertisements—just enjoy
            sharing your top picks with family and friends.
          </h4>
        </div>
        <div className="content">
          <img src={img2} alt="memory abstract" />
          <h2>Capture the Joy of What You Love</h2>
          <h4>
            As time goes on, our memories naturally begin to fade. Even the
            books, movies, TV shows, restaurants, and places you once loved may
            lose their spark as your recollection of them dims. With this app,
            you can capture and preserve your favorite things, keeping the joy
            and excitement alive forever.
          </h4>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--clr-white);
  margin: 3rem 0;
  gap: 2rem;

  .headerTitle h1 {
    animation: slideInLeft 1.5s ease-in-out forwards; 
    opacity: 0; 
    background: linear-gradient(90deg, var(--clr-secondary-1), var(--clr-secondary-2),var(--clr-secondary-3),var(--clr-secondary-4));
    -webkit-background-clip: text;
    color: transparent;
    font-family: "Open Sans", sans-serif !important;
    font-weight: 700;
    font-style: italic;
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%); 
      opacity: 0;
    }
    100% {
      transform: translateX(0); 
      opacity: 1;
    }
  }

  .headerContent {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start; 
    justify-content: center;
    color: var(--clr-brown);
    margin: 2rem 0;
    gap: 2rem;
    max-width: 100%;
    padding: 2rem;
    border-radius: 1rem;
  }

  .headerContent img {
    width: 100%;
    max-width: 350px;
    height: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .headerContent img:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: flex-start;
    max-width: 350px;
    text-align: left; 
  }

  .content h4 {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.6;
    color: var(--clr-primary-3);
    margin-top: 1rem;
  }

  .content h2 {
    font-size: 2rem;
    font-weight: 700;
    padding-top: 2rem;
  }

  @media screen and (max-width: 800px) {
    .headerTitle {
      padding: 2rem 3rem;
      font-size: 1.5rem;
    }

    .headerContent {
      flex-direction: column;
      gap: 1.5rem;
    }

    .headerContent img {
      max-width: 100%;
    }
  }

`;

export default Header;
