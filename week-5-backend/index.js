const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// log method, timestamp and url
function middleware(req, res, next) {
    console.log("Method is: " + req.method);

    console.log("Timestamp is: " + new Date());
    console.log(req.hostname);
    console.log("URL : " + req.url);

    next();
}

app.use(middleware);

app.post("/sum", (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    return res.json({
        ans: a + b,
    });
});

app.get("/multiply", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    return res.json({
        ans: a * b,
    });
});

app.get("/divide", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    return res.json({
        ans: a / b,
    });
});

app.get("/square", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    return res.json({
        ans: a ** b,
    });
});

app.get("/subtract", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    return res.json({
        ans: a - b,
    });
});

app.listen(3000, () => {
    console.log("Server started at 3000 port");
});
