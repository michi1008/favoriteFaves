import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

const CATEGORY_LABELS = {
  book: "📚 Book",
  movie: "🎬 Movie",
  tv_show: "📺 TV Show",
  restaurant: "🍽️ Restaurant",
  place: "📍 Place",
};

const renderMeta = (post, category) => {
  switch (category) {
    case "book":
      return (
        <>
          <MetaRow label="Author" value={post.author} />
          <MetaRow label="Genre" value={post.genre} />
        </>
      );
    case "movie":
      return (
        <>
          <MetaRow label="Director" value={post.director} />
          <MetaRow label="Genre" value={post.genre} />
        </>
      );
    case "tv_show":
      return (
        <>
          <MetaRow label="Network" value={post.network} />
          <MetaRow label="Genre" value={post.genre} />
        </>
      );
    case "restaurant":
      return (
        <>
          <MetaRow label="Address" value={post.address} />
          <MetaRow label="Cuisine" value={post.cuisine} />
        </>
      );
    case "place":
      return <MetaRow label="Location" value={post.location} />;
    default:
      return null;
  }
};

const MetaRow = ({ label, value }) =>
  value ? (
    <div className="metaRow">
      <span className="metaLabel">{label}:</span>
      <span className="metaValue">{value}</span>
    </div>
  ) : null;

const Post = ({ post, category }) => (
  <Wrapper>
    <div className="post">
      <div className="imageContainer">
        <img className="image" src={post.image} alt={post.title} />
        {category && (
          <span className="badge">{CATEGORY_LABELS[category] || category}</span>
        )}
      </div>

      <div className="body">
        <h4 className="postTitle">{post.title}</h4>
        <p className="desc">{post.description}</p>
        <div className="meta">{renderMeta(post, category)}</div>
      </div>

      <div className="footer">
        <span className="author">
          By <strong>{post.user?.userName || "Unknown"}</strong>
        </span>
        <Link to={`/posts/${post._id}`} className="viewLink">
          View <FaExternalLinkSquareAlt />
        </Link>
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.section`
  .post {
    width: 280px;
    background: var(--clr-white);
    border-radius: 1rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.13);
    }
  }

  .imageContainer {
    position: relative;
    width: 100%;
    height: 200px;
    flex-shrink: 0;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .badge {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    background: rgba(29, 53, 87, 0.82);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.65rem;
    border-radius: 2rem;
    backdrop-filter: blur(4px);
  }

  .body {
    padding: 1rem 1.1rem 0.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .postTitle {
    color: var(--clr-primary-4);
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
  }

  .desc {
    font-size: 0.85rem;
    color: #6b7280;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-top: 0.25rem;
  }

  .metaRow {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    font-size: 0.82rem;
  }

  .metaLabel {
    color: var(--clr-primary-4);
    font-weight: 600;
    white-space: nowrap;
  }

  .metaValue {
    color: var(--clr-primary-3);
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.1rem;
    border-top: 1px solid #f0f0f0;
    margin-top: auto;
  }

  .author {
    font-size: 0.8rem;
    color: #9ca3af;

    strong {
      color: var(--clr-primary-3);
      font-weight: 600;
    }
  }

  .viewLink {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--clr-primary-3);
    transition: color 0.2s;

    &:hover {
      color: var(--clr-secondary-4);
    }
  }

  @media screen and (max-width: 600px) {
    .post {
      width: 100%;
    }

    .imageContainer {
      height: 180px;
    }
  }
`;

export default Post;
