import React from 'react';

interface Subtask {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

interface Props {
    subtaskObj: Subtask;
}

const SubtaskCard: React.FC<Props> = ({subtaskObj}) => {
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
                    {subtaskObj.name}
                </span>
            </div>
        </div>
    );
};

export default SubtaskCard;
