import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
interface PartialSubtask {
    name: string;
    description: string;
    completed: boolean;
    taskId: number;
}

const TaskDetails = () => {
    const {taskName} = useParams(); // Get the taskId from the URL parameter
    const [subtasks, setSubtasks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSubtasks = async () => {
            try {
                const resp = await fetch(
                    `https://localhost:7149/api/Task/GetTaskIdByName/${taskName}`,
                );
                if (!resp.ok) {
                    throw new Error('Failed to fetch taskId');
                }
                const id = await resp.json();
                const response = await fetch(
                    `https://localhost:7149/api/Subtask/GetAllSubtasksByTaskId/${id}`,
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch subtasks');
                }
                const data = await response.json();
                setSubtasks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subtasks:', error);
            }
        };

        fetchSubtasks();
    }, [taskName]);
    return (
        <div>
            <h1
                style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    paddingTop: '30px',
                }}
            >
                TaskDetails for Task: {taskName}
            </h1>
            <Link
                to='/'
                style={{
                    textDecoration: 'none',
                    color: 'black',
                    marginLeft: '10px',
                }}
            >
                Go Back to Task Page
            </Link>
            <div>
                {loading ? (
                    <p>Loading subtasks...</p>
                ) : (
                    <>
                        <p>Number of Subtasks: {subtasks.length}</p>
                        <ul>
                            {subtasks.map((subtask: PartialSubtask) => (
                                <li>
                                    {subtask.name} - {subtask.description}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskDetails;
