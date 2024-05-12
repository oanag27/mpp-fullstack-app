import React from 'react';
import {Link} from 'react-router-dom';
const TaskDetails = () => {
    //const {taskName} = useParams();
    //const [task, setTask] = useState(null);

    // Use useEffect to find the task by its name when the component mounts
    // useEffect(() => {
    //     const foundTask = taskList.find(
    //         (task) => task.name === decodeURIComponent(taskName),
    //     );
    //     setTask(foundTask);
    // }, [taskName, taskList]);

    // If the task is not found, display a message
    // if (!task) {
    //     return <div>Task not found</div>;
    // }
    return (
        <div>
            <h1
                style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    paddingTop: '30px',
                }}
            >
                TaskDetails for {}
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
        </div>
    );
};

export default TaskDetails;
