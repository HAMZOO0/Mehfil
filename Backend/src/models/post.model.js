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
      _id: false,
      type: {
        url: {
          type: String,
        },
        field_id: {
          type: String,
        },
      },
    },
    video: {
      _id: false,
      type: {
        url: {
          type: String,
        },
        field_id: {
          type: String,
        },
      },
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", post_schema);
