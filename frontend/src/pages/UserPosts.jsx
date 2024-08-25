import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPostsByUserQuery,
  useDeletePostMutation,
} from "../slices/postsApiSlice";
import Spinner from "../components/Spinner";
import trash from "../assets/trash.png";
import edit from "../assets/edit.png";
import { toast } from "react-toastify";
import UserPostsPaginate from "../components/UserPostsPaginate";
import CategoryFilter from "../components/CategoryFilter";
import SearchBox from "../components/SearchBox";

const UserPosts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const { pageNumber, keyword } = useParams();

  const [category, setCategory] = useState("");

  const [deletePost, { isLoading: isDeleting, error: deleteError }] =
    useDeletePostMutation();

  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    refetch,
  } = useGetPostsByUserQuery({
    userId,
    keyword: keyword || "",
    pageNumber: pageNumber || 1,
    category: category || "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      refetch(); // Refetch posts when user info or query parameters change
    }
  }, [userId, userInfo, category, keyword, pageNumber, navigate, refetch]);

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deletePost(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  if (isPostsLoading || isDeleting) {
    return <Spinner />;
  }

  if (deleteError || postsError) {
    return <div>Error loading posts</div>;
  }

  const renderCategoryContent = (post) => {
    switch (post.category) {
      case "book":
        return (
          <div className="info">
            <p>
              <span>Author:</span>
              {post.author}
            </p>
            <p>
              <span>Genre:</span>
              {post.genre}
            </p>
          </div>
        );
      case "movie":
        return (
          <div className="info">
            <p>
              <span>Director: </span>
              {post.director}
            </p>
            <p>
              <span>Genre: </span>
              {post.genre}
            </p>
          </div>
        );
      case "tv_show":
        return (
          <div className="info">
            <p>
              <span>Network: </span>
              {post.network}
            </p>
            <p>
              <span>Genre: </span>
              {post.genre}
            </p>
          </div>
        );
      case "restaurant":
        return (
          <div className="info">
            <p>
              <span>Address: </span>
              {post.address}
            </p>
            <p>
              <span>Cuisine: </span>
              {post.cuisine}
            </p>
          </div>
        );
      case "place":
        return (
          <div className="info">
            <p>
              <span>Location: </span>
              {post.location}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <div className="userPostsTitle">
        <div>{userInfo && userInfo.userName}'s posts</div>
        <div className="underline"></div>
      </div>

      <div className="filter">
        <SearchBox />
        <CategoryFilter onChange={handleCategoryChange} />
      </div>

      <div className="posts">
        {postsData?.userPosts.length > 0 ? (
          postsData.userPosts.map((post) => (
            <div className="post" key={post._id}>
              <div className="postTitle">
                <h5>{post.title}</h5>
              </div>
              <div className="desc">
                <p>{post.description}</p>
              </div>
              <div className="imageContainer">
                <img className="image" src={post.image} alt={post.title} />
              </div>
              {renderCategoryContent(post)}
              <div className="iconContainer">
                <Link to={`/posts/userPosts/${post._id}/edit`}>
                  <img className="icon" src={edit} alt="edit" />
                </Link>
                <img
                  className="icon"
                  src={trash}
                  alt="delete"
                  onClick={() => handleDeletePost(post._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <h3>You don't have any posts...🥲</h3>
        )}
      </div>

      <UserPostsPaginate
        pages={postsData.pages}
        page={postsData.page}
        keyword={keyword || ""}
        category={category || ""}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
  }

  .userPostsTitle {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--clr-secondary-4);
    font-weight: 700;
    padding: 1rem;
  }

  .underline {
    width: 100%;
    height: 0.3rem;
    background: linear-gradient(
      90deg,
      var(--clr-secondary-1),
      var(--clr-secondary-2),
      var(--clr-secondary-3),
      var(--clr-secondary-4)
    );
    margin: 0 auto;
    margin-top: 0.5rem;
  }

  .post {
    width: 100%;
    max-width: 20rem;
    height: auto;
    min-height: 30rem;
    margin: 1rem;
    background-color: var(--clr-primary-1);
    padding: 1rem;
    border: 2px solid var(--clr-primary-1);
    border-radius: 5px;
    box-shadow: var(--dark-shadow);
    box-sizing: border-box;
  }

  .postTitle {
    color: var(--clr-primary-4);
    font-size: 2rem;
  }

  .image {
    width: 100%;
    height: auto;
    max-height: 15rem;
    object-fit: cover;
    border-radius: 0.2rem;
    box-shadow: var(--dark-shadow);
    margin: 0.5rem 0;
  }

  .desc {
    font-size: 1rem;
    color: var(--clr-brown);
    font-style: italic;
    line-height: 1.4rem;
    margin: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .info p {
    color: var(--clr-secondary-3);
    font-size: 1rem;
    font-weight: 700
  }

  .info span {
    color: var(--clr-primary-2): 
  }

  .iconContainer {
    display: flex;
    justify-content: flex-end;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }


  @media screen and (max-width: 1200px) {
    .userPostsTitle {
      font-size: 2rem;
    }
    .underline {
      width: 60%;
    }
  }

  @media screen and (max-width: 800px) {
    .userPostsTitle {
      font-size: 1.5rem;
    }
    .underline {
      width: 80%;
    }
  }

  @media screen and (max-width: 600px) {
    .userPostsTitle {
      font-size: 1.2rem;
    }
    .filter {
      flex-direction: column;
      gap: 1rem;
    }
    .post {
      width: 100%;
      max-width: 90%;
    }
  }
`;

export default UserPosts;
