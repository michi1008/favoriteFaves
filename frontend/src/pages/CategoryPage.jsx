import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Spinner from "../components/Spinner";
import Paginate from "../components/Paginate";
import Filter from "../components/Filter";
import { useGetPostsQuery } from "../slices/postsApiSlice";

const CategoryPage = () => {
  const { category, pageNumber, keyword } = useParams();

  // Mapping category values to display names
  const categoryDisplayNames = {
    book: "Book",
    movie: "Movie",
    tv_show: "TV Show",
    restaurant: "Restaurant",
    place: "Place",
  };

  const displayName = categoryDisplayNames[category] || category;
  // Initialize filters state
  const [filters, setFilters] = useState({
    sortBy: "", // You can set a default sortBy value here if needed
  });

  // Destructure sortBy from filters after filters have been initialized
  const { sortBy } = filters;

  // Now use sortBy safely in the useGetPostsQuery hook
  const { data, isLoading, error } = useGetPostsQuery({
    keyword,
    pageNumber,
    category,
    sortBy,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error?.data?.message || error.error}</div>;
  }

  const handleFilterChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  return (
    <Wrapper>
      <div className="categoryTitle">
        <h1>{displayName} Posts</h1>
      </div>
      <div className="postsContainer">
        {data.posts.map((post) => (
          <Post key={post._id} post={post} category={category} />
        ))}
      </div>
      <div className="underline"></div>
      <Filter onChange={handleFilterChange} />
      <Paginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ""}
        sortBy={sortBy ? sortBy : ""}
        category={category ? category : ""}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;

  .postsContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .categoryTitle h1 {
    color: var(--clr-primary-4);
  }

  .underline {
    background-color: var(--clr-primary-4);
    height: 0.3rem;
    width: 65%;
  }
`;

export default CategoryPage;
