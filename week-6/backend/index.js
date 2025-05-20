import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

const JWT_SECRET = "randomshi";

const users = [];

function signupHandler(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (users.find((u) => u.username === username)) {
        res.send({
            message: "Already signed up",
        });
    }

    users.push({
        username: username,
        password: password,
    });

    res.send({
        message: "Signed up successfully",
    });
}

function signinHandler(req, res) {
    //
    const username = req.body.username;

    const user = users.find((u) => u.username === username);

    if (user) {
        const token = jwt.sign(
            {
                username: username,
            },
            JWT_SECRET
        );

        // user.token = token;

        res.json({
            token: token,
        });

        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password",
        });
    }
}

function userHandler(req, res) {
    const token = req.headers.token;

    const decodedInfo = jwt.verify(token, JWT_SECRET);

    const username = decodedInfo.username;

    const user = users.find((user) => user.username === username);

    if (user) {
        res.send({
            username: user.username,
        });
    } else {
        res.status(401).send({
            message: "unauthorized",
        });
    }
}

app.post("/signup", signupHandler);

app.post("/signin", signinHandler);

app.get("/me", userHandler);

app.listen(3000, () => {
    console.log("Lmao, running on 3000");
});
