import {useState, useEffect} from 'react';
import AddTask from '../modals/AddTask';
import Card from './Card';

interface Task {
    id: number;
    name: string;
    description: string;
    duration: number;
}
interface PartialTask {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://localhost:7227/api/Tasks/GetAllTasks',
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setTaskList(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggle = () => {
        setModal(!modal);
    };
    const deleteTask = async (taskId: number) => {
        try {
            const response = await fetch(
                `https://localhost:7227/api/Tasks/Delete/${taskId}`,
                {
                    method: 'DELETE',
                },
            );
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            // Remove the deleted task from the frontend task list
            const updatedTaskList = taskList.filter(
                (task) => task.id !== taskId,
            );
            setTaskList(updatedTaskList);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateListArray = (obj: Task, index: number) => {
        const tempList = [...taskList]; // Create a new array
        tempList[index] = obj;
        localStorage.setItem('taskList', JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const saveTask = async (taskObj: PartialTask) => {
        if (!taskObj.name || !taskObj.description || taskObj.duration <= 0) {
            //console.error('Please provide valid task details.');
            setErrorMessage('Please provide valid task details.');
            return;
        }
        setErrorMessage(null);
        try {
            const response = await fetch(
                'https://localhost:7227/api/Tasks/AddTask',
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
                `https://localhost:7227/api/Tasks/GetAllDataSortedByName`,
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
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem =
        currentPage === 1
            ? Math.min(currentPage * 4, taskList.length)
            : currentPage * itemsPerPage;
    let currentTasks: Task[] = [];
    if (currentPage === 1) {
        currentTasks = taskList.slice(0, 4); // Display first 4 tasks on the first page
    } else {
        currentTasks = taskList.slice(4); // Display remaining tasks on subsequent pages
    }

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='header text-center'>
                <h3 style={{color: '#fff'}}>Task Manager</h3>
                <button
                    className='btn btn-primary mt-3'
                    style={{backgroundColor: '#fff', color: '#3c3c3c'}}
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
                    {currentTasks.map((obj, index) => (
                        <Card
                            key={obj.id}
                            taskObj={obj}
                            index={index}
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
