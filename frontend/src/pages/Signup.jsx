import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const isPasswordStrong = (password) => {
    // Define the criteria for password strength
    const minLength = 8; // Minimum length
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const digitRegex = /[0-9]/; // At least one digit
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // At least one special character

    // Check if the password meets all criteria
    return (
      password.length >= minLength &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (!isPasswordStrong(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
    } else {
      try {
        const res = await register({ userName, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className="signupImg">
        <img
          src="https://images.unsplash.com/photo-1532965119518-c0450e1bb4da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjg0fHxhYnN0cmFjdHxlbnwwfHwwfHx8MA%3D%3D"
          alt="abstruct"
        />
      </div>
      <form className="signupForm" onSubmit={submitHandler}>
        <div className="signupTitle">
          <h2>Ready to start share your favoirtes?</h2>
        </div>
        <label>Username</label>
        <input
          type="text"
          className="signupInput"
          id="userName"
          name="userName"
          value={userName}
          placeholder="Enter your name..."
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          className="signupInput"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="signupInput"
          placeholder="Enter your password..."
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          className="signupInput"
          placeholder="Confirm your password..."
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="btnContainer">
          <button className="signupBtn" type="submit" disabled={isLoading}>
            Sign up
          </button>
          <button className="signupLoginBtn">
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--clr-primary-1),
    var(--clr-primary-1)
  );
  min-height: 100vh;

  .signupImg,
  .signupForm {
    flex: 1;
  }

  .signupImg {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    min-width: 300px;
  }

  .signupImg img {
    width: 100%;
    height: 12rem;
    border-radius: 8px;
  }

  .signupForm {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    max-width: 600px;
    min-height: 100%;
  }

  input:focus {
    outline: 2px solid var(--clr-brown);
  }

  .signupTitle {
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

  .signupInput {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    background-color: var(--clr-primary-1);
    border-radius: 5px;
    font-size: 1rem;
    box-shadow: var(--dark-shadow);
  }

  .signupInput::placeholder {
    color: var(--clr-primary-4);
  }

  .signupInput:focus {
    outline: none;
    border-color: var(--clr-brown);
    box-shadow: var(--dark-shadow);
  }

  .btnContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .signupLoginBtn {
    background: linear-gradient(
      135deg,
      var(--clr-secondary-4),
      var(--clr-secondary-3)
    );
  }

  .signupLoginBtn:hover {
    background: linear-gradient(
      135deg,
      var(--clr-primary-4),
      var(--clr-primary-3)
    );
    color: var(--clr-white);
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    .signupImg {
      width: 100%;
      margin-bottom: 1rem;
    }

    .signupForm {
      width: 100%;
      padding: 1.5rem;
    }

    .btnContainer {
      flex-direction: column;
      align-items: center;
    }

    .signupBtn,
    .signupLoginBtn {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;

export default Signup;
