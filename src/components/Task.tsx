import {useState, useEffect} from 'react';
import AddTask from '../modals/AddTask';
import Card from './Card';
import isOnline from 'is-online';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
    offlineAdded?: boolean;
}

const Task = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState<Task[]>([
        {
            name: 'b',
            description: 'b',
            duration: 3,
            id: 1,
        },
        {
            name: 'a',
            description: 'a',
            duration: 1,
            id: 2,
        },
        {
            name: 'r',
            description: 'r',
            duration: 1,
            id: 3,
        },
        {
            name: 'Sarah Huel',
            description: 'Mollitia similique optio omnis quaerat.',
            duration: 10,
            id: 4,
        },
        {
            name: 'Ubaldo Towne',
            description: 'Sint optio consectetur dolor itaque.',
            duration: 99,
            id: 5,
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const tasksPerPage = 50;

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isOnlineStatus, setIsOnlineStatus] = useState(true); // Internet connection status

    useEffect(() => {
        console.log('taskList', taskList);
    }, [taskList]);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        console.log('taskList: ', taskList);
    }, [taskList]);

    const fetchData = async () => {
        console.log('page in', page);
        console.log('in fetch');
        try {
            const online = await isOnline();
            setIsOnlineStatus(online); // Update online status

            if (!online) {
                const storedTasks = localStorage.getItem('taskList');
                if (storedTasks) {
                    setTaskList(JSON.parse(storedTasks));
                }
                setLoading(false);
                return;
            }
            console.log('page in', page);
            setPage(page + 1);
            if (taskList.length > 163) {
                setHasMore(false);
                return;
            }
            const response = await fetch(
                `https://localhost:7149/api/Task/GetPaginatedTasks/${page}/${tasksPerPage}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setTaskList((prevTasks) => [...prevTasks, ...data]);
            setLoading(false);
            // Sync tasks with the server
            await syncWithServer();
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to fetch tasks'); // Set error message for failed fetch
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleOnlineStatusChange = () => {
            setIsOnlineStatus(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    const syncWithServer = async () => {
        try {
            const online = await isOnline();
            if (online) {
                const modifiedTasks = JSON.parse(
                    localStorage.getItem('taskList') || '[]',
                );
                for (const task of modifiedTasks) {
                    if (task.offlineAdded) {
                        // Check if task was added offline
                        await saveTask(task);
                    }
                }

                // Remove offlineAdded flag from tasks that were synced
                const tasksToSaveOffline = modifiedTasks.filter(
                    (task: PartialTask) => !task.offlineAdded,
                );
                localStorage.setItem(
                    'taskList',
                    JSON.stringify(tasksToSaveOffline),
                );
                //setTaskList(tasksToSaveOffline);
            } else {
                return;
            }
        } catch (error) {
            console.error('Error syncing tasks with server:', error);
        }
    };
    const toggle = () => {
        setModal(!modal);
    };

    const deleteTask = async (taskName: string) => {
        try {
            const resp = await fetch(
                `https://localhost:7149/api/Task/GetTaskIdByName/${taskName}`,
            );
            if (!resp.ok) {
                throw new Error('Failed to fetch taskId');
            }
            const id = await resp.json();
            const response = await fetch(
                `https://localhost:7149/api/Task/Delete/${id}`,
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
    const addSubtask = (taskName: string) => {
        console.log(`Adding subtask for task: ${taskName}`);
    };

    const saveTask = async (taskObj: PartialTask) => {
        if (!taskObj.name || !taskObj.description || taskObj.duration <= 0) {
            setErrorMessage('Please provide valid task details.');
            return;
        }
        setErrorMessage(null);
        if (!isOnlineStatus) {
            const tempId = Math.floor(Math.random() * 1000000);
            const taskWithoutId = {
                id: tempId,
                name: taskObj.name,
                description: taskObj.description,
                duration: taskObj.duration,
                offlineAdded: true,
            };

            setTaskList((prevTasks) => [...prevTasks, taskWithoutId]);

            // Update local storage
            localStorage.setItem(
                'taskList',
                JSON.stringify([...taskList, taskWithoutId]),
            );

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
            const isDuplicate = taskList.some(
                (task) => task.name === data.name,
            );
            if (isDuplicate) {
                setErrorMessage('Task with the same name already exists.');
                return;
            }
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

    return (
        <>
            <div className='header text-center'>
                <h3 style={{color: '#fff'}}>Task Manager</h3>
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
                <InfiniteScroll
                    dataLength={taskList.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading data...</h4>} // Loader component to display while loading
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <div className='task-container'>
                        {taskList.map((obj) => (
                            <Card
                                key={obj.id}
                                taskObj={obj}
                                name={obj.name}
                                deleteTask={deleteTask}
                                updateListArray={updateListArray}
                                addSubtask={() => addSubtask(obj.name)}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
            <AddTask toogle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default Task;
