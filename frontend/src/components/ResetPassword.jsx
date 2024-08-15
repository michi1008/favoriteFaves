import React, { useState } from 'react';
import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '../slices/apiSlice';
import Spinner from '../components/Spinner';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  console.log("Reset Password Token:", token); 

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await resetPassword({ token, newPassword }).unwrap();
      toast.success('Password reset successful');
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
        <form onSubmit={handleSubmit}>
      <h3 className="resetPassword">Reset Password</h3>
      <p>Token: {token}</p>
      <input
        type="password"
        className="resetPasswordForm"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        className="resetPasswordForm"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
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

h3{
color: var(--clr-primary-4);
}

.resetPasswordForm {
    width: 60%;
    margin: 1rem 0;
}
`

export default ResetPassword;
