import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

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

  const clearCategory = (e) => {
    e.preventDefault();
    setCategory("");
    navigate(`/posts/userPosts/${userId}/page/1`);
    onChange("");
  };

  return (
    <Wrapper>
      <form>
        <select
          className="categorySelect"
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select a Category</option>
          <option value="book">Book</option>
          <option value="movie">Movie</option>
          <option value="tv_show">TV Show</option>
          <option value="restaurant">Restaurant</option>
          <option value="place">Place</option>
        </select>
        <button className="clearButton" onClick={clearCategory}>
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
  gap: 1rem; 
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem; 
  }

  .categorySelect {
    padding: 0.5rem;
    background-color: var(--clr-primary-4);
    border: none;
    border-radius: 5px;
    color: var(--clr-white);
    font-size: 1rem;
    height: 2.5rem;
    width: 100%; 
    min-width: 12rem;
    max-width: 22rem; 
  }

  .clearButton {
    background-color: var(--clr-red);
    color: var(--clr-white);
    width: 100%;
    min-widht: 6rem; 
    max-width: 9rem; 
    height: 2.5rem;
    box-sizing: border-box;
    border: 2px solid var(--clr-red);
    border-radius: 5px;
    font-size: 1rem; 
    margin-left: 0.5rem; 
  }

  .clearButton:hover {
    background-color: var(--clr-white);
    border: 2px solid var(--clr-white);
    color: var(--clr-red);
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 1rem; 
    
    form {
      flex-direction: column;
      gap: 1rem; 
    }

    .categorySelect {
      max-width: 100%; 
    }

    .clearButton {
      max-width: 100%; 
      margin-left: 0; 
    }
  }
`;

export default CategoryFilter;
