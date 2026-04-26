import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiSearch, FiX } from "react-icons/fi";

const HomeSearch = ({ category, keyword: initialKeyword, onSubmit }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword || "");

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
      <form className="searchForm" onSubmit={submitHandler}>
        <FiSearch className="searchIcon" />
        <input
          type="text"
          name="q"
          value={keyword}
          placeholder="Search posts..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        {keyword && (
          <button type="button" className="clearBtn" onClick={clearSearch} aria-label="Clear search">
            <FiX />
          </button>
        )}
        <button type="submit" className="searchBtn">Search</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;

  .searchForm {
    display: flex;
    align-items: center;
    background: var(--clr-white);
    border: 2px solid #e5e7eb;
    border-radius: 2rem;
    padding: 0.35rem 0.35rem 0.35rem 1rem;
    gap: 0.5rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus-within {
      border-color: var(--clr-primary-3);
      box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.15);
    }
  }

  .searchIcon {
    color: #9ca3af;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.95rem;
    color: var(--clr-primary-4);
    padding: 0.4rem 0;
    min-width: 0;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      outline: none;
      box-shadow: none;
      border-color: transparent;
    }
  }

  .clearBtn {
    background: none;
    border: none;
    color: #9ca3af;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    transition: color 0.2s, background 0.2s;

    &:hover {
      color: var(--clr-red);
      background: #fee2e2;
      transform: none;
      box-shadow: none;
    }
  }

  .searchBtn {
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, var(--clr-primary-4), var(--clr-primary-3));
    color: var(--clr-white);
    border: none;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.2s;

    &:hover {
      opacity: 0.88;
      transform: none;
      box-shadow: none;
      background: linear-gradient(135deg, var(--clr-primary-4), var(--clr-primary-3));
    }
  }
`;

export default HomeSearch;
