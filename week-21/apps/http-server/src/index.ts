import express from "express"

const app = express()

app.get("signup",(req,res)=>{
    res.send("Hello")
})

app.get("signup",(req,res)=>{
    res.send("Hello")
})

app.get("signin",(req,res)=>{
    res.send("Hello")
})

app.get("chat",(req,res)=>{
    res.send("Hello")
})

app.listen(3001)