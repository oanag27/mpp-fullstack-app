import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

interface Props {
    modal: boolean;
    toggle: () => void;
    save: (subtaskObj: PartialSubtask) => void;
}

interface PartialSubtask {
    name: string;
    description?: string;
    completed?: boolean;
}

const AddSubtask: React.FC<Props> = ({modal, toggle, save}) => {
    const [subtaskName, setSubtaskName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = e.target;
        if (name === 'subtaskName') {
            setSubtaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'completed') {
            setCompleted(true);
        }
    };

    const handleSave = () => {
        const subtaskObj: PartialSubtask = {
            name: subtaskName,
            description: description || undefined,
            completed: completed,
        };
        save(subtaskObj);
        setSubtaskName('');
        setDescription('');
        setCompleted(false);
        toggle();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add a new subtask</ModalHeader>
            <ModalBody>
                <form>
                    <div className='form-group'>
                        <label htmlFor='subtaskName'>Subtask Name</label>
                        <input
                            id='subtaskName'
                            type='text'
                            className='form-control'
                            style={{marginBottom: '7px'}}
                            value={subtaskName}
                            onChange={handleChange}
                            name='subtaskName'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='subtaskDescription'>
                            Subtask Description
                        </label>
                        <textarea
                            id='subtaskDescription'
                            rows={5}
                            className='form-control'
                            value={description}
                            onChange={handleChange}
                            name='description'
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='completed'>Completed</label>
                        <input
                            id='completed'
                            type='checkbox'
                            className='form-check-input'
                            style={{marginLeft: '7px'}}
                            checked={completed}
                            onChange={handleChange}
                            name='completed'
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleSave}>
                    Add
                </Button>{' '}
                <Button color='secondary' onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddSubtask;
