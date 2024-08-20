import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const user_schema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    Full_name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      _id: false,
      type: {
        field_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      required: true, // Add this line
    },
    bio: {
      type: String,
    },

    links: {
      type: String,
    },
    password: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
  },
  { timestamps: true }
);

//enctypt password
// genrate access token
// genrate refersh token
// user_schema defines the structure and behavior of the User documents in your MongoDB database. The pre-save middleware is directly related to how User documents should behave when being saved. Specifically, it defines what should happen to the password field before the document is saved.

user_schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

user_schema.methods.is_password_currect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

user_schema.methods.genrate_access_token = function () {
  return jwt.sign(
    {
      _id: this._id,
      Email: this.Email,
      user_name: this.user_name,
      Full_name: this.Full_name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

user_schema.methods.genrate_refresh_token = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", user_schema);
