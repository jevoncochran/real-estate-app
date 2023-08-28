import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 6,
    },
    country: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      min: 25,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sqmeters: {
      type: Number,
      required: true,
      min: 15,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Property ||
  mongoose.model("Property", PropertySchema);
