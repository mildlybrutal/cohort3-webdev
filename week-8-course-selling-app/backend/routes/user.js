import express, { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { userModel, purchaseModel, courseModel } from "../db.js";
import userMiddleware from "../middleware/user.js";

import { JWT_USER_PASSWORD } from "../config.js";

const userRouter = Router();

userRouter.post("/sign-up", async function (req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string().min(3).max(10),
            firstName: z.string().min(3).max(30),
            lastName: z.string().min(3).max(30),
        });

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedDataWithSuccess.success) {
            return res.json({
                message: "Incorrect format",
                error: parsedDataWithSuccess.error,
            });
        }

        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });
        return res.json({
            status: 200,
            message: "Signed-up successfully",
        });
    } catch (error) {
        return res.json({
            status: 403,
            message: "Sign-up Failed",
        });
    }
});

userRouter.post("/sign-in", async function (req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().email(),
            password: z.string().min(3).max(10),
        });

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedDataWithSuccess.success) {
            return res.json({
                status: 400,
                message: "Incorrect format",
                error: parsedDataWithSuccess.error,
            });
        }
        const email = req.body.email;
        const password = req.body.password;

        const response = await userModel.findOne({
            email: email,
        });

        const checkPassword = bcrypt.compare(password, response.password);

        if (response && checkPassword) {
            const token = jwt.sign(
                {
                    id: response._id.toString(),
                },
                JWT_USER_PASSWORD
            );
            return res.json({
                status: 200,
                token: token,
                message: "Signed-in successfully",
            });
        } else {
            return res.json({
                status: 403,
                message: "invalid creds",
            });
        }
    } catch (error) {
        return res.json({
            status: 500,
            message: "Sign-ip Failed",
        });
    }
});

userRouter.use(userMiddleware);

userRouter.get("/purchases", async function (req, res) {
    try {
        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId,
        });

        let purchasedCourseIds = [];

        for (let i = 0; i < purchases.length; i++) {
            purchasedCourseIds.push(purchases[i].courseId);
        }

        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourseIds },
        });

        res.json({
            status: 200,
            message: "Purchases",
            purchases,
            coursesData,
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Purchase Failed",
        });
    }
});

export default userRouter;
