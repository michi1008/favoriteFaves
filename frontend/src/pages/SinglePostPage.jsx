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

const CATEGORY_LABELS = {
  book: "📚 Book",
  movie: "🎬 Movie",
  tv_show: "📺 TV Show",
  restaurant: "🍽️ Restaurant",
  place: "📍 Place",
};

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

  const { data: post, isLoading, refetch } = useGetPostByIdQuery(postId);
  const [createComment] = useCreateCommentMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createComment({ postId, comment, user: userInfo._id }).unwrap();
      refetch();
      setComment("");
      toast.success("Comment added");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitReply = async (parentCommentId) => {
    try {
      await createComment({ postId, comment, user: userInfo._id, parentCommentId }).unwrap();
      refetch();
      setComment("");
      setReplyingTo(null);
      toast.success("Reply added");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
    setComment("");
  };

  if (isLoading || !post) return <Spinner />;

  const postComments = Array.isArray(post.comments) ? post.comments : [];

  const renderCategoryMeta = () => {
    switch (post.category) {
      case "book":
        return (
          <>
            {post.author && <MetaItem label="Author" value={post.author} />}
            {post.genre && <MetaItem label="Genre" value={post.genre} />}
          </>
        );
      case "movie":
        return (
          <>
            {post.director && <MetaItem label="Director" value={post.director} />}
            {post.genre && <MetaItem label="Genre" value={post.genre} />}
          </>
        );
      case "tv_show":
        return (
          <>
            {post.network && <MetaItem label="Network" value={post.network} />}
            {post.genre && <MetaItem label="Genre" value={post.genre} />}
          </>
        );
      case "restaurant":
        return (
          <>
            {post.address && <MetaItem label="Address" value={post.address} />}
            {post.cuisine && <MetaItem label="Cuisine" value={post.cuisine} />}
          </>
        );
      case "place":
        return post.location && <MetaItem label="Location" value={post.location} />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <div className="postCard">
        {post.category && (
          <span className="categoryBadge">
            {CATEGORY_LABELS[post.category] || post.category}
          </span>
        )}

        <h2 className="postTitle">{post.title}</h2>

        <div className="postMeta">
          <span>By {post.user?.userName || "Unknown"}</span>
          <span className="dot">·</span>
          <span>{new Date(post.createdAt).toLocaleString("en-US", options)}</span>
        </div>

        {post.image && (
          <img className="postImage" src={post.image} alt={post.title} />
        )}

        <p className="postDescription">{post.description}</p>

        {renderCategoryMeta() && (
          <div className="metaGrid">{renderCategoryMeta()}</div>
        )}
      </div>

      <div className="commentsCard">
        <h3 className="commentsTitle">
          Comments <span className="commentCount">{postComments.length}</span>
        </h3>

        {postComments.length === 0 && (
          <p className="noComments">No comments yet. Be the first!</p>
        )}

        <div className="commentList">
          {postComments.map((c) => (
            <div className="commentThread" key={c._id}>
              <div className="commentBubble">
                <div className="commentHeader">
                  <span className="commentAuthor">{c.userName}</span>
                </div>
                <p className="commentText">{c.comment}</p>

                {userInfo && (
                  <button
                    className="replyToggle"
                    onClick={() => handleReplyClick(replyingTo === c._id ? null : c._id)}
                  >
                    {replyingTo === c._id ? "Cancel" : "Reply"}
                  </button>
                )}
              </div>

              {c.replies?.length > 0 && (
                <div className="replyList">
                  {c.replies.map((reply) => (
                    <div className="commentBubble reply" key={reply._id}>
                      <div className="commentHeader">
                        <span className="commentAuthor">{reply.userName}</span>
                      </div>
                      <p className="commentText">{reply.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {replyingTo === c._id && (
                <form className="replyForm" onSubmit={(e) => { e.preventDefault(); submitReply(c._id); }}>
                  <textarea
                    placeholder="Write a reply..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit" className="submitBtn">Post Reply</button>
                </form>
              )}
            </div>
          ))}
        </div>

        <div className="addComment">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <label className="addCommentLabel">Add a comment</label>
              <textarea
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" className="submitBtn">Post Comment</button>
            </form>
          ) : (
            <p className="loginPrompt">
              <Link to="/login">Log in</Link> to leave a comment
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const MetaItem = ({ label, value }) => (
  <div className="metaItem">
    <span className="metaLabel">{label}</span>
    <span className="metaValue">{value}</span>
  </div>
);

const Wrapper = styled.section`
  max-width: 780px;
  margin: 2rem auto;
  padding: 0 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .postCard {
    background: var(--clr-white);
    border-radius: 1rem;
    box-shadow: var(--dark-shadow);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .categoryBadge {
    align-self: flex-start;
    background: linear-gradient(135deg, var(--clr-secondary-2), var(--clr-secondary-3));
    color: var(--clr-white);
    padding: 0.3rem 0.9rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04rem;
  }

  .postTitle {
    color: var(--clr-primary-4);
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin: 0;
  }

  .postMeta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--clr-primary-3);
    margin-bottom: 0.5rem;

    .dot {
      color: #d1d5db;
    }
  }

  .postImage {
    width: 100%;
    max-width: 420px;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: 0.75rem;
    box-shadow: var(--light-shadow);
  }

  .postDescription {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--clr-black);
    text-align: center;
    max-width: 560px;
    margin: 0;
  }

  .metaGrid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .metaItem {
    background: var(--clr-primary-1);
    border: 1px solid var(--clr-primary-2);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
  }

  .metaLabel {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    color: var(--clr-primary-3);
  }

  .metaValue {
    font-size: 0.95rem;
    color: var(--clr-primary-4);
    font-weight: 600;
  }

  .commentsCard {
    background: var(--clr-white);
    border-radius: 1rem;
    box-shadow: var(--dark-shadow);
    padding: 2rem;
  }

  .commentsTitle {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--clr-primary-4);
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .commentCount {
    background: var(--clr-primary-2);
    color: var(--clr-primary-4);
    font-size: 0.8rem;
    border-radius: 2rem;
    padding: 0.1rem 0.6rem;
  }

  .noComments {
    color: #9ca3af;
    font-size: 0.95rem;
    text-align: center;
    padding: 1.5rem 0;
  }

  .commentList {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .commentThread {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .commentBubble {
    background: var(--clr-primary-1);
    border-radius: 0.75rem;
    padding: 0.85rem 1rem;

    &.reply {
      margin-left: 1.5rem;
      background: #f0f4ff;
      border-left: 3px solid var(--clr-primary-3);
    }
  }

  .commentHeader {
    margin-bottom: 0.25rem;
  }

  .commentAuthor {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--clr-primary-4);
  }

  .commentText {
    font-size: 0.95rem;
    color: var(--clr-black);
    margin: 0 0 0.5rem;
    line-height: 1.5;
  }

  .replyToggle {
    background: none;
    border: none;
    color: var(--clr-primary-3);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    box-shadow: none;
    transition: color 0.2s;

    &:hover {
      background: none;
      color: var(--clr-secondary-3);
      transform: none;
      box-shadow: none;
    }
  }

  .replyList {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .replyForm {
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    font-family: inherit;
    resize: vertical;
    min-height: 5rem;
    color: var(--clr-primary-4);
    background: var(--clr-primary-1);
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: var(--clr-primary-3);
    }
  }

  .addComment {
    border-top: 1px solid #e5e7eb;
    padding-top: 1.5rem;
  }

  .addCommentLabel {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--clr-primary-4);
    text-transform: uppercase;
    letter-spacing: 0.04rem;
    margin-bottom: 0.5rem;
  }

  .submitBtn {
    margin-top: 0.25rem;
    padding: 0.6rem 1.5rem;
    background: linear-gradient(135deg, var(--clr-secondary-2), var(--clr-secondary-3));
    color: var(--clr-white);
    border: none;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;

    &:hover {
      opacity: 0.88;
      transform: translateY(-1px);
      background: linear-gradient(135deg, var(--clr-secondary-2), var(--clr-secondary-3));
    }
  }

  .loginPrompt {
    text-align: center;
    color: #6b7280;
    font-size: 0.95rem;
    padding: 1rem 0;

    a {
      color: var(--clr-secondary-3);
      font-weight: 600;
    }
  }

  @media (max-width: 600px) {
    .postTitle {
      font-size: 1.5rem;
    }

    .postCard, .commentsCard {
      padding: 1.25rem;
    }

    .commentBubble.reply, .replyForm {
      margin-left: 0.75rem;
    }
  }
`;

export default SinglePostPage;
