import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { courseModel } from "../db.js";
import adminMiddleware from "../middleware/admin.js";

const courseRouter = Router();


courseRouter.post("/purchase", (req, res) => {
    res.json({
        status: 200,
        message: "course purchased succesfully",
    });
});

courseRouter.get("/preview", (req, res) => {
    res.json({
        status: 200,
        message: "course previwed succesfully",
    });
});

export default courseRouter;
