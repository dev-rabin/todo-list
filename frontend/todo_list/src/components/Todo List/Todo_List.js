import React, { useEffect, useState } from 'react';
import { deleteTaskById, fetchData} from "../../utils/api";
import { Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Todo_List() {
    const [tasks, setTasks] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    async function fetchTasks() {
        try {
            const taskData = await fetchData("task");
            const tasksIST = taskData.data.map(task => ({
                ...task,
                due_date: new Date(task.due_date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
            }));
            setTasks(tasksIST);
            console.log("Fetch task data ", tasksIST);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (item_id) => {
        try {
            await deleteTaskById(item_id);
            setTasks(tasks.filter(task => task.item_id !== item_id));
            console.log("Task deleted successfully");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleUpdate = async (item_id) => {
        try {
            navigate(`/updatetask/${item_id}`);
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    return (
        <>
            <h3 className='text-center my-3 text-decoration-underline'>Your Tasks</h3>
            <div className='container text-center p-3 '>
                {showAlert && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>Task has been deleted successfully.</Alert>}
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Due Date (IST)</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No task found</td>
                                </tr>
                            ) : (
                                tasks.map((task, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{task.item_name}</td>
                                        <td>{task.item_desc}</td>
                                        <td>{task.priority}</td>
                                        <td>{task.due_date}</td>
                                        <td>{task.status}</td>
                                        <td>
                                            <Button variant='danger' className='mx-2' onClick={() => handleDelete(task.item_id)}>Delete</Button>
                                            <Button variant='primary' onClick={() => handleUpdate(task.item_id)}>Update</Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Button variant='success' onClick={() => navigate('/createtask')}>Create Task</Button>
                </div>
            </div>
        </>
    )
}

export default Todo_List;
