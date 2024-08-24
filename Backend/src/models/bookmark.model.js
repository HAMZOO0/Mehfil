import mongoose, { Schema } from "mongoose";

const bookmark_schema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },

  { timestamps: true }
);

export const Bookmark = mongoose.model("Bookmark", bookmark_schema);
