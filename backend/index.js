const express = require("express");
const app = express();
const port = 8000;
const {database} = require("./src/model/task");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.listen(port, ()=>{
console.log(`Server started at ${port}`);
})

app.get("/", (req,res)=>{
    database.ping((err)=>{
        if (err) {
            return res.send("Server is down! ",err);
        } else{
            return res.send("Server is connected...");
        }
    })
})

const taskRouter = require("./src/routes/task_router");
app.use("/todo",taskRouter);