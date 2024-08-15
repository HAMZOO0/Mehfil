import mongoose, { mongo, Mongoose, Schema, SchemaTypes } from "mongoose";

const bookmark_schema = new Schema(
  {
    name: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },

    description: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export const Bookmark = mongoose.model("Bookmark", bookmark_schema);
