import mongoose, { mongo, Mongoose, Schema, SchemaTypes } from "mongoose";
// import mongoose_aggregate_paginate from "mongoose-aggregate-paginate-v2";

const comment_schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// comment_schema.plugin(mongoose_aggregate_paginate);

export const Comment = mongoose.model("Comment", comment_schema);
