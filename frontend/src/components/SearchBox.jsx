import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
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
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .searchInput::placeholder {
    color: var(--clr-white);
    opacity: 1;
  }

  .searchInput:focus {
    outline: 3px solid var(--clr-brown);
    background-color: var(--clr-white);
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
  }

  @media (max-width: 800px) {
    .searchInput {
      width: 8rem;
      margin: 1rem 0;
    }
  }
`;

export default SearchBox;
