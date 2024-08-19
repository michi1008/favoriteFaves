import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { useGetPostsQuery } from "../slices/postsApiSlice";

// Images for categories
const bookImg = "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D";
const movieImg = "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8fDA%3D";
const tvShowImg = "https://images.unsplash.com/photo-1528928441742-b4ccac1bb04c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHZ8ZW58MHx8MHx8fDA%3D";
const restaurantImg = "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D";
const placeImg = "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D";

const categories = [
  { name: "Book", value: "book", image: bookImg },
  { name: "Movie", value: "movie", image: movieImg },
  { name: "TV Show", value: "tv_show", image: tvShowImg },
  { name: "Restaurant", value: "restaurant", image: restaurantImg },
  { name: "Place", value: "place", image: placeImg },
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
        <div className="home-content">
          <div className="categoryList">
            {categories.map((cat) => (
              <div key={cat.value} className="categoryCard">
                <img src={cat.image} alt={cat.name} className="categoryImage" />
                <h2>{cat.name}</h2>
                <Link to={`/category/${cat.value}`}>
                  <button className="categoryBtn">Explore</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .categoryList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .categoryCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 25rem;
    padding: 1rem;
    background-color: var(--clr-primary-2);
    border-radius: 10px;
    box-shadow: var(--light-shadow);
    color: var(--clr-primary-4);
  }

  .categoryImage {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .categoryBtn {
    padding: 0.5rem 1rem;
    background-color: var(--clr-primary-4);
    color: var(--clr-white);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .filter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
`;

export default Home;
