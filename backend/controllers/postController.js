import asyncHandler from "../middleware/asyncHandler.js";
import {
  Post,
  BookPost,
  MoviePost,
  TvShowPost,
  RestaurantPost,
  PlacePost,
} from "../models/Post.js";
import User from "../models/User.js";

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    author,
    genre,
    director,
    network,
    address,
    cuisine,
    location,
    image,
  } = req.body;

  if (!title || !category) {
    res.status(400);
    throw new Error("Please add all required values");
  }

  let post;

  switch (category) {
    case "book":
      post = await BookPost.create({
        title,
        description,
        image,
        author,
        genre,
        comments: [],
        user: req.user._id,
      });
      break;
    case "movie":
      post = await MoviePost.create({
        title,
        description,
        image,
        director,
        genre,
        comments: [],
        user: req.user._id,
      });
      break;
    case "tv_show":
      post = await TvShowPost.create({
        title,
        description,
        image,
        network,
        genre,
        comments: [],
        user: req.user._id,
      });
      break;
    case "restaurant":
      post = await RestaurantPost.create({
        title,
        description,
        image,
        address,
        cuisine,
        comments: [],
        user: req.user._id,
      });
      break;
    case "place":
      post = await PlacePost.create({
        title,
        description,
        image,
        location,
        comments: [],
        user: req.user._id,
      });
      break;
    default:
      res.status(400);
      throw new Error("Invalid category");
  }

  res.status(201).json(post);
});

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const { keyword, pageNumber, category, sortBy } = req.query;
  console.log("Query Params:", req.query);
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(pageNumber) || 1;

  const query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  let sort = {};
  if (sortBy) {
    if (sortBy === "nameAZ") {
      sort = { title: 1 }; // Sort by name in ascending order
    } else if (sortBy === "nameZA") {
      sort = { title: -1 };
      // Sort by name in descending order
    }
  }

  const count = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sort)
    .populate("user", "userName")
    .exec();

  res.status(200).json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", "userName");
  if (post) {
    return res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export const getPostsByUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { keyword, pageNumber, category } = req.query;
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(pageNumber) || 1;

  const query = { user: id };

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const count = await Post.countDocuments(query);
  if (!req.params.id) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userPosts = await Post.find(query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("user", "userName")
    .exec();

  res.status(200).json({ userPosts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne({ _id: post._id });
    res.json({ message: "post removed" });
  } else {
    res.status(404);
    throw new Error("post not found");
  }
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    author,
    genre,
    director,
    network,
    seasons,
    address,
    cuisine,
    location,
    image,
  } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.category === "book") {
      post.title = title || post.title;
      post.description = description || post.description;
      post.image = image || post.image;
      post.author = author || post.author;
      post.genre = genre || post.genre;
    } else if (post.category === "movie") {
      post.title = title || post.title;
      post.description = description || post.description;
      post.image = image || post.image;
      post.director = director || post.director;
      post.genre = genre || post.genre;
    } else if (post.category === "tv_show") {
      post.title = title || post.title;
      post.description = description || post.description;
      post.image = image || post.image;
      post.network = network || post.network;
      post.seasons = seasons || post.seasons;
    } else if (post.category === "restaurant") {
      post.title = title || post.title;
      post.description = description || post.description;
      post.image = image || post.image;
      post.address = address || post.address;
      post.cuisine = cuisine || post.cuisine;
      post.image = image || post.image;
    } else if (post.category === "place") {
      post.title = title || post.title;
      post.description = description || post.description;
      post.image = image || post.image;
      post.location = location || post.location;
      post.image = image || post.image;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Create new comment
// @route   POST /api/posts/:id/comments
// @access  Private
export const createComment = asyncHandler(async (req, res) => {
  const { comment: commentText, parentCommentId } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    const user = await User.findById(req.user._id).select("userName");

    if (parentCommentId) {
      const parentComment = post.comments.find(
        (comment) => comment._id.toString() === parentCommentId
      );
      if (parentComment) {
        parentComment.replies.push({
          comment: commentText,
          user: req.user._id,
          userName: user.userName,
        });
      } else {
        res.status(404);
        throw new Error("Parent comment not found");
      }
    } else {
      post.comments.push({
        comment: commentText,
        user: req.user._id,
        userName: user.userName,
      });
    }

    await post.save();
    res.status(201).json({ message: "Comment added" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
