import express from "express";
import { getAllUsers, signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getAllUsers);

export default router;
