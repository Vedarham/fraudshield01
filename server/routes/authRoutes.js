import express from 'express';
import User from '../models/User.js';

const router = express.Router();

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user)
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    console.log(bio)
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.bio = bio || user.bio;
    await user.save();
    res.json(user); 
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};
export default router;
