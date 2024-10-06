import { DeleteOutlined } from "@ant-design/icons";
import { Input, Button, Checkbox, List, Col, Row, Space, Divider } from "antd";
import produce from "immer";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { getTask, addTask, changeName, changeCompleted, deleteTask, changeDesc } from "../../api.js";



export default function TaskList() {
    const navigate = useNavigate();

    const token = sessionStorage.getItem('access_token');
    const username = sessionStorage.getItem('username');

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTask(token);
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        fetchTasks();
    }, [token]);

    //const [tasks, setTasks] = useState([
    //    { id: 1, name: "Task 1", completed: false },
    //    getTask(sessionStorage.getItem('access_token'))
    //]);

    const [filterTimeout, setFilterTimeout] = useState(null);

    useEffect(() => {
        return () => {
            // Cleanup timeout on component unmount
            if (filterTimeout) {
                clearTimeout(filterTimeout);
            }
        };
    }, [filterTimeout]);

    const handleNameChange = (task, event) => {
        // Update the state immediately
        const newTasks = produce(tasks, draft => {
            const index = draft.findIndex(t => t.id === task.id);
            draft[index].name = event.target.value;
        });
        setTasks(newTasks);
    
        // Debounce the changeName call
        if (filterTimeout) {
            clearTimeout(filterTimeout);
        }
        const timeoutId = setTimeout(() => {
            if (task.id) {
                changeName(token, event.target.value, task.id);
                console.log("Changed name");
            } else {
                console.error("Task ID is undefined");
            }
        }, 500);
        setFilterTimeout(timeoutId);
    };

    const handleDescChange = (task, event) => {
        // Update the state immediately
        const newTasks = produce(tasks, draft => {
            const index = draft.findIndex(t => t.id === task.id);
            draft[index].description = event.target.value;
        });
        setTasks(newTasks);

        // Debounce the changeName call
        if (filterTimeout) {
            clearTimeout(filterTimeout);
        }
        const timeoutId = setTimeout(() => {
            changeDesc(token, task.name, task.id, event.target.value);
            console.log("Changed desc");
        }, 500);
        setFilterTimeout(timeoutId);
    };

    const handleCompletedChange = (task, event) => {
        console.log(event)
        const newTasks = produce(tasks, draft => {
            const index = draft.findIndex(t => t.id === task.id);
            draft[index].completed = event.target.checked;
        });
        setTasks(newTasks);
        changeCompleted(token, event.target.checked, task.id);
    };

    const handleAddTask = async () => {
        try {
            // Create the task on the server first
            const newTask = await addTask(token, "Enter task name", "Enter task description");
    
            // Update the state with the new task
            setTasks(produce(tasks, draft => {
                draft.push({
                    id: newTask.id, // Use the id returned by the server
                    name: newTask.title,
                    completed: newTask.marked_as_done,
                    description: newTask.desc
                });
            }));
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const handleDeleteTask = (task) => {
        setTasks(produce(tasks, draft => {
            const index = draft.findIndex(t => t.id === task.id);
            draft.splice(index, 1);
        }));
        deleteTask(token, task.id);
    };

    const Logout = () => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('username');
        navigate("/login");
    }

    return (
        <>
            <Row type="flex" justify="space-between" align="middle" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <Col span={11}>
                    <h1>Logged in as: {username}</h1>
                </Col>
                <Col span={1}>
                    <Button onClick={Logout}>Logout</Button>
                </Col>
            </Row>

            <Row type="flex" justify="center" style={{ minHeight: '100vh', marginTop: '6rem' }}>
                <Col span={12}>
                    <h1>Task List</h1>
                    <Button onClick={handleAddTask}>Add Task</Button>
                    <Divider />
                    <List
                        size="small"
                        bordered
                        dataSource={tasks}
                        renderItem={(task) => <List.Item key={task.id}>
                            <Row type="flex" justify="space-between" align="middle" style={{ width: '100%' }}>
                                <Space>
                                    <Checkbox checked={task.completed} onChange={(e) => handleCompletedChange(task, e)} />
                                    <Input value={task.name} onChange={(event) => handleNameChange(task, event)} />
                                    <Input value={task.description} onChange={(event) => handleDescChange(task, event)} />
                                </Space>
                                <Button type="text" onClick={() => handleDeleteTask(task)}><DeleteOutlined /></Button>
                            </Row>
                        </List.Item>}
                    />
                </Col>
            </Row>
        </>
    )
}