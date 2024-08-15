import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    userName: { type: String } ,
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', 
    },
    replies: [],
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['book', 'movie', 'TV show', 'restaurant', 'place'], 
  },
  image: {
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
}, {
  discriminatorKey: 'category', 
  timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

const bookSchema = new mongoose.Schema({
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema],
});

const movieSchema = new mongoose.Schema({
  director: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema],
});

const tvShowSchema = new mongoose.Schema({
  network: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema],
});

const restaurantSchema = new mongoose.Schema({
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema],
});

const placeSchema = new mongoose.Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema],
});

const BookPost = Post.discriminator('book', bookSchema);
const MoviePost = Post.discriminator('movie', movieSchema);
const TvShowPost = Post.discriminator('tv_show', tvShowSchema);
const RestaurantPost = Post.discriminator('restaurant', restaurantSchema);
const PlacePost = Post.discriminator('place', placeSchema);

export { Post, BookPost, MoviePost, TvShowPost, RestaurantPost, PlacePost };