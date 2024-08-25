import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Spinner from "../components/Spinner";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
        <div className="loginImg">
          <img src="https://images.unsplash.com/photo-1513909894411-7d7e04c28ecd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjcyfHxhYnN0cmFjdHxlbnwwfHwwfHx8MA%3D%3D" />
        </div>
       
        <form className="loginForm" onSubmit={submitHandler}>
          <h2 className="loginTitle">Login</h2>
          <label>Email</label>
          <input
            type="email"
            className="loginInput"
            placeholder="Enter your email..."
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your password..."
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btnContainer">
            <button className="btn loginBtn" type="submit" disabled={isLoading}>
              Login
            </button>
            <button className="btn loginSignupBtn">
              <Link to={redirect ? `/signup?redirect=${redirect}`:"/signup"}>
                Signup
              </Link>
            </button>
          </div>
          <div className="forgetPassword">
            <Link to="/forget-password" className="forgotPasswordLink">
            Forgot Password?
          </Link>
          </div>
        </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 2rem;
  background: linear-gradient(135deg, var(--clr-primary-1), var(--clr-primary-1));
  min-height: 100vh;
  box-sizing: border-box;

  .loginImg {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    min-width: 300px;
  }

  .loginImg img {
    width: 100%;
    height: auto;
    max-height: 35rem;
    border-radius: 8px;
    object-fit: cover;
  }

  .loginForm {
    flex: 2;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
  }

  .loginTitle {
    font-size: 2.5rem;
    color: var(--clr-primary-4);
    margin-bottom: 1rem;
  }

  label {
    margin: 1rem 0 0.5rem;
    color: var(--clr-primary-4);
    font-size: 1.1rem;
    align-self: flex-start;
  }

  .loginInput {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    background-color: var(--clr-primary-1);
    border-radius: 5px;
    font-size: 1rem;
    box-shadow: var(--dark-shadow);
  }

  .loginInput::placeholder {
    color: var(--clr-primary-4);
  }

  .loginInput:focus {
    outline: none;
    border-color: var(--clr-brown);
    box-shadow: var(--dark-shadow);
  }

  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

    .loginSignupBtn {
    background: linear-gradient(
      135deg,
      var(--clr-secondary-4),
      var(--clr-secondary-3)
    );
  }

  .loginSignupBtn:hover {
    background: linear-gradient(
      135deg,
      var(--clr-primary-4),
      var(--clr-primary-3)
    );
    color: var(--clr-white);
  }

  .forgetPassword {
    margin: 2rem 0;
  }

  .forgotPasswordLink {
    color: var(--clr-primary-4);
    font-size: 1.2rem;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    .loginImg {
      width: 100%;
      margin-bottom: 1rem;
      height: 10rem;
    }

    .loginImg img {
    width: 100%;
    max-height: 15rem;
    border-radius: 8px;
    object-fit: cover;
  }

    .loginForm {
      width: 100%;
      padding: 1.5rem;
    }

    .btnContainer {
      flex-direction: column;
      align-items: center;
    }

    .loginBtn,
    .loginSignupBtn {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;

export default Login;
