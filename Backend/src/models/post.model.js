import mongoose, { Schema } from "mongoose";

const post_schema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    is_publish: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    post_img: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", post_schema);
