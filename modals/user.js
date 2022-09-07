import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const userModal = new mongoose.Schema({
  firstName: {
    type: "string",
    required: [true, "please enter a name"],
    trim: true,
  },
  email: {
    type: "string",
    unique: true,
    required: [true, "please enter a email address"],
    trim: true,
  },
  password: {
    type: "string",
    required: [true, "please enter a password"],
  },
});

userModal.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

userModal.methods.createtoken = function () {
  return jsonwebtoken.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userModal.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};
export default mongoose.model("User", userModal);
