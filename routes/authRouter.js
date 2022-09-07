import express from "express";
import {
  registerUser,
  login,
  updateUser,
} from "../controllers/authController.js";
const Router = express.Router();

Router.route("/register").post(registerUser);

Router.route("/login").post(login);

Router.route("/updateUser").patch(updateUser);

export default Router;
