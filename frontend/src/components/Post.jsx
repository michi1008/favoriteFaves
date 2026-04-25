import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

const Post = ({ post, category }) => {
  switch (category) {
    case "book":
      return (
        <Wrapper>
          <div className="post">
            <div className="title">
              <h4>{post.title}</h4>
            </div>
            <div className="desc">
              <p>{post.description}</p>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Author: </p>
              </div>
              <div className="infoCentent">
                <p>{post.author}</p>
              </div>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Genre: </p>
              </div>
              <div className="infoCentent">
                <p>{post.genre}</p>
              </div>
            </div>
            <div className="imageContainer">
              <img className="image" src={post.image} />
            </div>
            <div className="userContainer">
              <div className="user">
                <p>Created by: {post.user ? post.user.userName : "Unknown"}</p>
              </div>
              <Link to={`/posts/${post._id}`} className="link">
                <div className="link-icon">
                  <FaExternalLinkSquareAlt />
                </div>
              </Link>
            </div>
          </div>
        </Wrapper>
      );
    case "movie":
      return (
        <Wrapper>
          <div className="post">
            <div className="title">
              <h4>{post.title}</h4>
            </div>
            <div className="desc">
              <p>{post.description}</p>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Director: </p>
              </div>
              <div className="infoCentent">
                <p>{post.director}</p>
              </div>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Genre: </p>
              </div>
              <div className="infoCentent">
                <p>{post.genre}</p>
              </div>
            </div>
            <div className="imageContainer">
              <img className="image" src={post.image} />
            </div>
            <div className="userContainer">
              <div className="user">
                <p>Created by: {post.user ? post.user.userName : "Unknown"}</p>
              </div>
              <Link to={`/posts/${post._id}`} className="link">
                <div className="link-icon">
                  <FaExternalLinkSquareAlt />
                </div>
              </Link>
            </div>
          </div>
        </Wrapper>
      );
    case "tv_show":
      return (
        <Wrapper>
          <div className="post">
            <div className="title">
              <h4>{post.title}</h4>
            </div>
            <div className="desc">
              <p>{post.description}</p>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Network:</p>
              </div>
              <div className="infoCentent">
                <p>{post.network}</p>
              </div>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Genre: </p>
              </div>
              <div className="infoCentent">
                <p>{post.genre}</p>
              </div>
            </div>
            <div className="imageContainer">
              <img className="image" src={post.image} />
            </div>
            <div className="userContainer">
              <div className="user">
                <p>Created by: {post.user ? post.user.userName : "Unknown"}</p>
              </div>
              <Link to={`/posts/${post._id}`} className="link">
                <div className="link-icon">
                  <FaExternalLinkSquareAlt />
                </div>
              </Link>
            </div>
          </div>
        </Wrapper>
      );
    case "restaurant":
      return (
        <Wrapper>
          <div className="post">
            <div className="title">
              <h4>{post.title}</h4>
            </div>
            <div className="desc">
              <p>{post.description}</p>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Address: </p>
              </div>
              <div className="infoCentent">
                <p>{post.address}</p>
              </div>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Cuisine: </p>
              </div>
              <div className="infoCentent">
                <p>{post.cuisine}</p>
              </div>
            </div>
            <div className="imageContainer">
              <img className="image" src={post.image} />
            </div>
            <div className="userContainer">
              <div className="user">
                <p>Created by: {post.user ? post.user.userName : "Unknown"}</p>
              </div>
              <Link to={`/posts/${post._id}`} className="link">
                <div className="link-icon">
                  <FaExternalLinkSquareAlt />
                </div>
              </Link>
            </div>
          </div>
        </Wrapper>
      );
    case "place":
      return (
        <Wrapper>
          <div className="post">
            <div className="title">
              <h4>{post.title}</h4>
            </div>
            <div className="desc">
              <p>{post.description}</p>
            </div>
            <div className="info">
              <div className="infoTitle">
                <p>Location: </p>
              </div>
              <div className="infoCentent">
                <p>{post.location}</p>
              </div>
            </div>
            <div className="imageContainer">
              <img className="image" src={post.image} />
            </div>
            <div className="userContainer">
              <div className="user">
                <p>Created by: <span>{post.user ? post.user.userName : "Unknown"}</span></p>
              </div>
              <Link to={`/posts/${post._id}`} className="link">
                <div className="link-icon">
                  <FaExternalLinkSquareAlt />
                </div>
              </Link>
            </div>
          </div>
        </Wrapper>
      );
  }
};
const Wrapper = styled.section`

.post {
  max-width: 28rem;
  min-height: 36rem;
  background-color: var(--clr-white);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.13);
}

.imageContainer {
  order: -1;
  margin: -1.5rem -1.5rem 0 -1.5rem;
  width: calc(100% + 3rem);
}

.image {
  width: 100%;
  height: 11rem;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
  display: block;
}

.title h4 {
  color: var(--clr-primary-4);
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0;
}

.desc {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
}

.infoTitle {
  color: var(--clr-primary-4);
  font-weight: 600;
}

.infoCentent {
  color: var(--clr-primary-3);
}

.userContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
}

.user p {
  color: #9ca3af;
  font-size: 0.85rem;
}

.user span {
  color: var(--clr-secondary-3);
  font-weight: 600;
}

.link-icon {
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--clr-primary-3);
  transition: color 0.2s ease;
}

.link-icon:hover {
  color: var(--clr-secondary-4);
}

@media screen and (max-width: 800px) {
  .post {
    width: 100%;
  }

  .image {
    height: 14rem;
  }

  .link {
    font-size: 1.2rem;
    cursor: pointer;
  }
}

`;
export default Post;
