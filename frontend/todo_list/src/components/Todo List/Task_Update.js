import React, {useState } from 'react';
import { updateTaskById } from "../../utils/api";
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Task_Update() {
    const { item_id } = useParams();
    const navigate = useNavigate();
    const [updatedTask, setUpdatedTask] = useState({
        item_name: '',
        item_desc: '',
        priority: '',
        due_date: '',
        status: ''
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await updateTaskById(item_id, updatedTask);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate("/");
            }, 3000);
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    return (
        <>
            <div className='container col-6 p-3'>
                <h2 className='text-center'>Update Task</h2>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type='text' name='item_name' value={updatedTask.item_name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' name='item_desc' value={updatedTask.item_desc} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Priority</Form.Label>
                        <Form.Control type='text' name='priority' value={updatedTask.priority} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type='date' name='due_date' value={updatedTask.due_date} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Status</Form.Label>
                        <Form.Control type='text' name='status' value={updatedTask.status} onChange={handleChange} />
                    </Form.Group>
                    <div className='text-center'><Button variant='success' onClick={handleSubmit}>Update Task</Button></div>
                </Form>
                {showAlert && <Alert variant="success" className='my-5'>Task updated successfully!</Alert>}
            </div>
        </>
    );
}

export default Task_Update;
