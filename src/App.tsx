import './App.css';
import './components/Task';
import Task from './components/Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Chart from './components/Chart';
import {useState, useEffect} from 'react';
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
                    <Route path='/' element={<Task />} />
                    <Route
                        path='/chart'
                        element={<Chart taskList={taskList} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
