import React from 'react';
import {Link} from 'react-router-dom';
import SubtaskCard from './SubtaskCard';
const Subtask = () => {
    const subtasks = [
        {id: 1, name: 'Subtask 1', description: 'descr1', completed: false},
        {id: 2, name: 'Subtask 2', description: 'descr2', completed: false},
        {id: 3, name: 'Subtask 3', description: 'descr2', completed: false},
    ];
    return (
        <div>
            <h1
                style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    paddingTop: '30px',
                }}
            >
                Subtask
            </h1>
            <button
                className='btn btn-primary mt-3'
                style={{
                    backgroundColor: '#fff',
                    color: '#3c3c3c',
                    marginRight: '15px',
                }}
            >
                Add Subtask
            </button>
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
            <div className='subtask-container'>
                {subtasks.map((subtask) => (
                    <SubtaskCard key={subtask.id} subtaskObj={subtask} />
                ))}
            </div>
        </div>
    );
};

export default Subtask;
