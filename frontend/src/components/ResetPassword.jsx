import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/apiSlice";
import { MdLock } from "react-icons/md";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword({ token, newPassword }).unwrap();
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Wrapper>
      <div className="card">
        <div className="iconWrap">
          <MdLock className="topIcon" />
        </div>
        <h3>Reset Password</h3>
        <p className="subtitle">Choose a strong new password for your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="newPassword">New password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mismatch">Passwords do not match</p>
            )}
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 6rem);
  padding: 2rem;
  background: var(--clr-primary-1);

  .card {
    background: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    padding: 3rem 2.5rem;
    width: 100%;
    max-width: 420px;
    text-align: center;
  }

  .iconWrap {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--clr-secondary-2), var(--clr-secondary-3));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }

  .topIcon {
    font-size: 2rem;
    color: #fff;
  }

  h3 {
    color: var(--clr-primary-4);
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #6b7280;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .inputGroup {
    text-align: left;
    margin-bottom: 1.25rem;
  }

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--clr-primary-4);
    margin-bottom: 0.4rem;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    background: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: var(--clr-primary-3);
    box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.15);
  }

  .mismatch {
    color: var(--clr-red);
    font-size: 0.82rem;
    margin-top: 0.4rem;
  }

  button {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.75rem;
    margin-top: 0.25rem;
    background: linear-gradient(135deg, var(--clr-secondary-2), var(--clr-secondary-3));
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  button:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--clr-secondary-2), var(--clr-secondary-3));
    opacity: 0.88;
    transform: translateY(-1px);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media screen and (max-width: 480px) {
    .card {
      padding: 2rem 1.5rem;
    }
  }
`;

export default ResetPassword;
