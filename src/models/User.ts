import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    phoneNumber: {
      type: String,
      min: 8,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.User || mongoose.model("User", UserSchema);