import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetPostByIdQuery,
  useCreateCommentMutation,
} from "../slices/postsApiSlice";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const SinglePostPage = () => {
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const { data: post, isLoading, error, refetch } = useGetPostByIdQuery(postId);

  const [createComment, { isLoading: loadingComment }] =
    useCreateCommentMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createComment({
        postId,
        comment,
        user: userInfo._id,
      }).unwrap();
      refetch();
      toast.success("Your comment was added successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  if (!post) {
    return <Spinner />;
  }

  // Ensure post.comments is an array before mapping over it
  const postCommentsWithReplies = Array.isArray(post.comments)
    ? post.comments.map((comment) => ({
        ...comment,
      }))
    : [];

  const submitReply = async (parentCommentId) => {
    try {
      await createComment({
        postId,
        comment,
        user: userInfo._id,
        parentCommentId,
      }).unwrap();
      refetch();
      setComment("");
      setReplyingTo(null);
      toast.success("Your reply was added successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
    setComment("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  const renderCategoryContent = () => {
    switch (post.category) {
      case "book":
        return (
          <div className="info">
            <p>
              <span>Author: </span>
              {post.author}
            </p>
            <p>
              <span>Genre: </span>
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
      <div className="singlePost">
        <div className="title">
          <h3>{post?.title}</h3>
        </div>
        <div className="image">
          <img className="image" src={post?.image} />
        </div>
        <div className="desc">
          <h3>Description</h3>
          <h4>{post?.description}</h4>
        </div>
        {renderCategoryContent()}
        <div className="infoContainer">
          <div>
            <p>
              Created at :{" "}
              <span>
                {new Date(post.createdAt).toLocaleString("en-US", options)}
              </span>
            </p>
            <p>
              Created by :{" "}
              <span>
                {post.user && post.user.userName
                  ? post.user.userName
                  : "Unknown"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="commentContainer">
        <h3>Comments</h3>
        {postCommentsWithReplies.map((postComment) => (
          <ul key={postComment._id}>
            <p
              className={`comment ${
                replyingTo === postComment._id ? "reply" : ""
              }`}
            >
              "{postComment.comment}" by <span>{postComment.userName}</span>
            </p>
            {replyingTo === postComment._id && (
              <form onSubmit={() => submitReply(postComment._id)}>
                <textarea
                  className="commentInput"
                  placeholder="Reply to this comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="replyBtn" type="submit">
                  Submit
                </button>
              </form>
            )}
            {postComment.replies.length > 0 &&
              postComment.replies.map((reply) => (
                <ul key={reply._id}>
                  <p className={`comment reply`}>
                    "{reply.comment}" by <span>{reply.userName}</span>
                  </p>
                </ul>
              ))}
            {userInfo && (
              <button
                className="replyBtn"
                onClick={() => handleReplyClick(postComment._id)}
              >
                Reply
              </button>
            )}
          </ul>
        ))}
        <div className="createCommentContainer">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <label>
                <h4 className="addCommentText">Add your Comment</h4>
              </label>
              <textarea
                className="commentInput"
                placeholder="Enter your comment..."
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button className="commentSubmit" type="submit">
                Submit
              </button>
            </form>
          ) : (
            <div className="commentAskLogin">
              <p>
                Please{" "}
                <Link to="/login">
                  <span>Login</span>
                </Link>{" "}
                to comment
              </p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 900px;
  margin: auto;
  border-radius: 12px;
  background-color: var(--clr-primary-4); 

  .singlePost {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 2rem;
    padding: 2rem;
    background: var(--clr-primary-1);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .image {
    width: 100%;
    max-width: 30rem;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .title h3 {
    color: var(--clr-primary-4);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }

  .desc {
    font-size: 1rem;
    color: var(--clr-primary-3);
    background: var(--clr-primary-2);
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 30rem;
    text-align: center;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    font-size: 1rem;
    color: var(--clr-secondary-4);
  }

  .info p {
    font-size: 1.1rem;
    color: var(--clr-brown);
  }

  .info p span {
    color: var(--clr-primary-3);
    font-weight: 700;
  }

  .commentContainer {
    width: 100%;
    max-width: 30rem;
    margin-top: 2rem;
    background-color: var(--clr-white);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .commentContainer h3 {
    color: var(--clr-secondary-3);
    margin-bottom: 1rem;
  }

  .comment {
    color: #666;
    font-size: 1rem;
    background-color: var(--clr-primary-1); 
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .comment.reply {
    margin-left: 1.5rem;
    margin-top: 1rem;
  }

  .createCommentContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  textarea {
    background-color: var(--clr-white);
    color: var(--clr-brown);
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    height: 5rem;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  textarea:focus {
    outline: none;
    border-color: #ff4b5c;
    box-shadow: 0 0 0 2px rgba(255, 75, 92, 0.3);
  }

  .replyBtn,
  .commentSubmit {
    background: #ff4b5c;
    color: white;
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .replyBtn:hover,
  .commentSubmit:hover {
    background: #e03a4a; /* Darker shade for hover effect */
  }

  .commentAskLogin p {
    font-size: 1.2rem;
    color: #333;
    text-align: center;
  }

  .commentAskLogin span {
    font-weight: 700;
    color: #ff4b5c;
  }

  .commentAskLogin span:hover {
    color: #e03a4a;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    .singlePost,
    .commentContainer {
      padding: 1rem;
    }

    .title h3 {
      font-size: 2rem;
    }

    .desc {
      font-size: 0.9rem;
    }

    .infoContainer {
      font-size: 0.9rem;
    }

    .commentInput {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .title h3 {
      font-size: 1.5rem;
    }

    .image {
      max-width: 20rem;
    }

    .desc {
      font-size: 0.9rem;
    }

    .info p {
      font-size: 0.9rem;
    }

    .commentInput {
      font-size: 0.8rem;
    }

    .commentSubmit {
      font-size: 0.8rem;
    }
  }
`;

export default SinglePostPage;
