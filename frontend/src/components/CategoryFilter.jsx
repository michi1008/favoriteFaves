import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";

const CategoryFilter = ({ onChange }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    navigate(`/posts/userPosts/${userId}/page/1?category=${newCategory}`);
    onChange(newCategory);
  };

  const clearCategory = () => {
    setCategory("");
    navigate(`/posts/userPosts/${userId}/page/1`);
    onChange("");
  };

  return (
    <Wrapper>
      <div className="selectWrapper">
        <FiChevronDown className="chevron" />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="book">📚 Books</option>
          <option value="movie">🎬 Movies</option>
          <option value="tv_show">📺 TV Shows</option>
          <option value="restaurant">🍽️ Restaurants</option>
          <option value="place">📍 Places</option>
        </select>
      </div>
      {category && (
        <button className="clearBtn" onClick={clearCategory} type="button">
          Clear filter
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .selectWrapper {
    position: relative;
    display: flex;
    align-items: center;

    select {
      appearance: none;
      background: var(--clr-white);
      border: 2px solid #e5e7eb;
      border-radius: 2rem;
      padding: 0.55rem 2.5rem 0.55rem 1rem;
      font-size: 0.9rem;
      color: var(--clr-primary-4);
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
      width: 100%;

      &:focus {
        outline: none;
        border-color: var(--clr-primary-3);
        box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.15);
      }
    }

    .chevron {
      position: absolute;
      right: 0.85rem;
      color: #9ca3af;
      font-size: 1rem;
      pointer-events: none;
    }
  }

  .clearBtn {
    background: none;
    border: 2px solid #e5e7eb;
    color: var(--clr-red);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.45rem 0.9rem;
    border-radius: 2rem;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: none;
    transition: background 0.2s, border-color 0.2s;

    &:hover {
      background: #fee2e2;
      border-color: var(--clr-red);
      transform: none;
      box-shadow: none;
    }
  }
`;

export default CategoryFilter;
