import React, {useState, useEffect, ChangeEvent} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

interface Task {
    id: number;
    name: string;
    description: string;
    duration: number;
}

interface Props {
    modal: boolean;
    toggle: () => void;
    updateTask: (obj: Task) => void;
    taskObj: Task;
}

const EditTask: React.FC<Props> = ({modal, toggle, taskObj}) => {
    const [taskName, setTaskName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [duration, setDuration] = useState<number>(0);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = e.target;

        if (name === 'taskName') {
            setTaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'duration') {
            setDuration(parseInt(value));
        }
    };

    useEffect(() => {
        setTaskName(taskObj.name);
        setDescription(taskObj.description);
        setDuration(taskObj.duration);
    }, [taskObj]);

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const tempObj: Task = {
            id: taskObj.id,
            name: taskName,
            description: description,
            duration: duration,
        };
        //updateTask(tempObj);
        try {
            const response = await fetch(
                `https://localhost:7149/api/Task/UpdateTask/${taskObj.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(tempObj),
                },
            );

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            // If the task is updated successfully, you can perform additional actions here
            // For example, close the modal
            toggle();
        } catch (error) {
            console.error('Error updating task:', error);
            // Handle error
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <div className='form-group'>
                    <label>Task Name</label>
                    <input
                        type='text'
                        className='form-control'
                        value={taskName}
                        onChange={handleChange}
                        name='taskName'
                    />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea
                        rows={5}
                        className='form-control'
                        value={description}
                        onChange={handleChange}
                        name='description'
                    ></textarea>
                </div>
                <div className='form-group'>
                    <label>Duration</label>
                    <input
                        type='number'
                        min={0}
                        className='form-control'
                        value={duration}
                        onChange={handleChange}
                        name='duration'
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleUpdate}>
                    Update
                </Button>{' '}
                <Button color='secondary' onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTask;
