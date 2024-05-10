const mysql = require("mysql2");

const database = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Robin@123",
    database : "todo-list"
});

database.connect((err)=>{
    if (err) {
        console.error("Database connection failed! ",err);
    } else {
        console.log("Connected to database successfully.");
    }
})

const Task = {
    create : (newTask, result) =>{
        const query = "insert into items set ?";
        database.query(query,newTask,(err,res)=>{
            if (err) {
                console.error("Error creating task : ",err);
                return;
            }else{
                console.log("Task created" , {id : res.insertId,...newTask});
                result(null,{ id: res.insertId, ...newTask });
            }
        })
    },
    updateById : ( updatedTask,item_id,result) =>{
        const query = "update items set ? where item_id = ?";
        database.query(query,[updatedTask,item_id],(err,res)=>{
            if (err) {
                console.error("Task not updated error : ",err);
                return;
            } else if (res.affectedRows == 0){
                result({item : "Not Found"},null);
                return;
            }
            
            else{
                console.log("Task updated",{id : res.insertId,...updatedTask});
                result(null,{id : res.insertId,...updatedTask});
            }
        })
    },
    deleteById : (item_id,result) => {
        const query = "delete from items where item_id = ?";
        database.query(query,item_id,(err,res)=>{
            if (err) {
                console.error("Error while deleting task :",err);
            }else{
                console.log("Task deleted",{id : res.insertId});
                result(null,{id : res.insertId})
            }
        })
    },
    getAllTasks : (callBack)=>{
        const query = " select * from items";
        database.query(query,(err,result)=>{
            if (err) {
                console.error("Error while getting all tasks :",err);
                callBack(null);
            }else{
                console.log("Fetch task succesfully", result);
                callBack(null,result) ;
            }
        })
    }
}
module.exports = {database,Task};