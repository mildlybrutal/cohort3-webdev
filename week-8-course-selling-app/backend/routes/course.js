import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { courseModel } from "../db.js";
import userMiddleware from "../middleware/user.js";

const courseRouter = Router();

application.use(userMiddleware);

courseRouter.post("/purchase", async function (req, res) {
    try {
        const userId = req.userId;
        const courseId = req.body.courseId;

        await purchaseModel.create({
            userId,
            courseId,
        });

        res.json({
            status: 200,
            message: "course purchased succesfully",
        });
    } catch (error) {
        res.json({
            status: 403,
            message: "course purchasing failed",
        });
    }
});

courseRouter.get("/preview", async function (req, res) {
    try {
        const courses = await courseModel.find({});

        res.json({
            status: 200,
            message: "Course preview",
            courses,
        });
    } catch (error) {
        res.json({
            status: 403,
            message: "course preview failed",
        });
    }
});

export default courseRouter;
