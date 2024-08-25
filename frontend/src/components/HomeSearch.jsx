import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeSearch = ({ category, keyword: initialKeyword, onSubmit}) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword);


  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(keyword);
  };

  const clearSearch = () => {
    setKeyword("");
    navigate(`/category/${category}/`);
  };
  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <input
          className="searchInput"
          type="text"
          name="q"
          value={keyword}
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
        />
       
      </form>
      <button type="button" onClick={clearSearch} className="clearBtn">
          Clear
        </button>
    </Wrapper>
  );
};



const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;


  .searchInput::placeholder {
    color: var(--clr-white);
    opacity: 1;
  }

  .searchInput:focus {
    outline: 3px solid var(--clr-brown);
    background-color: var(--clr-primary-2);
    color: var(--clr-brown);
  }

  .searchInput {
    width: 9rem;
    height: 3.2rem;
    box-sizing: border-box;
    border: none;
    border-radius: 3rem;
    font-size: 1.2rem;
    color: var(--clr-white);
    background-color: var(--clr-brown);
    transition: width 0.4s ease-in-out;
    margin-right: 2rem;
    text-align: center;
    font-weight: 500;
    
  }

  .clearBtn {
  background: linear-gradient(135deg, var(--clr-red), var(--clr-red2));
  }


`;

export default HomeSearch;
