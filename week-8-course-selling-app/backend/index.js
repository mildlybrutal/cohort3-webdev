import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import adminRouter from "./routes/admin.js";
import rateLimiter from "./middleware/rateLimiter.js";
const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
    await mongoose.connect(
        MONGODB_URI
    );
    app.listen(3000, () => {
        console.log("Server running at port 3000");
    });
}

main();
