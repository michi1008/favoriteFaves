import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation
} from "../slices/postsApiSlice";
import Spinner from "../components/Spinner";

const EditPost = () => {
  const { postId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const { data: post, isLoading, refetch, error } = useGetPostByIdQuery(postId);
  console.log(post)
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
            location: extraFields.location
        },
    }).unwrap();
    
    toast.success("Post updated");

    refetch()
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
      case 'book':
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
      case 'movie':
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
      case 'tv_show':
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
      case 'restaurant':
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
      case 'place':
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
              {!image && <img src="https://images.unsplash.com/photo-1569690681342-d74eb25436fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjk0fHxpbWFnZSUyMHBsYWNlaG9sZGVyfGVufDB8fDB8fHww" />}
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

  .titleContainer {
    color: var(--clr-primary-4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }

  .writeImg {
    width: 30vw;
    height: 25vh;
    border-radius: 0.3rem;
    object-fit: cover;
    margin: 2rem;
    box-shadow: var(--light-shadow);
    margin: 0 auto;
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
      url(https://images.unsplash.com/photo-1644356217222-8bd41b00104f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzgzfHxhYnN0cmFjdHxlbnwwfHwwfHx8MA%3D%3D);
    padding: 2rem;
    border-radius: var(--radius);
  }

  .topContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
  }

  .topContainer label {
    font-size: 1.5rem;
    color: var(--clr-white);
  }

  .writeTitle {
    width: 15rem;
    height: 3rem;
    margin-bottom: 2rem;
    border: 2px solid var(--clr-primary-1);
  }

  .writeDesc {
    border: 2px solid var(--clr-primary-1);
  width: 22rem;
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

  input {
    background-color: var(--clr-primary-1);
    color: var(--clr-primary-4);
    font-size: 1.2rem;
  }

  input:focus {
    outline: 2px solid var(--clr-brown);
  }

  // category

  .category {
    padding: 0.5rem;
    background-color: var(--clr-primary-1);
    border: 2px solid var(--clr-primary-1);
    border-radius: 0.5rem;
    color: var(--clr-brown);
    font-size: 1.2rem;
    height: 3rem;
    margin-bottom: 1rem;
  }

  .category:focus {
    outline: 2px solid var(--clr-brown);
  }

  .selection {
    margin-bottom: 1rem;
  }

  //image

  .imageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 2rem auto;
  }

  .imageUpload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    width: 8rem;
    height: 8rem;
  }

  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
  }

  .chooseBtn {
    background: var(--clr-brown);
    color: var(--clr-white);
    width: 16rem;
    display: inline-block;
    padding: 1.2rem, 1.2rem;
    border: 1px solid var(--clr-primary-brown);
    text-align: center;
    font-size: 1rem;
  }

  .buttonContainer {
    align-self: flex-end;
    padding-bottom: 2rem;
  }

  // selection 
  .selection:focus {
  outline: 2px solid var(--clr-brown); 
}


  // Submit Button 

  .submitButton {
    color: var(--clr-primary-4);
    background-color: var(--clr-white);
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1.2rem;
    width: 7rem;
    text-align: center;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    .writeImg {
      width: 50vw;
      height: 25vh;
    }

    .mainTitle {
      font-size: 1.5rem;
    }

    .titleContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 2rem 0;
    }

    .topContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 2rem;
    }

    .topContainer label {
      font-size: 1rem;
    }

    .writeTitle {
      width: 20rem;
    }

    .writeDesc {
      width: 25rem;
    }

    .category {
      font-size: 1.2rem;
    }
  
    .submitButton {
      padding: 0.5rem;
      border-radius: 0.3rem;
      font-size: 0.8rem;
      width: 5rem;
      margin-botton: 2rem;
    }

    .imageContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-buttom: 3rem;
      margin-right: 2rem;
    }

    .imageText {
      font-size: 1rem;
      margin-bottom: 1rem;
      text-align: start;
    }

    .image {
      margin-bottom: 2rem;
      margin-left: 2rem;
    }

    .chooseBtn {
      width: 14rem;
      font-size: 0.8rem;
    }

    img {
      width: 8rem;
      height: 8rem;
      object-fit: cover;
    }

    .buttonContainer {
      align-self: flex-end;
      padding: 2rem;
    }
  }
`;
export default EditPost;
