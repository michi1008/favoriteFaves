import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../slices/postsApiSlice";
import Spinner from "../components/Spinner";

const EditPost = () => {
  const { postId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const { data: post, isLoading, refetch, error } = useGetPostByIdQuery(postId);
  console.log(post);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [extraFields, setExtraFields] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatePost, { isLoading: loadingUpdate }] = useUpdatePostMutation();

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

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !description || !category) {
        toast.error("Please fill all the fields");
        return;
      }

      await updatePost({
        postId,
        data: {
          title,
          image,
          description,
          category,
          author: extraFields.author,
          genre: extraFields.genre,
          director: extraFields.director,
          network: extraFields.network,
          address: extraFields.address,
          cuisine: extraFields.cuisine,
          location: extraFields.location,
        },
      }).unwrap();

      toast.success("Post updated");

      refetch();
      navigate(`/posts/userPosts/${userId}`);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setImage(post.image || "");
      setDescription(post.description || "");
      setCategory(post.category || "");

      setExtraFields({
        author: post.author || "",
        genre: post.genre || "",
        director: post.director || "",
        network: post.network || "",
        address: post.address || "",
        cuisine: post.cuisine || "",
        location: post.location || "",
      });
    }
  }, [post]);

  const renderCategoryFields = () => {
    switch (category) {
      case "book":
        return (
          <>
            <label htmlFor="author">Author</label>
            <input
              className="selection"
              type="text"
              name="author"
              value={extraFields.author || ""}
              onChange={handleFieldChange}
            />
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              name="genre"
              value={extraFields.genre || ""}
              onChange={handleFieldChange}
            />
          </>
        );
      case "movie":
        return (
          <>
            <label htmlFor="director">Director</label>
            <input
              className="selection"
              type="text"
              name="director"
              value={extraFields.director || ""}
              onChange={handleFieldChange}
            />
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              name="genre"
              value={extraFields.genre || ""}
              onChange={handleFieldChange}
            />
          </>
        );
      case "tv_show":
        return (
          <>
            <label htmlFor="network">Network</label>
            <input
              className="selection"
              type="text"
              name="network"
              value={extraFields.network || ""}
              onChange={handleFieldChange}
            />
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              name="genre"
              value={extraFields.genre || ""}
              onChange={handleFieldChange}
            />
          </>
        );
      case "restaurant":
        return (
          <>
            <label htmlFor="address">Address</label>
            <input
              className="selection"
              type="text"
              name="address"
              value={extraFields.address || ""}
              onChange={handleFieldChange}
            />
            <label htmlFor="cuisine">Cuisine</label>
            <input
              type="text"
              name="cuisine"
              value={extraFields.cuisine || ""}
              onChange={handleFieldChange}
            />
          </>
        );
      case "place":
        return (
          <>
            <label htmlFor="location">Location</label>
            <input
              className="selection"
              type="text"
              name="location"
              value={extraFields.location || ""}
              onChange={handleFieldChange}
            />
          </>
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
      <div className="titleContainer">
        <div className="mainTitle">
          <h2>Edit your Post!</h2>
        </div>
      </div>
      <form
        className="writeForm"
        encType="multipart/form-data"
        onSubmit={handleEdit}
      >
        <div className="topContainer">
          <label htmlFor="title">Title</label>
          <input
            className="writeTitle"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="desc">Description</label>
          <textarea
            className="writeDesc"
            type="text"
            name="description"
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="category">Category</label>
          <select
            className="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="book">Book</option>
            <option value="movie">Movie</option>
            <option value="tv_show">TV Show</option>
            <option value="restaurant">Restaurant</option>
            <option value="place">Place</option>
          </select>
          {renderCategoryFields()}
        </div>
        <div className="imageContainer">
          <div className="imageUpload">
            {!image && (
              <div className="imageText">
                <p>Please upload an image before submitting your post!</p>
              </div>
            )}
            <input
              className="chooseBtn"
              type="file"
              name="image"
              accept=".jpeg, .png, .jpg"
              onChange={handleImage}
            />
          </div>
          <div className="image">
            <div className="no_image">
              {!image && (
                <img src="https://images.unsplash.com/photo-1569690681342-d74eb25436fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjk0fHxpbWFnZSUyMHBsYWNlaG9sZGVyfGVufDB8fDB8fHww" />
              )}
              {image && <img src={image} className="uploaded_image" />}
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <button
            className="btn submitButton"
            type="submit"
            disabled={!title || !description || !image || !category}
            onSubmit={handleEdit}
          >
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 7rem);
  overflow: auto;
  padding: 1rem; 

  .titleContainer {
    color: var(--clr-primary-4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }

  .writeForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2)
      ),
      url(https://images.unsplash.com/photo-1634655511368-6cd7213719f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D);
    padding: 2rem;
    border-radius: var(--radius);
    max-width: 600px; 
    width: 100%; 
  }

  .topContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    width: 100%; 
  }

  .topContainer label {
    font-size: 1.5rem;
    color: var(--clr-primary-4);
  }

  .writeTitle {
    width: 100%; 
    max-width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
    border: 2px solid var(--clr-primary-4);
    padding: 0.5rem;
  }

  .writeDesc {
    border: 2px solid var(--clr-primary-4);
    width: 100%; /* Full width */
    max-width: 100%; /* Avoid overflow */
    height: 10rem;
    margin-bottom: 2rem;
    resize: none;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: var(--clr-primary-1);
    color: var(--clr-primary-4);
  }
  
  .writeDesc:focus {
    outline: 2px solid var(--clr-brown);
  }

  input, select {
    background-color: var(--clr-primary-1);
    border: 2px solid var(--clr-primary-4);
    color: var(--clr-primary-4);
    font-size: 1.2rem;
    width: 100%;
    max-width: 100%; 
  }

  input:focus, select:focus {
    outline: 2px solid var(--clr-primary-4);
  }

  .category {
    padding: 0.5rem;
    background-color: var(--clr-primary-1);
    border: 2px solid var(--clr-primary-4);
    border-radius: 0.5rem;
    color: var(--clr-brown);
    font-size: 1.2rem;
    height: 3rem;
    margin-bottom: 1rem;
  }

  .imageContainer {
    display: flex;
    flex-direction: row; 
    align-items: center;
    margin: 2rem auto;
    width: 100%;
  }

  .imageUpload {
    border: 2px dashed var(--clr-primary-4);
    padding: 1.5rem;
    border-radius: 0.5rem;
    text-align: center;
    background-color: var(--clr-primary-white);
    transition: border-color 0.3s;
    width: 100%;
    max-width: 300px; 
  }

  .imageUpload:hover {
    border-color: var(--clr-primary-4);
  }

  .imageText p {
    color: var(--clr-white);
    font-size: 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .image {
    margin: 2rem;
  }

  .no_image {
    width: 100%;
    max-width: 150px; 
    height: auto; 
    background-color: var(--clr-white);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.3rem;
    box-shadow: var(--light-shadow);
  }

  img {
    width: 100%; /* Full width */
    height: auto; /* Maintain aspect ratio */
    border-radius: 0.2rem;
  }

  .chooseBtn {
    background: var(--clr-primary-4);
    color: var(--clr-white);
    width: 100%;
    max-width: 200px; 
    display: inline-block;
    padding: 1.2rem;
    border: none
    text-align: center;
    font-size: 1rem;
  }

  .buttonContainer {
    padding-bottom: 2rem;
    width: 100%;
    max-width: 300px; 
  }



  @media screen and (max-width: 800px) {
    .writeForm {
      padding: 1rem;
    }

    .writeTitle, .writeDesc, .category {
      width: 100%; /* Full width */
    }

    .imageUpload {
      max-width: 100%; /* Full width on small screens */
    }

    .no_image {
      max-width: 100%; /* Full width */
      height: auto; /* Maintain aspect ratio */
    }

    .chooseBtn {
      max-width: 100%; /* Full width */
    }

    .submitButton {
      width: 100%; /* Full width */
    }
  }

  @media screen and (max-width: 480px) {

    .writeTitle, .writeDesc {
      font-size: 1rem; /* Smaller font size */
    }

    .category, .chooseBtn, .submitButton {
      font-size: 0.9rem; /* Smaller font size */
    }
  }
`;

export default EditPost;
