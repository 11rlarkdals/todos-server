import express from "express";
import AppDataSource from "./data-source";
import authRouter from "./routes/authRouter";
import { authenticateUser } from "./middleware/authenticateUser";
import { connectRedis } from "./redisClient";

const app = express();
const port = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
connectRedis()
  .then(() => {
    console.log("Redis client connected!");
  })
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

app.use(express.json());

app.get("/protected", authenticateUser, (req, res) => {
  res.json({ message: `Welcome user with ID ${req.user?.id}` });
});

app.use(authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
