import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";

//@desc get Goals
//@Route GET /api/goals
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id});
  res.status(200).json(goals);
});

//@desc set Goal
//@Route POST /api/goals/:id
export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    throw new Error("Please Add a text field!");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  });

  res.status(200).json(goal);
});

//@desc update Goal
//@Route POST /api/goals/:id
export const updateGoal = asyncHandler(async (req, res) => {
  const goal = Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found!");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if(!user){
    res.status(401)
    throw new Error("User not found!");
  }

  //make sure the logged in user matches the goal user
  if(goal.user.toString() !== user.id){
    res.status(401);
    throw new Error("User not Authorized!");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@desc delete Goal
//@Route POST /api/goals/:id
export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndDelete(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found!");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if(!user){
    res.status(401)
    throw new Error("User not found!");
  }

  //make sure the logged in user matches the goal user
  if(goal.user.toString() !== user.id){
    res.status(401);
    throw new Error("User not Authorized!");
  }

  await Goal.deleteOne();
  res.status(200).json({id: req.params.id});
});
