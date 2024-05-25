import express from "express";
import goalRoutes from "./routes/goalRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import colors from "colors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

//serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontned", "build", "index.html")
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to Production Mode!'))
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
