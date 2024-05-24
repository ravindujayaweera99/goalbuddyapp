import asyncHandler from "express-async-handler";

//@desc get Goals
//@Route GET /api/goals
export const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Goals" });
});

//@desc set Goal
//@Route POST /api/goals/:id
export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    throw new Error("Please Add a text field!");
  }
  res.status(200).json({ message: "Set Goal" });
});

//@desc update Goal
//@Route POST /api/goals/:id
export const updateGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Updating Goal ${id}` });
});

//@desc delete Goal
//@Route POST /api/goals/:id
export const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Deleting Goal ${id}` });
});
