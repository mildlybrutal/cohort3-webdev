import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../db.js";
import userMiddleware from "../middleware/user.js";

const userRouter = Router();

userRouter.use(userMiddleware)

userRouter.post("/sign-up", (req, res) => {
    res.json({
        status: 200,
        message: "Signed-up successfully",
    });
});

userRouter.post("/sign-in", (req, res) => {
    res.json({
        status: 200,
        message: "Signed-in successfully",
    });
});

userRouter.post("/purchase", (req, res) => {
    res.json({
        status: 200,
        message: "Purchase successfull",
    });
});

userRouter.get("/view-courses", (req, res) => {
    res.json({
        status: 200,
        message: "All courses loaded successfully",
    });
});

userRouter.get("/view-purchased", (req, res) => {
    res.json({
        status: 200,
        message: "Purchased courses loaded successfully",
    });
});

export default userRouter
