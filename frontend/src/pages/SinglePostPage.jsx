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
import reply from "../assets/reply.png";

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
      const newReply = await createComment({
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
  };

  if (isLoading) {
    return <Spinner />;
  }

  const renderCategoryContent = () => {
    switch (post.category) {
      case "book":
        return (
          <div className="info">
            <p>Author: {post.author}</p>
            <p>Genre:{post.genre}</p>
          </div>
        );
      case "movie":
        return (
          <div className="info">
            <p>
              <span>director: </span>
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
  justify-content: center;
  align-items: center;

  .singlePost {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    gap: 2rem;
  }

  .image {
    width: 100%;
    height: auto;
    max-width: 38rem;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: var(--dark-shadow);
  }

  .desc {
    font-size: 1rem;
    color: var(--clr-primary-4);
    font-style: Italic;
    margin-top: 1rem;
    width: 30rem;
  }

  .info {
    color: var(--clr-primary-3);
    font-size: 1.5rem;
  }

  .info span {
    color: var(--clr-brown);
  }

  .title h3 {
    color: var(--clr-primary-4);
    font-size: 3rem;
    font-weight: 700;
    margin-top: 1rem;
  }

  .infoContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: var(--clr-brown);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .infoContainer p span {
    color: var(--clr-primary-3);
  }

  // comments

  .commentContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: var(--clr-primary-1);
    border-radius: 5px;
    box-shadow: var(--dark-shadow);
  }

  .commentContainer h3 {
    color: var(--clr-primary-3);
  }

  .comment {
    color: var(--clr-primary-4);
    font-size: 1rem;
  }

  .addCommentText {
    color: var(--clr-primary-3);
  }

  .createCommentContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  textarea {
    background-color: var(--clr-primary-4);
    color: var(--clr-white);
    border: 1px solid var(--clr-primary-4);
    border-radius: 10px;
    padding: 1rem;
    height: 10rem;
    width: 100%;
    font-size: 1rem;
  }

  textarea::placeholder {
    color: var(--clr-white);
    padding: 1rem;
  }

  textarea:focus {
    outline: 2px solid var(--clr-brown);
  }

  span {
    font-weight: 700;
    color: var(--clr-red);
  }

  .replyBtn {
    border-radius: 5px;
    background-color: var(--clr-primary-4);
    width: 5rem;
    height: 2rem;
    font-size: 0.8rem;
  }

  .replyBtn:hover {
    background-color: var(--clr-brown);
  }

  .comment.reply {
    margin-left: 2rem;
    margin-top: 1rem;
  }

  .commentSubmit {
    background-color: var(--clr-primary-3);
    border-radius: 5px;
  }

  .commentSubmit:hover {
    background-color: var(--clr-white);
    color: var(--clr-primary-3);
  }

  .commentAskLogin p {
    font-size: 1.2rem;
    color: var(--clr-primary-3);
  }

  .commentAskLogin span {
    font-weight: 700;
  }

  .commentAskLogin span:hover {
    color: var(--clr-primary-red);
  }

@media (max-width: 768px) {
    .singlePost {
      padding: 1rem;
    }

    .title h3 {
      font-size: 1.5rem;
    }

    .desc {
      font-size: 0.9rem;
    }

    .info {
      font-size: 0.9rem;
    }

    .commentInput {
      font-size: 0.9rem;
    }

    .commentSubmit {
      font-size: 0.9rem;
    }

    .commentContainer {
      padding: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .title h3 {
      font-size: 1.2rem;
    }

    .desc {
      font-size: 0.8rem;
    }

    .info {
      font-size: 0.8rem;
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
