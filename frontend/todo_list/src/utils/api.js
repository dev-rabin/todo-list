const BASE_URL = "http://localhost:8000/todo";

async function createTask(taskData) {
    const response = await fetch(`${BASE_URL}/createtask`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    }
    );
    if (!response.ok) {
        throw new Error(`Failed to create task`);
    }
    return response.json();
}

async function fetchData() {
    const response = await fetch(`${BASE_URL}/`);
    if (!response.ok) {
        throw new Error("Unable to fetch tasks");
    }
    return response.json();
}

async function deleteTaskById (item_id){
    const response = await fetch(`${BASE_URL}/deletetask/${item_id}`,{
        method : "DELETE"
    });
    if (!response.ok) {
        console.error("Unable to delete task");
        throw new Error("Unable to delete task");
    } return;
}

async function updateTaskById(item_id, updatedTaskData) {
    const response = await fetch(`${BASE_URL}/updatetask/${item_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTaskData)
    });
    if (!response.ok) {
        throw new Error("Failed to update task");
    }
    return response.json();
}

async function getTaskById(item_id) {
    try {
        const response = await fetch(`${BASE_URL}/${item_id}`,{
            method : "GET"
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch task details: " + error.message);
    }
}



export { createTask, fetchData, deleteTaskById ,updateTaskById,getTaskById}