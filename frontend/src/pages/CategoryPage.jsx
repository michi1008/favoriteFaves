import React from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Spinner from "../components/Spinner";
import HomePaginate from "../components/HomePaginate";
import HomeSearch from "../components/HomeSearch";
import { useGetPostsQuery } from "../slices/postsApiSlice";

const CATEGORY_META = {
  book:       { label: "Books",       emoji: "📚" },
  movie:      { label: "Movies",      emoji: "🎬" },
  tv_show:    { label: "TV Shows",    emoji: "📺" },
  restaurant: { label: "Restaurants", emoji: "🍽️" },
  place:      { label: "Places",      emoji: "📍" },
};

const CategoryPage = () => {
  const { category, keyword = "", pageNumber = "1" } = useParams();
  const navigate = useNavigate();

  const meta = CATEGORY_META[category] || { label: category, emoji: "⭐" };

  const submitHandler = (newKeyword) => {
    if (newKeyword) {
      navigate(`/category/${category}/search/${newKeyword.trim()}`);
    } else {
      navigate(`/category/${category}`);
    }
  };

  const { data, isLoading, error } = useGetPostsQuery({ keyword, pageNumber, category });

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <ErrorWrapper>
        <p>{error?.data?.message || "Something went wrong"}</p>
        <Link to="/"><button>Go Home</button></Link>
      </ErrorWrapper>
    );
  }

  return (
    <Wrapper>
      <div className="pageHeader">
        <span className="emoji">{meta.emoji}</span>
        <h1>{meta.label}</h1>
        <Link to="/" className="backLink">← Back to home</Link>
      </div>

      <div className="searchBar">
        <HomeSearch keyword={keyword} category={category} onSubmit={submitHandler} />
      </div>

      {data.posts.length === 0 ? (
        <div className="empty">
          <p>No posts found{keyword ? ` for "${keyword}"` : ""}.</p>
        </div>
      ) : (
        <div className="grid">
          {data.posts.map((post) => (
            <Post key={post._id} post={post} category={category} />
          ))}
        </div>
      )}

      <HomePaginate
        pages={data.pages}
        page={data.page}
        keyword={keyword || ""}
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
  padding: 2rem 1rem 4rem;
  max-width: 1100px;
  margin: 0 auto;

  .pageHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;

    .emoji {
      font-size: 2.5rem;
      line-height: 1;
    }

    h1 {
      color: var(--clr-primary-4);
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }

    .backLink {
      font-size: 0.85rem;
      color: var(--clr-primary-3);
      font-weight: 600;
      margin-top: 0.25rem;

      &:hover {
        color: var(--clr-secondary-3);
      }
    }
  }

  .searchBar {
    width: 100%;
    max-width: 500px;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .empty {
    padding: 3rem 1rem;
    text-align: center;
    color: #9ca3af;
    font-size: 1rem;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 1rem;
  color: var(--clr-red);
  font-size: 1.1rem;
`;

export default CategoryPage;
