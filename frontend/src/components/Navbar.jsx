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
          <div className="underlineTitle"></div>
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
    padding: 2rem;
    z-index: 200;
  }

  nav .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--clr-primary-4);
  }

  .underlineTitle {
    background-color: var(--clr-primary-4);
    height: 0.3rem;
    width: 65%;
  }

  .navName {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin: 0 0.5rem;
  }

  .navName a {
    text-decoration: none;
    color: var(--clr-primary-4);
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  .navName .underline {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    height: 0.2rem;
    width: 0%;
    background-color: var(--clr-primary-4);
    transition: width 0.3s ease-in-out;
  }

  .navName:hover .underline {
    width: 100%;
    background-color: var(--clr-red);
  }

  nav ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    font-size: 1.2rem;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 0.5rem;
    position: relative;
  }

  nav ul li a:hover {
    color: var(--clr-red);
  }

  .navUser h4 {
    margin-top: 0.3rem;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0.5rem;
    line-height: 0;
    margin-bottom: 0;
  }

  nav .menu {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }

  nav .navUser h4 span {
    color: var(--clr-red);
  }

  .logout {
    cursor: pointer;
    font-size: 2rem;
  }

  .logout:hover {
    color: var(--clr-red);
  }

  @media screen and (max-width: 1120px) {
    nav .menu {
      display: block;
      cursor: pointer;
    }

    nav {
      flex-direction: column;
      height: 10rem;
      width: 100%;
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
      background-color: var(--clr-primary-2);
      width: 60%;
      padding: 1rem;
    }

    nav ul li {
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    nav ul li a {
      margin: 0 0.5rem;
    }

    .navName:hover .underline {
      width: 20%;
      background-color: var(--clr-primary-4);
    }

    nav .title h4 {
      font-size: 2rem;
    }

    .navUser h4 {
      font-size: 0.8rem;
      padding: 1rem;
    }

    .icon {
      margin-top: 0.5rem;
    }
  }
`;


export default Navbar;
