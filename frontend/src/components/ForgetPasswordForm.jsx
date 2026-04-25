import React, { useState } from 'react';
import styled from "styled-components";
import { useForgetPasswordMutation } from '../slices/apiSlice';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword({ email }).unwrap();
      setMessage(response.message);
    } catch (err) {
      setMessage(err?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Wrapper>
      <div className="forgetPassword">
        <h3>Forget Password</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="forgetPasswordForm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      {message && <p className="message">👉 {message}</p>}
    </Wrapper>
  );
};



const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh - 5rem);


  h3 {
    color: var(--clr-primary-4);
  }

  .forgetPasswordForm {
    margin : 2rem 0;
  }
  
  .forgetPasswordForm::placeholder {
    color: var(--clr-primary-4);
  }
  
  .forgetPasswordForm:focus {
  outline: none;
  border-color: var(--clr-primary-4);
  box-shadow: var(--dark-shadow);
}
  
  .message {
    margin: 1rem 0;
  }
`

export default ForgetPasswordForm;
