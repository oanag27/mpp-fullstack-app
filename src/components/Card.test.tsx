//import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card component', () => {
    const mockTask = {
        id: 1,
        name: 'Task 1',
        description: 'Description for Task 1',
        duration: 200,
    };

    it('opens edit modal when edit icon is clicked', () => {
        render(
            <Card
                taskObj={mockTask}
                index={0}
                deleteTask={() => {}}
                updateListArray={() => {}}
            />,
        );

        fireEvent.click(screen.getByTestId('edit-icon'));

        expect(screen.getByText('Update Task')).toBeInTheDocument();
    });
    it('calls deleteTask when delete icon is clicked', () => {
        const deleteTaskMock = jest.fn();

        render(
            <Card
                taskObj={mockTask}
                index={0}
                deleteTask={deleteTaskMock}
                updateListArray={() => {}}
            />,
        );

        fireEvent.click(screen.getByTestId('delete-icon'));

        expect(deleteTaskMock).toHaveBeenCalledTimes(1);
        expect(deleteTaskMock).toHaveBeenCalledWith(0);
    });
});
