import React, {useState} from 'react';
import EditTask from '../modals/EditTask';
interface Task {
    id: number;
    name: string;
    description: string;
    duration: number;
}

interface Props {
    taskObj: Task;
    index: number;
    deleteTask: (index: number) => void;
    updateListArray: (obj: Task, index: number) => void;
}

const Card: React.FC<Props> = ({
    taskObj,
    index,
    deleteTask,
    updateListArray,
}) => {
    const [modal, setModal] = useState(false);
    const updateTask = (obj: Task) => {
        updateListArray(obj, index);
    };
    const toggle = () => {
        setModal(!modal);
    };

    const handleDelete = () => {
        deleteTask(taskObj.id);
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
        </div>
    );
};

export default Card;
