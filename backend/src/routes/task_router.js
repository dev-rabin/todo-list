const express = require("express");
const TaskRouter = express.Router();
const TaskController = require("../controller/task_contoller")

TaskRouter.get("/",TaskController.fetchAllTasks);
TaskRouter.post("/createtask",TaskController.createTask);
TaskRouter.patch("/updatetask/:item_id",TaskController.updateTaskById);
TaskRouter.delete("/deletetask/:item_id",TaskController.deleteTaskByid);

module.exports = TaskRouter;