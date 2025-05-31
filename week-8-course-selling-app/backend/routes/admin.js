import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { adminModel, courseModel } from "../db.js";
import adminMiddleware from "../middleware/admin.js";
import { JWT_ADMIN_PASSWORD } from "../config.js";

const adminRouter = Router();

adminRouter.post("/sign-up", async function (req, res) {
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

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastname: lastName,
        });
        return res.json({
            status: 200,
            message: "Signed-up successfully",
        });
    } catch (error) {
        return res.json({
            status: 403,
            message: "Signed-up failed",
        });
    }
});

adminRouter.post("/sign-in", async function (req, res) {
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

        const response = await adminModel.findOne({
            email: email,
        });

        const checkPassword = await bcrypt.compare(password, response.password);

        if (response && checkPassword) {
            const token = jwt.sign(
                {
                    id: response._id.toString(),
                },
                JWT_ADMIN_PASSWORD
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

adminRouter.use(adminMiddleware);

adminRouter.post("/", async function (req, res) {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price } = req.body;

        const course = await courseModel({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId,
        });
        course.save();
        res.json({
            status: 200,
            message: "Course created successfully",
            courseId: course._id,
        });
    } catch (error) {
        res.json({
            status: 403,
            message: "Course creation failed",
        });
    }
});

adminRouter.put("/", async function (req, res) {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price, courseId } = req.body;

        const course = await courseModel.updateOne(
            {
                _id: courseId,
                creatorId: adminId,
            },
            {
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price,
            }
        );

        res.json({
            status: 200,
            message: "Course updated successfully",
            courseId: course._id,
        });
    } catch (error) {
        res.json({
            status: 403,
            message: "Course updation failed",
        });
    }
});

adminRouter.get("/bulk", async function (req, res) {
    try {
        const adminId = req.userId;

        const courses = await courseModel.find({
            creator: adminId,
        });
        res.json({
            status: 200,
            message: "Courses fetched",
            courses,
        });
    } catch (error) {
        res.json({
            status: 403,
            message: "Course fetching failed",
        });
    }
});

export default adminRouter;
