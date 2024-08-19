import React from "react";
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import ResetPassword from "./components/ResetPassword";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import SinglePostPage from "./pages/SinglePostPage";
import UserPosts from "./pages/UserPosts";
import store from './store';
import { Provider } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path="/category/:category/search/:keyword/page/:pageNumber" element={<CategoryPage />} />
      <Route path="/category/:category/search/:keyword" element={<CategoryPage />} />
      <Route path="/category/:category/page/:pageNumber" element={<CategoryPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/forget-password" element={<ForgetPasswordForm />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path='/posts/:postId' element={<SinglePostPage />} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/create' element={<NewPost />} />
        <Route path='/posts/userPosts/:postId/edit' element={<EditPost />} />
        <Route path='/posts/userPosts/:userId' element={<UserPosts />} />
        <Route path='/posts/userPosts/:userId/page/:pageNumber' element={<UserPosts />} />
        <Route path='/posts/userPosts/:userId/search/:keyword/page/:pageNumber'element={<UserPosts />}/>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
