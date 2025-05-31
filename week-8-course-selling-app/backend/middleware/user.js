import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config";


function userMiddleware(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_USER_PASSWORD);

    if (response) {
        req.userId = token.userId;
        next();
    } else {
        res.json({
            status: 403,
            message: "Invalid creds",
        });
    }
}

export default userMiddleware;
