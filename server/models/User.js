import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "investigator", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
