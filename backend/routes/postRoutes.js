import express from "express";
const router = express.Router();
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  createComment,
  getPostsByUser,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getPosts).post(protect, createPost);
router.route('/:id/comments').post(protect, checkObjectId, createComment);
router.route("/:id").get(checkObjectId, getPostById);
router.route("/userPosts/:id").get(checkObjectId, getPostsByUser);
router.route("/userPosts/:id/edit").put(checkObjectId, updatePost)
router.route("/:id").delete(protect, checkObjectId, deletePost)
export default router;
