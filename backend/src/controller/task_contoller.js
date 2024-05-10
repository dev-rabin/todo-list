const { Task } = require("../model/task");

const TaskController = {
    createTask: (req, res) => {
        const newTask = {
            item_name: req.body.item_name,
            item_desc: req.body.item_desc,
            priority: req.body.priority,
            due_date: req.body.due_date,
            status: req.body.status || "Pending"
        };
        Task.create(newTask, (err, result) => {
            if (err) {
                console.error("Error creating task, ", err);
                return res.status(500).json({ message: "Error creating task" || err.messgae });
            } else {
                console.log("Task created successfully", result);
                return res.status(200).json({ message: "Task created successfully", data: result })
            }
        })
    },
    updateTaskById: (req, res) => {
        const updatedTask = {
            item_name: req.body.item_name,
            item_desc: req.body.item_desc,
            priority: req.body.priority,
            due_date: req.body.due_date,
            status: req.body.status || "Pending"
        };
        const item_id = req.params.item_id;

        Task.updateById(updatedTask, item_id, (err, result) => {
            if (err) {
                if (err.item === "not_found") {
                    return res.status(404).json({ message: 'Task not found' });
                }
                console.error("Updating task error : ", err);
                return res.status(500).json({ message: "Updating task error" || err.message });
            } else {
                console.log("Task updated successfully : ", result);
                return res.status(200).json({ message: "Task updated successfully", data: result });
            }
        });
    },
    deleteTaskByid: (req, res) => {
        const item_id = req.params.item_id;
        Task.deleteById(item_id, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Task deletion error" || err.message })
            } else {
                console.log("task deleted result : ", result);
                return res.status(200).json({ message: "Task Deleted", })
            }
        })
    },
    fetchAllTasks: (req, res) => {
        Task.getAllTasks((err, result) => {
            if (err) {
                return res.status(500).json({ message: "Fectch task error" || err.message })
            } else {
                console.log("fetch task result : ", result);
                return res.status(200).json({ message: "Task Fetched", data: result })
            }
        })
    }
}

module.exports = TaskController;