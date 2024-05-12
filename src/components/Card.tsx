import React, {useState} from 'react';
import EditTask from '../modals/EditTask';
import {Link} from 'react-router-dom';
import AddSubtask from '../modals/AddSubtask';
interface Task {
    id: number;
    name: string;
    description: string;
    duration: number;
}
interface PartialSubtask {
    name: string;
    description: string;
    completed: boolean;
    taskId: number;
}

interface Props {
    taskObj: Task;
    //index: number;
    name: string;
    deleteTask: (name: string) => void;
    updateListArray: (obj: Task, name: string) => void;
    addSubtask: (subtask: PartialSubtask) => void;
}

const Card: React.FC<Props> = ({
    taskObj,
    name,
    deleteTask,
    updateListArray,
    addSubtask,
}) => {
    const [modal, setModal] = useState(false);
    const [addSubtaskModal, setAddSubtaskModal] = useState(false);

    const toggleAddSubtaskModal = () => {
        setAddSubtaskModal(!addSubtaskModal);
    };
    const updateTask = (obj: Task) => {
        updateListArray(obj, name);
    };
    const toggle = () => {
        setModal(!modal);
    };

    const handleDelete = () => {
        deleteTask(taskObj.name);
    };

    return (
        <div className='card-wrapper mr-5'>
            <div
                className='card-top'
                style={{backgroundColor: '#3c3c3c'}}
            ></div>
            <div className='task-holder'>
                <span
                    className='card-header'
                    style={{
                        backgroundColor: '#3c3c3c',
                        borderRadius: '10px',
                        color: 'white',
                    }}
                >
                    {taskObj.name}
                </span>
                <p className='mt-3'>{taskObj.description}</p>

                <div
                    style={{
                        position: 'absolute',
                        right: '20px',
                        bottom: '20px',
                    }}
                >
                    <i
                        className='fa fa-plus'
                        style={{
                            color: '#3c3c3c',
                            cursor: 'pointer',
                            paddingRight: '18px',
                        }}
                        onClick={() => setAddSubtaskModal(true)}
                    ></i>
                    <Link
                        to={`/task-details/${encodeURIComponent(taskObj.name)}`}
                    >
                        <i
                            className='fas fa-info-circle ml-2'
                            style={{
                                color: '#3c3c3c',
                                cursor: 'pointer',
                                paddingRight: '18px',
                            }}
                        ></i>
                    </Link>
                    <i
                        className='far fa-edit edit-icon'
                        data-testid='edit-icon'
                        style={{
                            color: '#3c3c3c',
                            cursor: 'pointer',
                        }}
                        onClick={() => setModal(true)}
                    ></i>
                    <i
                        className='fas fa-trash-alt'
                        data-testid='delete-icon'
                        style={{
                            color: '#3c3c3c',
                            cursor: 'pointer',
                        }}
                        onClick={handleDelete}
                    ></i>
                </div>
            </div>
            <EditTask
                modal={modal}
                toggle={toggle}
                updateTask={updateTask}
                taskObj={taskObj}
            />
            <AddSubtask
                modal={addSubtaskModal}
                toggle={toggleAddSubtaskModal}
                addSubtask={addSubtask}
                taskId={taskObj.id} // Pass the task ID to the AddSubtask modal
            />
        </div>
    );
};

export default Card;
