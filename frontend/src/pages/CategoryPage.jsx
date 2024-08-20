import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Spinner from "../components/Spinner";
import HomePaginate from "../components/HomePaginate";
import HomeSearch from "../components/HomeSearch";
import { useGetPostsQuery } from "../slices/postsApiSlice";

const CategoryPage = () => {
  const { category, keyword = "", pageNumber = "1" } = useParams();
  const navigate = useNavigate();


  const categoryDisplayNames = {
    book: "Book",
    movie: "Movie",
    tv_show: "TV Show",
    restaurant: "Restaurant",
    place: "Place",
  };

  const displayName = categoryDisplayNames[category] || category;

  const submitHandler = (newKeyword) => {
    if (newKeyword) {
      navigate(`/category/${category}/search/${newKeyword.trim()}`);
    } else {
      navigate(`/category/${category}`);
    }
  };

  const { data, isLoading, error } = useGetPostsQuery({
    keyword,
    pageNumber,
    category,
  });


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error?.data?.message || error.error}</div>;
  }

 

  return (
    <Wrapper>
      <div className="categoryTitle">
        <h1>{displayName} Posts</h1>
      </div>
      <div className="categoryBtnContainer">
      <div className="backBtn">
        <Link to="/">
          <button>Go back</button>
        </Link>
      </div>
      <HomeSearch 
        keyword={keyword}
        category={category}
        onSubmit={submitHandler} />    
      </div>
      <div className="underline"></div>
      <div className="postsContainer">
        {data.posts.map((post) => (
          <Post key={post._id} post={post} category={category} />
        ))}
      </div>     
      <HomePaginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword: ""}
        category={category}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 1rem;
  bacground: #f9f9f9;



  .categoryTitle  {
    text-align: center;
    h1 {
    color: var(--clr-primary-4);
    font-size: 2rem;
    font-weight: 700;
  }
 

  .butttonContainer {
    display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  }

  .backBtn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: var(--clr-primary-4);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--clr-primary-3);
  }
  }
  
  .underline {
  background-color: var(--clr-primary-4);
  height: 0.3rem;
  width: 50%;
  margin: 1rem 0;
  }

  .postsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;

  }
  .categoryBtnContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15rem;
  }

  .error {
  color: var(--clr-red);
  font-size: 1.2rem;
  }
`;

export default CategoryPage;
