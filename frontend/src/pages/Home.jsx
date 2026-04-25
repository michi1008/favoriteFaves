import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { useGetPostsQuery } from "../slices/postsApiSlice";

// Images for categories
const bookImg =
  "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D";
const movieImg =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8fDA%3D";
const tvShowImg =
  "https://images.unsplash.com/photo-1528928441742-b4ccac1bb04c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHZ8ZW58MHx8MHx8fDA%3D";
const restaurantImg =
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D";
const placeImg =
  "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D";

const categories = [
  { name: "Books", value: "book", image: bookImg },
  { name: "Movies", value: "movie", image: movieImg },
  { name: "TV Shows", value: "tv_show", image: tvShowImg },
  { name: "Restaurants", value: "restaurant", image: restaurantImg },
  { name: "Places", value: "place", image: placeImg },
];

const Home = () => {
  const { category: categoryParam } = useParams(); // Use useParams to get category from URL
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (categoryParam && categoryParam !== category) {
      setCategory(categoryParam);
    }
  }, [categoryParam, category]);

  const { data, isLoading, error, refetch } = useGetPostsQuery({
    category,
  });

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Header />
      {error ? (
        <div className="error">{error?.data?.message || error.error}</div>
      ) : (
        <div className="homeContent">
          <div className="homeContentTitle">
            <h2 className="sectionTitle">Categories to Explore</h2>
          </div>
          <div className="categoryList">
            {categories.map((cat) => (
              <Link to={`/category/${cat.value}`} key={cat.value} className="categoryCard">
                <img src={cat.image} alt={cat.name} className="categoryImage" />
                <div className="categoryOverlay">
                  <h2 className="categoryName">{cat.name}</h2>
                  <span className="categoryBtn">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 2rem 2rem;
  min-height: 100vh;

  .categoryList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    padding-bottom: 3rem;
  }

  .homeContent {
    max-width: 1200px;
    margin: 0 auto;
  }

  .homeContentTitle {
    color: var(--clr-primary-4);
    text-align: center;
    padding: 3rem 0 2rem;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    position: relative;
  }

  .sectionTitle::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--clr-secondary-3), var(--clr-secondary-4));
    border-radius: 2px;
    margin: 0.6rem auto 0;
  }

  .categoryCard {
    position: relative;
    width: 19rem;
    height: 16rem;
    border-radius: 1.2rem;
    overflow: hidden;
    display: block;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-7px) scale(1.02);
      box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
    }
  }

  .categoryImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s ease;
  }

  .categoryCard:hover .categoryImage {
    transform: scale(1.09);
  }

  .categoryOverlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(15, 23, 50, 0.88));
    padding: 2.5rem 1.5rem 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }

  .categoryName {
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .categoryBtn {
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    transition: color 0.2s ease, letter-spacing 0.2s ease;
  }

  .categoryCard:hover .categoryBtn {
    color: var(--clr-primary-2);
    letter-spacing: 0.07em;
  }

  @media screen and (max-width: 800px) {
    padding: 0 1rem 2rem;

    .categoryCard {
      width: 100%;
      height: 14rem;
    }
  }
`;

export default Home;
