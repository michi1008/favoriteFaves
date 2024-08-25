import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.userName);
    setEmail(userInfo.email);
  }, [userInfo.userName, userInfo.email]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          userName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Wrapper>
      <div className="profilContainer">
        <div className="profileImg">
          <img src="https://images.unsplash.com/photo-1561211974-8a2737b4dcac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjg2fHxhYnN0cmFjdHxlbnwwfHwwfHx8MA%3D%3D" alt="abstruct" />
        </div>
        <div className="profile">
          <h2 className="profileTitle">User Profile</h2>
          <form className="Form" onSubmit={submitHandler}>
            <div className="formItem">
              <label>userName</label>
              <input
                type="text"
                placeholder="Enter your name..."
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email..."
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password..."
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Password Confirm</label>
              <input
                type="password"
                placeholder="Confirm your password..."
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="profileBtnContainer">
              <button type="submit">Update</button>
            </div>
            {loadingUpdateProfile && <Spinner />}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  /* main */
  .profileContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin: 3rem;
  }

  .profileImg {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 20rem;
  }

  .profileImg img {
    width: 80%;
    height: 20rem;
    border-radius: 1rem;
    padding: 2rem;
  }

  /* profile */
  .profile {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  .profileTitle {
    color: var(--clr-primary-4);
    margin: 2rem;
    font-size: 2.5rem;
  }

  .profileBtnContainer {
    padding-top: 2rem;
  }

  .formItem {
    margin-bottom: 2rem;
  }

  .formItem label {
    font-size: 1.2rem;
    color: var(--clr-primary-4);
  }

  input::placeholder {
    color: var(--clr-primary-4);
    opacity: 1;
  }

  input {
    color: var(--clr-primary-4);
  }

  input:focus {
    outline: 2px solid var(--clr-brown);
  }

  @media (max-width: 1200px) {
    .profile-container {
      width: 90%;
      height: auto;
      flex-direction: column;
    }
  }
`;
export default Profile;
