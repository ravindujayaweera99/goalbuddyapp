import express from "express";
import goalRoutes from "./routes/goalRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import colors from 'colors';
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
