import mongoose, { Schema } from "mongoose";

const follow_Schema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId, // one who is follow someone
      ref: "User",
    },

    following: {
      type: Schema.Types.ObjectId, // one to  whom got follow
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Follow = mongoose.model("Follow", follow_Schema);
