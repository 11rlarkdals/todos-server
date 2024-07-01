import express from "express";
import {
  //   authenticateUser,
  //   logoutUser,
  registerUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
// router.post("/login", authenticateUser);
// router.post("/logout", logoutUser);

export default router;
