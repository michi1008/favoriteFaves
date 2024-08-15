import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { useForgetPasswordMutation } from '../slices/apiSlice';
import { setCredentials } from '../slices/authSlice';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [forgetPassword] = useForgetPasswordMutation();

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
      <form onSubmit={handleSubmit}>
      <h3 className="forgetPassword">Forget Password</h3>
      <input
        type="email"
        className="forgetPasswordForm"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
      {message && <p className="message">👉 {message}</p>}
    </form>
    </Wrapper>
    
  );
};


const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh-5rem);

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
  border-color: var(--clr-brown);
  box-shadow: var(--dark-shadow);
}
  
  .message {
    margin: 1rem 0;
  }
`

export default ForgetPasswordForm;
