import './App.css';
import './components/Task';
import Task from './components/Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Chart from './components/Chart';
import {useState, useEffect} from 'react';
import Subtask from './components/Subtask';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import Register from './components/Register';
function App() {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        const initialTaskList: Task[] = [
            {
                id: 1,
                name: 'Task 1',
                description: 'Description for Task 1',
                duration: 10,
            },
            {
                id: 2,
                name: 'Task 2',
                description: 'Description for Task 2',
                duration: 7,
            },
            {
                id: 3,
                name: 'Task 3',
                description: 'Description for Task 3',
                duration: 20,
            },
            {
                id: 4,
                name: 'Task 4',
                description: 'Description for Task 4',
                duration: 100,
            },
        ];
        setTaskList(initialTaskList);
    }, []);
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/task' element={<Task />} />
                    <Route
                        path='/chart'
                        element={<Chart taskList={taskList} />}
                    />
                    <Route path='/subtask' element={<Subtask></Subtask>} />
                    <Route
                        path='/task-details/:taskName'
                        element={<TaskDetails />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
