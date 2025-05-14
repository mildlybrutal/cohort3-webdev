import express from "express";
import fs from "fs"
const app = express();
app.use(express.json())

let users = [];

if (fs.existsSync('./todo.json')) {
    const data = fs.readFileSync('./todo.json');
    users = JSON.parse(data);
}


const saveTodos = (todos) => {
    fs.writeFileSync('./todo.json', JSON.stringify(todos, null, 2));
};

app.post("/signup",(req,res)=>{
    const {id} = req.body;

    const user = users.find(u => String(u.id) === String(id));

    if(user){
        return res.status(409).json({
            message:"user exists"
        })
    }

    users.push({
        id,
        todos: []
    })

    saveTodos(users)

    return res.status(201).json({
        message: "User created successfully"
    });
})

app.get("/users", (req, res) => {
    return res.status(200).json({
        users
    });
});


app.post("/todos/:id",(req,res)=>{
    const {title} = req.body;
    const {id} = req.params;

    const user = users.find(u => String(u.id) === String(id));

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }


    const newTodo = {
        id:Date.now().toString(),
        title,
        completed:false
    }

    user.todos.push(newTodo)
    saveTodos(users)

    return res.status(201).json({
        message: "Todo added successfully",
        todo: newTodo
    });
})

app.get("/todos/:id",(req,res)=>{
    const {id} = req.params
    const user = users.find(u => String(u.id) === String(id));

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    return res.status(200).json({
        todos: user.todos
    })
})

app.delete("/todos/:id/:todoId",(req,res)=>{
    const {id,todoId} = req.params;
    const user = users.find(u => String(u.id) === String(id));

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    user.todos = user.todos.filter(todo => todo.id !== todoId);
    saveTodos(users);

    return res.status(200).json({
        message: "Todo deleted successfully"
    });
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
