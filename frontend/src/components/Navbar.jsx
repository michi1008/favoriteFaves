import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { LuMenuSquare } from "react-icons/lu";
import cancel from "../assets/cancel.png";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <nav>
        <div className="title">
          <h3>Favorite Faves</h3>
        </div>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <div className="icon"><img src={cancel} alt="cancel" /></div>
          ) : (
            <div className="icon"><LuMenuSquare /></div>
          )}
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li className="navName">
            <NavLink to="/">Home</NavLink>
            <div className="underline"></div>
          </li>
          {userInfo && (
            <li className="navName">
              <NavLink to="/create">Create</NavLink>
              <div className="underline"></div>
            </li>
          )}
          {userInfo && (
            <li className="navName">
              <NavLink to={`/profile/${userInfo._id}`}>Profile</NavLink>
              <div className="underline"></div>
            </li>
          )}
          {userInfo && (
            <li className="navUser">
              <NavLink to={`posts/userPosts/${userInfo._id}`}>
                  {userInfo.userName}'s Posts
              </NavLink>
              <div className="underline"></div>
            </li>
          )}
          {!userInfo && (
            <>
              <li className="navName">
                <NavLink to="/login">Login</NavLink>
                <div className="underline"></div>
              </li>
              <li className="navName">
                <NavLink to="/signup">Signup</NavLink>
                <div className="underline"></div>
              </li>
            </>
          )}
          {userInfo && (
            <li onClick={handleLogout}>
              <div className="logout"><IoMdLogOut /></div>
            </li>
          )}
        </ul>
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--clr-primary-4);
    position: sticky;
    top: 0;
    height: 6rem;
    padding: 0 2rem;
    z-index: 200;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  }

  nav .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(90deg, var(--clr-secondary-1), var(--clr-secondary-2), var(--clr-secondary-3), var(--clr-secondary-4));
    -webkit-background-clip: text;
    color: transparent;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: -0.02em;
  }

  .navName {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin: 0 0.25rem;
  }

  .navName a {
    text-decoration: none;
    color: var(--clr-primary-4);
    font-size: 1rem;
    font-weight: 500;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    transition: color 0.2s ease;
  }

  .navName a:hover,
  .navName a.active {
    color: var(--clr-secondary-3);
  }

  .navName .underline {
    content: '';
    position: absolute;
    bottom: -0.4rem;
    left: 50%;
    transform: translateX(-50%);
    height: 0.18rem;
    width: 0%;
    border-radius: 1rem;
    transition: width 0.25s ease-in-out;
  }

  .navName:hover .underline {
    width: 80%;
    background: linear-gradient(90deg, var(--clr-secondary-2), var(--clr-secondary-3), var(--clr-secondary-4));
  }

  nav ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }

  nav ul li {
    list-style: none;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  nav ul li a {
    display: block;
    text-decoration: none;
    color: var(--clr-primary-4);
    font-size: 1rem;
    font-weight: 500;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    position: relative;
    transition: color 0.2s ease;
  }

  nav ul li a:hover {
    color: var(--clr-secondary-4);
  }

  .navUser a {
    color: var(--clr-secondary-3);
    font-weight: 600;
  }

  nav .menu {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: var(--clr-primary-4);
    cursor: pointer;
  }

  .logout {
    cursor: pointer;
    font-size: 1.8rem;
    color: var(--clr-primary-3);
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border-radius: 0.5rem;
    transition: color 0.2s ease;
  }

  .logout:hover {
    color: var(--clr-red);
  }

  @media screen and (max-width: 1120px) {
    nav .menu {
      display: block;
    }

    nav {
      flex-direction: column;
      height: auto;
      padding: 1rem 2rem;
      width: 100%;
      gap: 0.5rem;
    }

    nav ul {
      display: none;
      width: 100%;
    }

    nav ul.open {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.98);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 0.75rem;
      width: 70%;
      padding: 1rem;
      gap: 0.25rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    nav ul li {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    nav ul li a {
      font-size: 1.1rem;
      padding: 0.6rem 1rem;
      width: 100%;
      text-align: center;
    }

    .navName:hover .underline {
      width: 30%;
    }

    .icon {
      margin-top: 0.25rem;
    }
  }
`;


export default Navbar;
