import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
interface Props {
    modal: boolean;
    toogle: () => void;
    save: (taskObj: PartialTask) => void;
}
interface PartialTask {
    name: string;
    description: string;
    duration: number;
}

const AddTask: React.FC<Props> = ({modal, toogle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState<number | ''>('');
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = e.target;
        if (name === 'taskName') {
            setTaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'duration') {
            setDuration(value !== '' ? Number(value) : ''); // Ensure duration is a number
        }
    };
    const handleSave = () => {
        const taskObj: PartialTask = {
            name: taskName,
            description: description,
            duration: Number(duration),
        };
        save(taskObj);
        setTaskName('');
        setDescription('');
        setDuration('');
        toogle();
    };
    return (
        <Modal isOpen={modal} toggle={toogle}>
            <ModalHeader toggle={toogle}>Add a new task</ModalHeader>
            <ModalBody>
                <form>
                    <div className='form-group'>
                        <label htmlFor='taskName'>Task Name</label>
                        <input
                            id='taskName'
                            type='text'
                            className='form-control'
                            style={{marginBottom: '7px'}}
                            value={taskName}
                            onChange={handleChange}
                            name='taskName'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='taskDescription'>
                            Task Description
                        </label>
                        <textarea
                            id='taskDescription'
                            rows={5}
                            className='form-control'
                            value={description}
                            onChange={handleChange}
                            name='description'
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='taskDuration'>Duration</label>
                        <input
                            id='taskDuration'
                            type='number'
                            min={0}
                            className='form-control'
                            style={{marginBottom: '7px'}}
                            value={duration}
                            onChange={handleChange}
                            name='duration'
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleSave}>
                    Add
                </Button>{' '}
                <Button color='secondary' onClick={toogle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddTask;
