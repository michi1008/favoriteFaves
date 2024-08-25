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
          <option value="book">Books</option>
          <option value="movie">Movies</option>
          <option value="tv_show">TV Shows</option>
          <option value="restaurant">Restaurants</option>
          <option value="place">Places</option>
        </select>
        <button className="clearBtn" onClick={clearCategory}>
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

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .categorySelect {
    padding: 0.5rem;
    background-color: var(--clr-primary-4);
    border: none;
    border-radius: 3rem;
    color: var(--clr-white);
    font-size: 1.2rem;
    height: 3.2rem;
    width: 100%;
    min-width: 12rem;
    max-width: 22rem;
    outline: none;
  }

  .categorySelect:hover {
    transform: scale(1.05);
  }

  .clearBtn {
    background: linear-gradient(135deg, var(--clr-red), var(--clr-red2));
  }

  @media (max-width: 800px) {
    flex-direction: column;

    gap: 1rem;

    form {
      flex-direction: row;
      gap: 1rem;
    }

    .categorySelect {
      max-width: 100%;
      margin-top: 1rem;
    }

    .clearButton {
      max-width: 100%;
      margin-left: 0;
      margin-top: 1rem;
    }
  }
`;

export default CategoryFilter;
