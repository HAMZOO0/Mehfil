import mongoose, { Schema } from "mongoose";

const like_Schema = new Schema(
  {
    comment: {
      type: Schema.Types.ObjectId, // one who is follow someone
      ref: "Comment",
    },

    post: {
      type: Schema.Types.ObjectId, // one to  whom got follow
      ref: "Post",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", like_Schema);
