import { Router } from "express";
import { adminModel } from "../db.js";
import adminMiddleware from "../middleware/admin.js";
const adminRouter = Router();


adminRouter.use(adminMiddleware);

adminRouter.post("/sign-up", (req, res) => {
    res.json({
        status: 200,
        message: "Signed-up successfully",
    });
});

adminRouter.post("/sign-in", (req, res) => {
    res.json({
        status: 200,
        message: "Signed-in successfully",
    });
});

adminRouter.post("/", (req, res) => {
    res.json({
        status: 200,
        message: "Course created successfully",
    });
});

adminRouter.put("/", (req, res) => {
    res.json({
        status: 200,
        message: "Course updated successfully",
    });
});

adminRouter.get("/bulk", (req, res) => {
    res.json({
        status: 200,
        message: "Course updated successfuly",
    });
});

export default adminRouter;
