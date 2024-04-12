//import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Task from './Task';
import '@testing-library/jest-dom';
import localStorageMock from 'jest-localstorage-mock';

// Mock localStorage
global.localStorage = localStorageMock;

describe('Task component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders task list correctly', () => {
        render(<Task />);
        expect(screen.getByText('Task Manager')).toBeInTheDocument();
        expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    it('adds a new task to the task list', () => {
        render(<Task />);
        fireEvent.click(screen.getByText('Add Task'));
        fireEvent.change(screen.getByLabelText('Task Name'), {
            target: {value: 'New Task'},
        });
        fireEvent.change(screen.getByLabelText('Task Description'), {
            target: {value: 'Description for New Task'},
        });
        fireEvent.click(screen.getByText('Add'));
    });
});
