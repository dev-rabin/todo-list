import React, { useState } from 'react';
import { createTask } from '../../utils/api';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Task_Form() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        item_name: '',
        item_desc: '',
        priority: '',
        due_date: '',
        status: 'Pending'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await createTask(form);
            console.log('Task created successfully:', response);
            setForm({
                item_name: '',
                item_desc: '',
                priority: '',
                due_date: '',
                status: 'Pending'
            });
            navigate("/");
        } catch (error) {
            console.error('Error creating task:', error.message);
        }
    };

    return (
        <>
            <div className='text-center my-5'>
            <h2>Create task</h2>
            </div>
            <div className='container col-6 my-5'>
                <p>Fill task details</p>
                <FloatingLabel controlId="item_name" label="Task Name" className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your task name" 
                        name="item_name" 
                        value={form.item_name} 
                        onChange={handleChange} 
                    />
                </FloatingLabel>

                <FloatingLabel controlId="item_desc" label="Description" className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Description of task" 
                        name="item_desc" 
                        value={form.item_desc} 
                        onChange={handleChange} 
                    />
                </FloatingLabel>

                <FloatingLabel controlId="priority" label="Priority" className='mb-3'>
                    <Form.Control 
                        type="text" 
                        placeholder="Priority" 
                        name="priority" 
                        value={form.priority} 
                        onChange={handleChange} 
                    />
                </FloatingLabel>

                <FloatingLabel controlId="due_date" label="Due Date" className="mb-3">
                    <Form.Control 
                        type="date" 
                        placeholder="Due Date" 
                        name="due_date" 
                        value={form.due_date} 
                        onChange={handleChange} 
                    />
                </FloatingLabel>

                <div className='text-center'>
                    <Button variant='success' onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </>
    );
}

export default Task_Form;
