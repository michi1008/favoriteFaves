import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    if (userInfo) navigate(redirect);
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

  if (isLoading) return <Spinner />;

  return (
    <Wrapper>
      <div className="panel imageSide">
        <img
          src="https://images.unsplash.com/photo-1513909894411-7d7e04c28ecd?w=800&auto=format&fit=crop&q=60"
          alt=""
        />
        <div className="imageOverlay">
          <h2>Welcome back</h2>
          <p>Log in to see what your friends are loving.</p>
        </div>
      </div>

      <div className="panel formSide">
        <div className="card">
          <h2 className="cardTitle">Log in</h2>
          <p className="cardSub">
            Don't have an account?{" "}
            <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
              Sign up
            </Link>
          </p>

          <form onSubmit={submitHandler}>
            <div className="fieldGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="fieldGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgotRow">
              <Link to="/forget-password">Forgot password?</Link>
            </div>

            <button type="submit" disabled={isLoading} className="submitBtn">
              Log in
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  min-height: 100vh;

  .panel {
    flex: 1;
  }

  .imageSide {
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .imageOverlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(29, 53, 87, 0.85) 40%, transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;

    h2 {
      color: var(--clr-white);
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
      margin: 0;
    }
  }

  .formSide {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: var(--clr-primary-1);
  }

  .card {
    width: 100%;
    max-width: 420px;
    background: var(--clr-white);
    border-radius: 1.25rem;
    box-shadow: var(--dark-shadow);
    padding: 2.5rem;
  }

  .cardTitle {
    color: var(--clr-primary-4);
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .cardSub {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 1.75rem;

    a {
      color: var(--clr-secondary-3);
      font-weight: 600;
    }
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
      width: 100%;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: var(--clr-primary-3);
        box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.15);
      }
    }
  }

  .forgotRow {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.25rem;

    a {
      font-size: 0.82rem;
      color: var(--clr-primary-3);
      font-weight: 600;

      &:hover {
        color: var(--clr-secondary-3);
      }
    }
  }

  .submitBtn {
    width: 100%;
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

  @media screen and (max-width: 768px) {
    flex-direction: column;

    .imageSide {
      height: 220px;
      flex: none;
    }

    .formSide {
      flex: 1;
    }

    .card {
      box-shadow: none;
      padding: 2rem 1.25rem;
    }
  }
`;

export default Login;
