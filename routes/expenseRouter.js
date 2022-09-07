import express from "express";
import {
  createExpense,
  readExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseControler.js";
const Router = express.Router();

Router.route("/").post(createExpense).get(readExpense);
Router.route("/:id").patch(updateExpense).delete(deleteExpense);

export default Router;
