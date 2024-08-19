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


  .categorySelect {
    padding: 0.5rem;
    background-color: var(--clr-primary-3);
    border: none;
    border-radius: 5px;
    color: var(--clr-white);
    font-size: 1.2rem;
    height: 3rem;
    font-weight: 700;
  }

  /* filter-clear-botton */
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
    background-color: var(--clr-brown);
    border: 2px solid var(--clr-brown);
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 3rem;
    .filter {
      flex-direction: column;
      gap: 3rem;
    }
  }
`;

export default CategoryFilter;
