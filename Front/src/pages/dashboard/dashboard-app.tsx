import { ToDoApi } from '../../api/to-do-api';
import { notify } from '../../components/basic/toast';
import React, { useEffect, useState } from 'react';
import TaskRow from '../../components/ui/task-row';
import AddTaskBox from '../../components/ui/add-task-box';
import { AnimatePresence, motion } from 'framer-motion';

const initialTasks = [
    { id: 1, title: 'Buy groceries', description: 'Milk, Bread, Eggs, Cheese', completed: false },
    { id: 2, title: 'Finish project', description: 'Complete the dashboard UI', completed: true },
    { id: 3, title: 'Call John', description: 'Discuss the new requirements', completed: false },
];

type TaskType = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

function DashboardApp() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState(false);
    const [newTask, setNewTask] = useState("");


    const handleToggle = (id: number, checked: boolean) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: checked } : task))
        );
    };


    const handleAdd = () => {
        setTasks((prev) => [...prev, { id: prev.length + 1, title: newTask, description: '', completed: false }]);
        setNewTask('');
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            ToDoApi.getToDo()
                .then((s) => setTasks(s))
                .catch(notify.error)
                .then(() => setLoading(false));
        }, 1000);
    }, []);

    return <>
        <div className='mb-3'>
            <AddTaskBox onAdd={handleAdd} value={newTask} onChange={(v) => { setNewTask(v) }} />
        </div>

        {loading ? <div>Loading...</div> : (
            <AnimatePresence>
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TaskRow
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            completed={task.completed}
                            onToggle={(id: number | string, checked: boolean) => handleToggle(Number(id), checked)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        )}

    </>

}

export default DashboardApp;
