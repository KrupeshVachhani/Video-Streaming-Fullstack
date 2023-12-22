import { required } from "joi";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url used
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url used
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

//never use arrow function here because arrow function doesn't have this keyword
//use normal function here
userSchema.pre("save", async function (next) {
  //check if password is not modified
  if (!this.isModified("password")) return next();

  //generate a salt
  const salt = await bcrypt.genSalt(10);
  //reassign the password to the hashed version
  this.password = await bcrypt.hash(this.password, salt);

  return next();
});

//check if password is correct
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generate a token
userSchema.models.generateTokens = function () {
  //generate a token
  jwt.sign(
    //payload
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    //secret
    process.env.ACCESS_TOKEN_SECRETE,
    //options
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};
userSchema.models.generateRefreshToken = function () {
  //generate a token
  jwt.sign(
    //payload
    { _id: this._id },
    //secret
    process.env.REFRESH_TOKEN_SECRETE,
    //options
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};

export const User = mongoose.model("User", userSchema);
