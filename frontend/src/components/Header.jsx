import React from "react";
import styled from "styled-components";


const Header = () => {
  return (
    <Wrapper>
      <div>
        <h1 className="headerTitle">
          Discover and Share Your Top Picks
        </h1>
        <h4 className="headerContent">No need to worry about data collection or advertisements—just enjoy sharing your top picks with family and friends. 
  Register your account to start posting. Once you're signed up, you'll see "Create" in the header. 
  As time passes, the excitement and memories of our favorite books, movies, TV shows, restaurants, and places can fade. With this app, you can rediscover that excitement anytime.
</h4>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  align-items: center;
  background-image: url(https://images.unsplash.com/photo-1572414451217-ed2e028748e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg0fHxhYnN0cmFjdHxlbnwwfHwwfHx8MA%3D%3D);
  background-size: cover;
  background-position: center;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--clr-white);
  margin: 3rem 0; 

  .headerContent{
    padding: 2rem 5rem;
  }

  @media screen and (max-width: 800px) {
    height: 65vh;
    .headerTitle {
      font-size: 1.5rem;
    }
    .headerContent {
      font-size: 1.2rem;
      
    }
  }
`;
export default Header;
