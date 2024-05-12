// import React, {useState} from 'react';
// import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

// interface Props {
//     modal: boolean;
//     toggle: () => void;
//     save: (subtaskObj: PartialSubtask) => void;
// }

// interface PartialSubtask {
//     name: string;
//     description?: string;
//     completed?: boolean;
// }

// const AddSubtask: React.FC<Props> = ({modal, toggle, save}) => {
//     const [subtaskName, setSubtaskName] = useState('');
//     const [description, setDescription] = useState('');
//     const [completed, setCompleted] = useState(false);

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     ) => {
//         const {name, value} = e.target;
//         if (name === 'subtaskName') {
//             setSubtaskName(value);
//         } else if (name === 'description') {
//             setDescription(value);
//         } else if (name === 'completed') {
//             setCompleted(true);
//         }
//     };

//     const handleSave = () => {
//         const subtaskObj: PartialSubtask = {
//             name: subtaskName,
//             description: description || undefined,
//             completed: completed,
//         };
//         save(subtaskObj);
//         setSubtaskName('');
//         setDescription('');
//         setCompleted(false);
//         toggle();
//     };

//     return (
//         <Modal isOpen={modal} toggle={toggle}>
//             <ModalHeader toggle={toggle}>Add a new subtask</ModalHeader>
//             <ModalBody>
//                 <form>
//                     <div className='form-group'>
//                         <label htmlFor='subtaskName'>Subtask Name</label>
//                         <input
//                             id='subtaskName'
//                             type='text'
//                             className='form-control'
//                             style={{marginBottom: '7px'}}
//                             value={subtaskName}
//                             onChange={handleChange}
//                             name='subtaskName'
//                         />
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='subtaskDescription'>
//                             Subtask Description
//                         </label>
//                         <textarea
//                             id='subtaskDescription'
//                             rows={5}
//                             className='form-control'
//                             value={description}
//                             onChange={handleChange}
//                             name='description'
//                         ></textarea>
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='completed'>Completed</label>
//                         <input
//                             id='completed'
//                             type='checkbox'
//                             className='form-check-input'
//                             style={{marginLeft: '7px'}}
//                             checked={completed}
//                             onChange={handleChange}
//                             name='completed'
//                         />
//                     </div>
//                 </form>
//             </ModalBody>
//             <ModalFooter>
//                 <Button color='primary' onClick={handleSave}>
//                     Add
//                 </Button>{' '}
//                 <Button color='secondary' onClick={toggle}>
//                     Cancel
//                 </Button>
//             </ModalFooter>
//         </Modal>
//     );
// };

// export default AddSubtask;
// import React, {useState} from 'react';
// import axios from 'axios';
// import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
// import Subtask from '../components/Subtask';

// interface Props {
//     modal: boolean;
//     toggle: () => void;
//     addSubtask: (subtask: Subtask) => void; // Function to add subtask
// }
// const AddSubtask: React.FC<Props> = ({modal, toggle, addSubtask}) => {
//     const [subtaskName, setSubtaskName] = useState<string>('');
//     const [subtaskDescription, setSubtaskDescription] = useState<string>('');
//     const [subtaskComplete, setSubtaskComplete] = useState<boolean>(false);

//     const handleChange = (
//         e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     ) => {
//         const {name, value, type, checked} = e.target;

//         if (type === 'checkbox') {
//             setSubtaskComplete(checked);
//         } else if (name === 'subtaskName') {
//             setSubtaskName(value);
//         } else if (name === 'subtaskDescription') {
//             setSubtaskDescription(value);
//         }
//     };

//     const handleAddSubtask = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         const subtask: Subtask = {
//             name: subtaskName,
//             description: subtaskDescription,
//             completed: subtaskComplete,
//         };
//         try {
//             const response = await fetch(
//                 `https://localhost:7149/api/Subtask/AddSubtask`,
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(subtask),
//                 },
//             );

//             if (!response.ok) {
//                 throw new Error('Failed to add subtask');
//             }

//             // If the subtask is added successfully, you can perform additional actions here
//             // For example, close the modal
//             toggle();
//             // Trigger the parent component to update the list of subtasks
//             addSubtask(subtask);
//         } catch (error) {
//             console.error('Error adding subtask:', error);
//             // Handle error
//         }
//     };

//     return (
//         <Modal isOpen={modal} toggle={toggle}>
//             <ModalHeader toggle={toggle}>Add Subtask</ModalHeader>
//             <ModalBody>
//                 <div className='form-group'>
//                     <label>Subtask Name</label>
//                     <input
//                         type='text'
//                         className='form-control'
//                         value={subtaskName}
//                         onChange={handleChange}
//                         name='subtaskName'
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Description</label>
//                     <textarea
//                         rows={5}
//                         className='form-control'
//                         value={subtaskDescription}
//                         onChange={handleChange}
//                         name='subtaskDescription'
//                     ></textarea>
//                 </div>
//             </ModalBody>
//             <ModalFooter>
//                 <Button color='primary' onClick={handleAddSubtask}>
//                     Add
//                 </Button>{' '}
//                 <Button color='secondary' onClick={toggle}>
//                     Cancel
//                 </Button>
//             </ModalFooter>
//         </Modal>
//     );
// };

// export default AddSubtask;
// const AddSubtask = ({taskId}: {taskId: number}) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [completed, setCompleted] = useState(false);

//     const handleSubmit = async (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     ) => {
//         e.preventDefault();

//         try {
//             // Call the backend API to add the subtask
//             await axios.post('https://localhost:7149/api/Subtask/AddSubtask', {
//                 name,
//                 description,
//                 completed,
//                 taskId,
//             });

//             // Reset the form fields after successful submission
//             setName('');
//             setDescription('');
//             setCompleted(false);

//             // Optionally, you can perform any additional actions here, such as updating the UI
//         } catch (error) {
//             // Handle errors here (e.g., display error message to the user)
//             console.error('Error adding subtask:', error);
//         }
//     };

//     return (
//         <Modal isOpen={modal} toggle={toggle}>
//             <ModalHeader toggle={toggle}>Update Task</ModalHeader>
//             <ModalBody>
//                 <div className='form-group'>
//                     <label>Task Name</label>
//                     <input
//                         type='text'
//                         className='form-control'
//                         value={taskName}
//                         onChange={handleChange}
//                         name='taskName'
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Description</label>
//                     <textarea
//                         rows={5}
//                         className='form-control'
//                         value={description}
//                         onChange={handleChange}
//                         name='description'
//                     ></textarea>
//                 </div>
//                 <div className='form-group'>
//                     <label>Duration</label>
//                     <input
//                         type='number'
//                         min={0}
//                         className='form-control'
//                         value={duration}
//                         onChange={handleChange}
//                         name='duration'
//                     />
//                 </div>
//             </ModalBody>
//             <ModalFooter>
//                 <Button color='primary' onClick={handleUpdate}>
//                     Update
//                 </Button>{' '}
//                 <Button color='secondary' onClick={toggle}>
//                     Cancel
//                 </Button>
//             </ModalFooter>
//         </Modal>
//         // <form onSubmit={handleSubmit}>
//         //     <input
//         //         type='text'
//         //         placeholder='Name'
//         //         value={name}
//         //         onChange={(e) => setName(e.target.value)}
//         //     />
//         //     <input
//         //         type='text'
//         //         placeholder='Description'
//         //         value={description}
//         //         onChange={(e) => setDescription(e.target.value)}
//         //     />
//         //     <label>
//         //         Completed:
//         //         <input
//         //             type='checkbox'
//         //             checked={completed}
//         //             onChange={(e) => setCompleted(e.target.checked)}
//         //         />
//         //     </label>
//         //     <button type='submit'>Add Subtask</button>
//         // </form>
//     );
// };

// export default AddSubtask;
import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

interface Props {
    modal: boolean;
    toggle: () => void;
    addSubtask: (subtaskObj: PartialSubtask) => void;
    taskId: number; // Task ID to which the subtask belongs
}

interface PartialSubtask {
    name: string;
    description: string;
    completed: boolean;
    taskId: number;
}

const AddSubtask: React.FC<Props> = ({modal, toggle, addSubtask, taskId}) => {
    const [subtaskName, setSubtaskName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false); // Initialize completed state to false

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = e.target;

        if (name === 'subtaskName') {
            setSubtaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'completed') {
            setCompleted(!completed); // Toggle the completed state
        }
    };

    const handleAddSubtask = () => {
        const subtaskObj: PartialSubtask = {
            name: subtaskName,
            description: description,
            completed: completed,
            taskId: taskId, // Assign the provided taskId
        };
        addSubtask(subtaskObj);
        // Clear input fields and close the modal
        setSubtaskName('');
        setDescription('');
        setCompleted(false);
        toggle();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Subtask</ModalHeader>
            <ModalBody>
                <div className='form-group'>
                    <label>Subtask Name</label>
                    <input
                        type='text'
                        className='form-control'
                        value={subtaskName}
                        onChange={handleChange}
                        name='subtaskName'
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
                <div className='form-check'>
                    <input
                        type='checkbox'
                        className='form-check-input'
                        checked={completed}
                        onChange={handleChange}
                        name='completed'
                    />
                    <label className='form-check-label'>Completed</label>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleAddSubtask}>
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
