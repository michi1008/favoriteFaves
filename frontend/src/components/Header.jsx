import React from "react";
import styled from "styled-components";
import img1 from "../assets/positive.jpg";
import img2 from "../assets/memory.jpg";
import img3 from "../assets/how_to.png";

const Header = () => {
  return (
    <Wrapper>
      <div className="hero">
        <div className="heroBubble heroBubble--1" />
        <div className="heroBubble heroBubble--2" />
        <div className="heroText">
          <h1>Discover &amp; Share<br />Your Top Picks</h1>
          <p className="heroSubtitle">
            Capture the books, movies, restaurants, and places you love —
            and share them with the people who matter most.
          </p>
        </div>
      </div>

      <div className="features">
        <div className="featureCard">
          <img src={img3} alt="get started" />
          <h3>Get Started in Minutes</h3>
          <p>
            Sign up with your email, then hit Create in the nav to start
            adding your top picks right away.
          </p>
        </div>
        <div className="featureCard">
          <img src={img1} alt="share" />
          <h3>Share Without the Fuss</h3>
          <p>
            No ads, no data collection — just a clean space to share your
            favorites with family and friends.
          </p>
        </div>
        <div className="featureCard">
          <img src={img2} alt="memory" />
          <h3>Capture What You Love</h3>
          <p>
            Memories fade, but your favorites don't have to. Preserve the
            joy forever in one place.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hero {
    background: linear-gradient(
      135deg,
      var(--clr-secondary-1) 0%,
      var(--clr-secondary-2) 45%,
      var(--clr-secondary-3) 100%
    );
    padding: 7rem 2rem 6rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
    margin-bottom: 1rem;
  }

  .heroBubble {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    pointer-events: none;
  }

  .heroBubble--1 {
    width: 560px;
    height: 560px;
    top: -200px;
    right: -100px;
  }

  .heroBubble--2 {
    width: 360px;
    height: 360px;
    bottom: -120px;
    left: -60px;
  }

  .heroText {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 0 auto;
  }

  .heroText h1 {
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-size: 3.6rem;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.9s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeUp {
    from {
      transform: translateY(28px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .heroSubtitle {
    color: rgba(255, 255, 255, 0.82);
    font-size: 1.15rem;
    line-height: 1.75;
    max-width: 560px;
    margin: 0 auto;
    animation: fadeUp 0.9s 0.2s ease-out forwards;
    opacity: 0;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    padding: 3rem 2rem 4rem;
    max-width: 1170px;
    margin: 0 auto;
  }

  .featureCard {
    flex: 1;
    min-width: 260px;
    max-width: 340px;
    background: #fff;
    border-radius: 1.2rem;
    padding: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .featureCard:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.13);
  }

  .featureCard img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }

  .featureCard h3 {
    color: var(--clr-primary-4);
    font-family: "Poppins", sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    margin: 1.25rem 1.5rem 0.5rem;
  }

  .featureCard p {
    color: #6b7280;
    font-size: 0.92rem;
    line-height: 1.65;
    margin: 0 1.5rem 1.5rem;
  }

  @media screen and (max-width: 800px) {
    .hero {
      padding: 5rem 1.5rem 4rem;
      clip-path: polygon(0 0, 100% 0, 100% 94%, 0 100%);
    }

    .heroText h1 {
      font-size: 2.2rem;
    }

    .heroSubtitle {
      font-size: 1rem;
    }

    .features {
      flex-direction: column;
      align-items: center;
      padding: 2.5rem 1.5rem 3rem;
    }

    .featureCard {
      max-width: 100%;
    }
  }
`;

export default Header;
