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
  height: 38rem;
  background-color: var(--clr-primary-1);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--dark-shadow);
  width: 100%;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.title h4 {
  color: var(--clr-red2);
  font-size: 1.8rem;
  font-weight: 700;
}

.image {
width: 80%;
height: 10rem;
object-fit: cover;
border-radius: 0.2rem;
box-shadow: var(--dark-shadow);
margin-bottom: 1rem;
}

.desc {
font-size: 1rem;
color: var(--clr-brown);
font-style: italic;
line-height: 1.2rem;
margin: 1rem 0;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
}

.info {
color: var(--clr-primary-3);
font-size: 1.2rem;
display: flex;
flex-diretion: row;
align-items: center;
justify-content: flex-start;
gap: 0.5rem;
}

.infoTitle {
  color: var(--clr-primary-4);
  font-weight: 700;
}

.userContainer {
  display: flex;
  flex-direction: row;
  align-itmes: center;
  justify-content: space-between;
}

.user p {
  color: var(--clr-brown);
  font-size: 1.2rem;
}

.user span {
  color: var(--clr-secondary-3);
  font-size: 1.4rem;
  font-weight: 700;
}

.link-icon {
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--clr-primary-4);

.link-icon:hover {
  color: var(--clr-brown);
}

@media screen and (max-width: 800px){
  .post {
    width: 20rem;
    height: 25rem;
  }
  
  .image {
  width: 100%;
  height: 15rem;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  }
  
  .desc {
  font-size: 1.2rem;
  line-height: 1.2rem;
  margin-top: 1rem;
  }
  
  .link {
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
  }
}

`;
export default Post;
