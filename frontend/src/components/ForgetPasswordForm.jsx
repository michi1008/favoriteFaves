import React, { useState } from 'react';
import styled from "styled-components";
import { useForgetPasswordMutation } from '../slices/apiSlice';
import { MdEmail, MdCheckCircle } from 'react-icons/md';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword({ email }).unwrap();
      setIsSuccess(true);
      setMessage(response.message);
    } catch (err) {
      setMessage(
        err?.data?.message || err?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <Wrapper>
      <div className="card">
        {isSuccess ? (
          <div className="successState">
            <MdCheckCircle className="successIcon" />
            <h3>Check your email!</h3>
            <p>We sent a password reset link to <strong>{email}</strong>. It expires in 10 minutes.</p>
          </div>
        ) : (
          <>
            <div className="iconWrap">
              <MdEmail className="topIcon" />
            </div>
            <h3>Forgot Password?</h3>
            <p className="subtitle">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {message && <p className="errorMsg">{message}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}
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

  button {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.75rem;
    margin-top: 0.5rem;
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

  .errorMsg {
    color: var(--clr-red);
    font-size: 0.88rem;
    margin-bottom: 0.75rem;
    text-align: left;
  }

  /* Success state */
  .successState {
    padding: 1rem 0;
  }

  .successIcon {
    font-size: 4rem;
    color: #22c55e;
    margin-bottom: 1rem;
  }

  .successState h3 {
    margin-bottom: 0.75rem;
  }

  .successState p {
    color: #6b7280;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  .successState strong {
    color: var(--clr-primary-4);
  }

  @media screen and (max-width: 480px) {
    .card {
      padding: 2rem 1.5rem;
    }
  }
`;

export default ForgetPasswordForm;
