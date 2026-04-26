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
        const res = await updateProfile({ userName, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const initials = userName
    ? userName.slice(0, 2).toUpperCase()
    : "??";

  return (
    <Wrapper>
      <div className="card">
        <div className="avatarSection">
          <div className="avatar">{initials}</div>
          <h2 className="displayName">{userName}</h2>
          <p className="displayEmail">{email}</p>
        </div>

        <div className="divider" />

        <form onSubmit={submitHandler}>
          <h3 className="sectionTitle">Edit Profile</h3>

          <div className="fieldGroup">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="fieldGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="divider" />

          <h3 className="sectionTitle">Change Password</h3>
          <p className="sectionHint">Leave blank to keep your current password</p>

          <div className="fieldGroup">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="fieldGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && password !== confirmPassword && (
              <span className="mismatch">Passwords do not match</span>
            )}
          </div>

          <button type="submit" disabled={loadingUpdateProfile}>
            {loadingUpdateProfile ? <Spinner /> : "Save Changes"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: calc(100vh - 7rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .card {
    background: var(--clr-white);
    border-radius: 1.25rem;
    box-shadow: var(--dark-shadow);
    padding: 2.5rem;
    width: 100%;
    max-width: 480px;
  }

  .avatarSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--clr-primary-4), var(--clr-primary-3));
    color: var(--clr-white);
    font-size: 1.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .displayName {
    color: var(--clr-primary-4);
    font-size: 1.3rem;
    margin: 0;
  }

  .displayEmail {
    color: var(--clr-primary-3);
    font-size: 0.9rem;
    margin: 0;
  }

  .divider {
    height: 1px;
    background: #e5e7eb;
    margin: 1.5rem 0;
  }

  .sectionTitle {
    font-size: 1rem;
    font-weight: 700;
    color: var(--clr-primary-4);
    margin-bottom: 0.25rem;
  }

  .sectionHint {
    font-size: 0.82rem;
    color: #9ca3af;
    margin-bottom: 1rem;
  }

  .fieldGroup {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 1.1rem;

    label {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--clr-primary-4);
      text-transform: uppercase;
      letter-spacing: 0.04rem;
    }

    input {
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      color: var(--clr-primary-4);
      background: var(--clr-primary-1);
      transition: border-color 0.2s;
      width: 100%;

      &:focus {
        outline: none;
        border-color: var(--clr-primary-3);
      }
    }
  }

  .mismatch {
    font-size: 0.8rem;
    color: var(--clr-red);
  }

  button {
    width: 100%;
    margin-top: 1rem;
    padding: 0.85rem;
    background: linear-gradient(135deg, var(--clr-primary-4), var(--clr-primary-3));
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
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

export default Profile;
