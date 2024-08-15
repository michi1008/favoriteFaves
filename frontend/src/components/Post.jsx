import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaExternalLinkSquareAlt } from "react-icons/fa";


const Post = ({ post, category }) => {
    switch (category) {
        case 'book':
          return (
            <Wrapper>
                <div className="post">
                <div className="title"><h4>{post.title}</h4></div>
                <div className="desc"><p>{post.description}</p></div>
                <div className="info"><p>{post.author}</p></div>
                <div className="info"><p>{post.genre}</p></div>
                <div className="imageContainer"><img className="image" src={post.image} /></div>
                <div className="userContainer">
                <div className="user"><p>Created by: {post.user ? post.user.userName : "Unknown"}</p></div> 
                <Link to={`/posts/${post._id}`} className="link">
                    <div className="link-icon"><FaExternalLinkSquareAlt /></div>
                </Link>
                </div>
                </div>
            </Wrapper>
            );
        case 'movie':
            return (
            <Wrapper>
                <div className="post">
                <div className="title"><h4>{post.title}</h4></div>
                <div className="desc"><p>{post.description}</p></div>
                <div className="info"><p>{post.director}</p></div>
                <div className="info"><p>{post.genre}</p></div>
                <div className="imageContainer"><img className="image" src={post.image} /></div>
                <div className="userContainer">
                <div className="user"><p>Created by: {post.user ? post.user.userName : "Unknown"}</p></div> 
                <Link to={`/posts/${post._id}`} className="link">
                    <div className="link-icon"><FaExternalLinkSquareAlt /></div>
                </Link>
                </div>
                </div>
            </Wrapper>
            );
        case 'tv_show':
            return (
            <Wrapper>
                <div className="post">
                <div className="title"><h4>{post.title}</h4></div>
                <div className="desc"><p>{post.description}</p></div>
                <div className="info"><p>{post.network}</p></div>
                <div className="info"><p>{post.genre}</p></div>
                <div className="imageContainer"><img className="image" src={post.image} /></div>
                <div className="userContainer">
                <div className="user"><p>Created by: {post.user ? post.user.userName : "Unknown"}</p></div> 
                <Link to={`/posts/${post._id}`} className="link">
                    <div className="link-icon"><FaExternalLinkSquareAlt /></div>
                </Link>
                </div>
                </div>
            </Wrapper>
            );
        case 'restaurant':
            return (
            <Wrapper>
                <div className="post">
                <div className="title"><h4>{post.title}</h4></div>
                <div className="desc"><p>{post.description}</p></div>
                <div className="info"><p>{post.address}</p></div>
                <div className="info"><p>{post.cuisine}</p></div>
                <div className="imageContainer"><img className="image" src={post.image} /></div>
                <div className="userContainer">
                <div className="user"><p>Created by: {post.user ? post.user.userName : "Unknown"}</p></div> 
                <Link to={`/posts/${post._id}`} className="link">
                    <div className="link-icon"><FaExternalLinkSquareAlt /></div>
                </Link>
                </div>
                </div>
            </Wrapper>
            );
        case 'place':
            return (
            <Wrapper>
                <div className="post">
                <div className="title"><h4>{post.title}</h4></div>
                <div className="desc"><p>{post.desc}</p></div>
                <div className="info"><p>{post.address}</p></div>
                <div className="imageContainer"><img className="image" src={post.image} /></div>
                <div className="userContainer">
                <div className="user"><p>Created by: {post.user ? post.user.userName : "Unknown"}</p></div>
                <Link to={`/posts/${post._id}`} className="link">
                    <div className="link-icon"><FaExternalLinkSquareAlt /></div>
                </Link> 
                </div>
                </div>
            </Wrapper>
            );
        
}
}
const Wrapper = styled.section`
.post {
  width: 22rem;
  height: 30rem;
  background-color: var(--clr-primary-2);
  padding: 2rem;
  border-radius: 5px;
  box-shadow: var(--dark-shadow);
}

.title {
  color: var(--clr-primary-4);
  font-size: 1.2rem;
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
font-size; 1rem;
}

.userContainer {
  display: flex;
  flex-direction: row;
  align-itmes: center;
  justify-content: space-between;
}

.user p {
  color: var(--clr-primary-4);
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
  
  .recipeLink {
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
  }
}

`
export default Post