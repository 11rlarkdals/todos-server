import express from "express";
import AppDataSource from "./data-source";
import authRouter from "./routes/authRouter";

const app = express();
const port = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use(express.json());

app.use(authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
