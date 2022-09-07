import expenseModal from "../modals/expense.js";

const createExpense = async (req, res) => {
  const { description, price, expense } = req.body;
  if (!description || !price || !expense) {
    throw new Error("please provide a descriptionnn and price");
  }

  req.body.createdBy = req.user.userId;
  const expenseInfo = await expenseModal.create(req.body);
  console.log(req.body);
  res.json({
    status: "success",
    data: {
      data: expenseInfo,
    },
  });
};
const readExpense = async (req, res) => {
  const expenses = await expenseModal.find({ createdBy: req.user.userId });
  res.json({
    status: "success",
    data: {
      data: expenses,
      numExpenses: expenses.length,
    },
  });
};
const updateExpense = async (req, res) => {
  const id = req.params.id;
  console.log(`uppppppppppppppppp ${id}`);
  const { description, price, expense } = req.body;
  if (!description || !price || !expense) {
    throw new Error("please provide a descriptionnn and price");
  }

  const expenseInfo = await expenseModal.findOne({ _id: id });

  if (!expenseInfo) {
    throw new Error("expense not found");
  }

  const updatedExpense = await expenseModal.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );

  res.json({
    status: "success",
    data: {
      updatedExpense,
    },
  });
};
const deleteExpense = async (req, res) => {
  const id = req.params.id;
  console.log(`jjjjjjjjjjjjjjjjjj${id}`);
  const expense = await expenseModal.findOne({ _id: id });
  if (!expense) {
    throw new Error("Expense not found ");
  }

  await expenseModal.findByIdAndDelete(id);
  res.json({
    status: "success",
    msg: "delted successfully",
  });
};

export { createExpense, readExpense, updateExpense, deleteExpense };
