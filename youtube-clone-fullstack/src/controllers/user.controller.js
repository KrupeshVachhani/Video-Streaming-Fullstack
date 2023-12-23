import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ msg: "Register User" });
});

export { registerUser };