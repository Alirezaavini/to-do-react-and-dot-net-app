import React, { useState } from 'react';
import TaskRow from '../../components/ui/task-row';

const initialTasks = [
    { id: 1, title: 'Buy groceries', description: 'Milk, Bread, Eggs, Cheese', completed: false },
    { id: 2, title: 'Finish project', description: 'Complete the dashboard UI', completed: true },
    { id: 3, title: 'Call John', description: 'Discuss the new requirements', completed: false },
];

const TaskListPage: React.FC = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const handleToggle = (id: number, checked: boolean) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: checked } : task))
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Task List</h1>
           
        </div>
    );
};

export default TaskListPage; 