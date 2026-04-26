import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPostsByUserQuery,
  useDeletePostMutation,
} from "../slices/postsApiSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import UserPostsPaginate from "../components/UserPostsPaginate";
import CategoryFilter from "../components/CategoryFilter";
import SearchBox from "../components/SearchBox";

const CATEGORY_LABELS = {
  book: "📚 Book",
  movie: "🎬 Movie",
  tv_show: "📺 TV Show",
  restaurant: "🍽️ Restaurant",
  place: "📍 Place",
};

const UserPosts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const { pageNumber, keyword } = useParams();
  const [category, setCategory] = useState("");

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

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
      refetch();
    }
  }, [userId, userInfo, category, keyword, pageNumber, navigate, refetch]);

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isPostsLoading || isDeleting) return <Spinner />;
  if (postsError) return <div>Error loading posts</div>;

  const renderCategoryMeta = (post) => {
    switch (post.category) {
      case "book":
        return (
          <div className="metaRow">
            {post.author && <span><strong>Author:</strong> {post.author}</span>}
            {post.genre && <span><strong>Genre:</strong> {post.genre}</span>}
          </div>
        );
      case "movie":
        return (
          <div className="metaRow">
            {post.director && <span><strong>Director:</strong> {post.director}</span>}
            {post.genre && <span><strong>Genre:</strong> {post.genre}</span>}
          </div>
        );
      case "tv_show":
        return (
          <div className="metaRow">
            {post.network && <span><strong>Network:</strong> {post.network}</span>}
            {post.genre && <span><strong>Genre:</strong> {post.genre}</span>}
          </div>
        );
      case "restaurant":
        return (
          <div className="metaRow">
            {post.address && <span><strong>Address:</strong> {post.address}</span>}
            {post.cuisine && <span><strong>Cuisine:</strong> {post.cuisine}</span>}
          </div>
        );
      case "place":
        return post.location ? (
          <div className="metaRow">
            <span><strong>Location:</strong> {post.location}</span>
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <div className="pageHeader">
        <h2>{userInfo?.userName}'s Posts</h2>
        <div className="underline" />
      </div>

      <div className="toolbar">
        <SearchBox />
        <CategoryFilter onChange={setCategory} />
      </div>

      {postsData?.userPosts.length > 0 ? (
        <div className="grid">
          {postsData.userPosts.map((post) => (
            <div className="postCard" key={post._id}>
              <div className="imageWrapper">
                <img src={post.image} alt={post.title} />
                {post.category && (
                  <span className="badge">
                    {CATEGORY_LABELS[post.category] || post.category}
                  </span>
                )}
              </div>

              <div className="cardBody">
                <Link to={`/posts/userPosts/${post._id}`}>
                  <h4 className="cardTitle">{post.title}</h4>
                </Link>
                <p className="cardDesc">{post.description}</p>
                {renderCategoryMeta(post)}
              </div>

              <div className="cardActions">
                <Link to={`/posts/userPosts/${post._id}/edit`} className="actionBtn editBtn">
                  Edit
                </Link>
                <button
                  className="actionBtn deleteBtn"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>You haven't shared any favorites yet.</p>
          <Link to="/posts/new">
            <button>Create your first post</button>
          </Link>
        </div>
      )}

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
  padding: 2rem 1rem 4rem;
  max-width: 1100px;
  margin: 0 auto;

  .pageHeader {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      color: var(--clr-primary-4);
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
  }

  .underline {
    width: 6rem;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--clr-secondary-2), var(--clr-secondary-4));
    margin: 0 auto;
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .postCard {
    background: var(--clr-white);
    border-radius: 1rem;
    box-shadow: var(--light-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--dark-shadow);
    }
  }

  .imageWrapper {
    position: relative;
    width: 100%;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .badge {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    background: rgba(29, 53, 87, 0.85);
    color: var(--clr-white);
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.65rem;
    border-radius: 2rem;
    backdrop-filter: blur(4px);
  }

  .cardBody {
    padding: 1rem 1rem 0.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .cardTitle {
    color: var(--clr-primary-4);
    font-size: 1rem;
    font-weight: 700;
    margin: 0;

    &:hover {
      color: var(--clr-primary-3);
    }
  }

  .cardDesc {
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  .metaRow {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.8rem;
    color: var(--clr-primary-3);

    strong {
      color: var(--clr-primary-4);
    }
  }

  .cardActions {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-top: 1px solid #f3f4f6;
  }

  .actionBtn {
    flex: 1;
    text-align: center;
    padding: 0.45rem 0;
    border-radius: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    border: none;

    &:hover {
      opacity: 0.8;
      transform: none;
      box-shadow: none;
    }
  }

  .editBtn {
    background: var(--clr-primary-1);
    color: var(--clr-primary-4);
    border: 1px solid var(--clr-primary-2);
  }

  .deleteBtn {
    background: #fee2e2;
    color: var(--clr-red);
  }

  .empty {
    text-align: center;
    padding: 4rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    p {
      color: #6b7280;
      font-size: 1.1rem;
    }

    button {
      padding: 0.75rem 2rem;
      font-size: 0.95rem;
    }
  }

  @media screen and (max-width: 600px) {
    .toolbar {
      flex-direction: column;
      gap: 0.75rem;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default UserPosts;
