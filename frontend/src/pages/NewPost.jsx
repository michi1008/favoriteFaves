import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { useCreatePostMutation } from "../slices/postsApiSlice";
import Spinner from "../components/Spinner";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [extraFields, setExtraFields] = useState({});

  const navigate = useNavigate();

  const [createPost, { isLoading }] = useCreatePostMutation();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        400,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await resizeFile(file);
    setImage(base64);
  };

  const handleFieldChange = (e) => {
    setExtraFields({
      ...extraFields,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !desc || !category) {
      toast.error("Please fill all the fields");
      return;
    }

    const postData = {
      title,
      image,
      description: desc,
      category,
      ...extraFields,
    };

    try {
      const result = await createPost(postData).unwrap();
      const postId = result.id;
      toast.success("Post was created! 🚀");
      navigate(`/posts/userPosts/${postId}`);
      handleClear();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleClear = () => {
    setTitle("");
    setImage("");
    setDesc("");
    setCategory("");
    setExtraFields({});
  };

  const renderCategoryFields = () => {
    switch (category) {
      case "book":
        return (
          <>
            <div className="fieldGroup">
              <label htmlFor="author">Author</label>
              <input type="text" name="author" id="author" value={extraFields.author || ""} onChange={handleFieldChange} placeholder="Author name" />
            </div>
            <div className="fieldGroup">
              <label htmlFor="genre">Genre</label>
              <input type="text" name="genre" id="genre" value={extraFields.genre || ""} onChange={handleFieldChange} placeholder="e.g. Fiction, Mystery" />
            </div>
          </>
        );
      case "movie":
        return (
          <>
            <div className="fieldGroup">
              <label htmlFor="director">Director</label>
              <input type="text" name="director" id="director" value={extraFields.director || ""} onChange={handleFieldChange} placeholder="Director name" />
            </div>
            <div className="fieldGroup">
              <label htmlFor="genre">Genre</label>
              <input type="text" name="genre" id="genre" value={extraFields.genre || ""} onChange={handleFieldChange} placeholder="e.g. Drama, Thriller" />
            </div>
          </>
        );
      case "tv_show":
        return (
          <>
            <div className="fieldGroup">
              <label htmlFor="network">Network</label>
              <input type="text" name="network" id="network" value={extraFields.network || ""} onChange={handleFieldChange} placeholder="e.g. Netflix, HBO" />
            </div>
            <div className="fieldGroup">
              <label htmlFor="genre">Genre</label>
              <input type="text" name="genre" id="genre" value={extraFields.genre || ""} onChange={handleFieldChange} placeholder="e.g. Comedy, Drama" />
            </div>
          </>
        );
      case "restaurant":
        return (
          <>
            <div className="fieldGroup">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" value={extraFields.address || ""} onChange={handleFieldChange} placeholder="Restaurant address" />
            </div>
            <div className="fieldGroup">
              <label htmlFor="cuisine">Cuisine</label>
              <input type="text" name="cuisine" id="cuisine" value={extraFields.cuisine || ""} onChange={handleFieldChange} placeholder="e.g. Italian, Japanese" />
            </div>
          </>
        );
      case "place":
        return (
          <div className="fieldGroup">
            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" value={extraFields.location || ""} onChange={handleFieldChange} placeholder="City, Country" />
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className="pageHeader">
        <h2>Share Your Favorite</h2>
        <p>Tell the world about something you love</p>
      </div>

      <form className="card" encType="multipart/form-data" onSubmit={handlePublish}>
        <div className="formGrid">
          <div className="formLeft">
            <div className="fieldGroup">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your post a title"
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="book">📚 Book</option>
                <option value="movie">🎬 Movie</option>
                <option value="tv_show">📺 TV Show</option>
                <option value="restaurant">🍽️ Restaurant</option>
                <option value="place">📍 Place</option>
              </select>
            </div>

            {renderCategoryFields()}

            <div className="fieldGroup">
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Why do you love it? Share your thoughts..."
              />
            </div>
          </div>

          <div className="formRight">
            <div className="uploadLabel">Photo</div>
            <div className="imagePreview">
              <img
                src={image || "https://images.unsplash.com/photo-1569690681342-d74eb25436fd?w=800&auto=format&fit=crop&q=60"}
                alt="preview"
                className={image ? "uploaded" : "placeholder"}
              />
            </div>
            <label className="uploadBtn" htmlFor="imageInput">
              {image ? "Change Photo" : "Upload Photo"}
              <input
                id="imageInput"
                type="file"
                accept=".jpeg,.png,.jpg"
                onChange={handleImage}
              />
            </label>
            {!image && (
              <p className="uploadHint">JPEG or PNG recommended</p>
            )}
          </div>
        </div>

        <div className="formActions">
          <button
            type="submit"
            className="submitBtn"
            disabled={!title || !desc || !image || !category}
          >
            Publish Post
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: calc(100vh - 7rem);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .pageHeader {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      color: var(--clr-primary-4);
      font-size: 2rem;
      margin-bottom: 0.25rem;
    }

    p {
      color: var(--clr-primary-3);
      font-size: 1rem;
      margin: 0;
    }
  }

  .card {
    background: var(--clr-white);
    border-radius: 1rem;
    box-shadow: var(--dark-shadow);
    padding: 2.5rem;
    width: 100%;
    max-width: 900px;
  }

  .formGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  .formLeft {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .fieldGroup {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--clr-primary-4);
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }

    input, select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      color: var(--clr-primary-4);
      background: var(--clr-primary-1);
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: var(--clr-primary-3);
      }
    }

    select {
      cursor: pointer;
    }

    textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      color: var(--clr-primary-4);
      background: var(--clr-primary-1);
      resize: vertical;
      min-height: 8rem;
      font-family: inherit;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: var(--clr-primary-3);
      }
    }
  }

  .formRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .uploadLabel {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--clr-primary-4);
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    align-self: flex-start;
  }

  .imagePreview {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 2px solid #e5e7eb;
    background: #f9fafb;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.placeholder {
        opacity: 0.5;
        filter: grayscale(1);
      }
    }
  }

  .uploadBtn {
    display: inline-block;
    padding: 0.6rem 1.5rem;
    background: var(--clr-primary-4);
    color: var(--clr-white);
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &:hover {
      background: var(--clr-primary-3);
      transform: translateY(-1px);
    }

    input {
      display: none;
    }
  }

  .uploadHint {
    font-size: 0.8rem;
    color: #9ca3af;
    margin: 0;
  }

  .formActions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }

  .submitBtn {
    padding: 0.85rem 2.5rem;
    background: linear-gradient(135deg, var(--clr-secondary-2), var(--clr-secondary-3));
    color: var(--clr-white);
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;

    &:hover:not(:disabled) {
      opacity: 0.88;
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none;
    }
  }

  @media screen and (max-width: 700px) {
    .card {
      padding: 1.5rem;
    }

    .formGrid {
      grid-template-columns: 1fr;
    }

    .imagePreview {
      aspect-ratio: 16 / 9;
    }

    .formActions {
      justify-content: stretch;

      .submitBtn {
        width: 100%;
      }
    }
  }
`;

export default NewPost;
