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
          placeholder="SEARCH"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="button" onClick={clearSearch} className="clearButton">
          Clear
        </button>
      </form>
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
    height: 3rem;
    box-sizing: border-box;
    border: 2px solid var(--clr-brown);
    border-radius: 5px;
    font-size: 1.2rem;
    color: var(--clr-white);
    background-color: var(--clr-brown);
    transition: width 0.4s ease-in-out;
    margin-left: 1rem;
    padding: 0.8rem;
    text-align: center;
    font-weight: 700;
  }
      .clearButton {
    background-color: var(--clr-red);
    color:var(--clr-white);
    width: 9rem;
    height: 3rem;
    box-sizing: border-box;
    border: 2px solid var(--clr-red);
    border-radius: 5px;
    font-size: 1.2rem;
    align-text: center;
    margin-left: 1rem;
  }

  .clearButton:hover {
    background-color: var(--clr-primary-3);
    border:2px solid var(--clr-primary-3);
    color: var(--clr-white);
  }

`;

export default HomeSearch;
