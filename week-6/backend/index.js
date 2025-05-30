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

function auth(req, res, next) {
    const token = req.headers.authentication;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized",
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    }
    if (err) {
        res.status(401).send({
            message: "Unauthorized",
        });
    }
}

function userHandler(req, res) {
    const username = req.user;
    const user = users.find((user) => user.username === username);

    if (user) {
        res.send({
            username: user.username,
            password: user.password,
        });
    } else {
        res.status(401).send({
            message: "unauthorized",
        });
    }
}

app.post("/signup", signupHandler);

app.post("/signin", signinHandler);

app.get("/me", auth, userHandler);

app.listen(3000, () => {
    console.log("Lmao, running on 3000");
});
