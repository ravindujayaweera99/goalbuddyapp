import express from "express";
import goalRoutes from "./routes/goalRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
