import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Attempting to authenticate user with email:", email);

  const user = await User.findOne({ email });
  console.log("User found:", user);

  if (user) {
    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (isMatch) {
      generateToken(res, user._id);

      console.log("User authenticated successfully");

      return res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }

  console.log("Authentication failed");

  res.status(401).json({ message: "Invalid email or password" });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    userName,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Function to log environment variables for debugging
const logEnvVariables = () => {
  console.log("Email:", process.env.EMAIL);
  console.log("App Password:", process.env.PASSWORD_APP_EMAIL);
  console.log("JWT Secret:", process.env.JWT_SECRET);
};

export const forgetPassword = asyncHandler(async (req, res) => {
  try {
    logEnvVariables();
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
      secure: true, // Use TLS
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="https://favoritefaves.onrender.com/reset-password/${token}">https://favoritefaves.onrender.com/reset-password/${token}</a>
        <p>The link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Email configuration
    /* const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Reset Password",
          html: `<h1>Reset Your Password</h1>
            <p>Click on the following link to reset your password:</p>
            <a href="http://localhost:3000/reset-password/${token}">http://localhost:3000//reset-password/${token}</a>
            <p>The link will expire in 10 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>`,
        }; */

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    console.error("Error in forgetPassword:", err);
    res.status(500).send({ message: err.message });
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);

    // Find the user with the id from the token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      decodedToken.userId,
      { password: req.body.newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).send({ message: "Failed to update password" });
    }

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: err.message });
  }
});
