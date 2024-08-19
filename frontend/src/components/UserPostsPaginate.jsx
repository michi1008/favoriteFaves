import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const UserPostsPaginate = ({
  pages,
  page,
  keyword = "",
}) => {

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  return (
    <Wrapper>
      <div className="pagination-container">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              keyword
                ? `/posts/userPosts/${userId}/search/${keyword}/page/${x + 1}`
                : `/posts/userPosts/${userId}/page/${x + 1}`
            }
            className={x + 1 === page ? "active" : ""}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination-container a {
    color: var(--clr-primary-4);
    text-decoration: none;
    padding: 8px 16px;
    margin: 0 4px;
    border-radius: 4px;
    border: 1px solid var(--clr-primary-4);
  }

  .pagination-container a:hover {
    background-color: var(--clr-primary-3);
    color: var(--clr-white);
  }

  .pagination-container a.active {
    background-color: var(--clr-primary-4);
    color: var(--clr-white);
  }
`;

export default UserPostsPaginate;
