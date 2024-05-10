import {useState, useEffect} from 'react';
import AddTask from '../modals/AddTask';
import Card from './Card';
import isOnline from 'is-online';
import {Link} from 'react-router-dom';
interface Task {
    id: number;
    name: string;
    description: string;
    duration: number;
}
interface PartialTask {
    id?: number;
    name: string;
    description: string;
    duration: number;
}

const Task = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Number of items to display per page

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isOnlineStatus, setIsOnlineStatus] = useState(true); // Internet connection status

    useEffect(() => {
        const fetchData = async () => {
            try {
                const online = await isOnline();
                setIsOnlineStatus(online); // Update online status
                console.log('status:', online);
                if (!online) {
                    const storedTasks = localStorage.getItem('taskList');
                    if (storedTasks) {
                        setTaskList(JSON.parse(storedTasks));
                    }
                    // If offline, don't make the fetch request
                    setLoading(false);
                    console.log('stored:', storedTasks);
                    return;
                }
                console.log('stored:');
                const response = await fetch(
                    'https://localhost:7149/api/Task/GetAllTasks',
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setTaskList(data);
                setLoading(false);
                // Sync tasks with the server
                //await syncWithServer();
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Server is unreachable'); // Set error message for server down
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggle = () => {
        setModal(!modal);
    };
    const deleteTask = async (taskName: string) => {
        try {
            const response = await fetch(
                `https://localhost:7149/api/Task/DeleteName/${taskName}`,
                {
                    method: 'DELETE',
                },
            );
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            // Remove the deleted task from the frontend task list
            const updatedTaskList = taskList.filter(
                (task) => task.name !== taskName,
            );
            setTaskList(updatedTaskList);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    const updateListArray = (obj: Task, name: string) => {
        const index = taskList.findIndex((task) => task.name === name); // Find the index of the task with the given name
        if (index !== -1) {
            // Check if the task with the given name exists
            const tempList = [...taskList]; // Create a new array
            tempList[index] = obj; // Update the task at the found index
            localStorage.setItem('taskList', JSON.stringify(tempList));
            setTaskList(tempList);
        } else {
            console.error(`Task with name ${name} not found.`);
        }
    };

    const saveTask = async (taskObj: PartialTask) => {
        if (!taskObj.name || !taskObj.description || taskObj.duration <= 0) {
            setErrorMessage('Please provide valid task details.');
            return;
        }
        setErrorMessage(null);
        if (!isOnlineStatus) {
            // If offline, generate a unique ID for the task
            const tempId = Math.floor(Math.random() * 1000000);
            const newTask = {id: tempId, ...taskObj, subtasks: []}; // Add the unique ID and empty subtasks array to the task object
            // Create a copy of the current task list
            const tempList = [...taskList];
            // Push the new task with the unique ID into the copy
            tempList.push(newTask);
            // Update the task list state
            setTaskList(tempList);
            // Update local storage
            localStorage.setItem('taskList', JSON.stringify(tempList));
            // Close the modal
            setModal(false);
            // Exit the function
            return;
        }
        try {
            const response = await fetch(
                'https://localhost:7149/api/Task/AddTask',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskObj),
                },
            );

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            // If the task is added successfully, update the task list state
            const data = await response.json();
            console.log('Added task:', data);

            // Create a copy of the current task list
            const tempList = [...taskList];

            // Push the new task into the copy
            tempList.push(data);

            // Update the task list state
            setTaskList(tempList);

            // Update local storage if needed
            localStorage.setItem('taskList', JSON.stringify(tempList));

            // Close the modal
            setModal(false);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    const sortByName = async () => {
        try {
            const response = await fetch(
                `https://localhost:7149/api/Task/GetAllDataSortedByName`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch sorted data');
            }
            const sortedData = await response.json();
            setTaskList(sortedData);
        } catch (error) {
            console.error('Error sorting by name:', error);
        }
    };
    // Get current tasks
    // const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    // const indexOfLastItem =
    //     currentPage === 1
    //         ? Math.min(currentPage * 4, taskList.length)
    //         : currentPage * itemsPerPage;
    // let currentTasks: Task[] = [];
    // if (currentPage === 1) {
    //     currentTasks = taskList.slice(0, 4); // Display first 4 tasks on the first page
    // } else {
    //     currentTasks = taskList.slice(4); // Display remaining tasks on subsequent pages
    // }
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = Math.min(
        currentPage * itemsPerPage,
        taskList.length,
    );
    // Get current tasks
    // const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    // const indexOfLastItem =
    //     currentPage === 1
    //         ? Math.min(currentPage * 4, taskList.length)
    //         : currentPage * itemsPerPage;
    // let currentTasks: Task[] = [];
    // if (currentPage === 1) {
    //     currentTasks = taskList.slice(0, 4); // Display first 4 tasks on the first page
    // } else {
    //     currentTasks = taskList.slice(4); // Display remaining tasks on subsequent pages
    // }
    const currentTasks = taskList.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='header text-center'>
                <h3 style={{color: '#fff'}}>Task Manager</h3>
                <Link to='/subtask'>
                    <button
                        className='btn btn-secondary mt-3 ml-3'
                        style={{marginRight: '15px'}}
                    >
                        Subtasks
                    </button>
                </Link>
                <button
                    className='btn btn-primary mt-3'
                    style={{
                        backgroundColor: '#fff',
                        color: '#3c3c3c',
                        marginRight: '15px',
                    }}
                    onClick={() => setModal(true)}
                >
                    Add Task
                </button>
                <button
                    className='btn btn-secondary mt-3 ml-3'
                    onClick={sortByName}
                >
                    Sort by Name
                </button>
                {!isOnlineStatus ? (
                    <p style={{color: 'red'}}>Offline</p>
                ) : (
                    <p></p>
                )}
                {errorMessage && (
                    <div className='error-message' style={{color: 'red'}}>
                        {errorMessage}
                    </div>
                )}
            </div>
            {loading ? ( // Render loading indicator while tasks are being fetched
                <div>Loading...</div>
            ) : (
                <div className='task-container'>
                    {currentTasks.map((obj) => (
                        <Card
                            key={obj.id}
                            taskObj={obj}
                            //index={index}
                            name={obj.name}
                            deleteTask={deleteTask}
                            updateListArray={updateListArray}
                        />
                    ))}
                </div>
            )}
            <div
                className='pagination'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5px',
                }}
            >
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <p
                    style={{
                        textAlign: 'center',
                        marginLeft: '5px',
                        marginRight: '5px',
                        marginTop: '5px',
                    }}
                >
                    Showing {indexOfFirstItem + 1} to{' '}
                    {Math.min(indexOfLastItem, taskList.length)} of{' '}
                    {taskList.length} tasks
                </p>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= taskList.length}
                >
                    Next
                </button>
            </div>
            <AddTask toogle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default Task;
