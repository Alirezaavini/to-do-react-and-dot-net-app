import { toDoApi } from '../../api/to-do-api';
import { notify } from '../../components/basic/toast';
import React, { useEffect, useState } from 'react';
import TaskRow from '../../components/ui/task-row';
import AddTaskBox from '../../components/ui/add-task-box';
import { AnimatePresence, motion } from 'framer-motion';

function DashboardApp() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleToggle = (id: number, checked: boolean) => {
        setLoading(true);
        toDoApi
            .completeTask(id)
            .then(() => setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))))
            .catch(notify.error)
            .then(() => setLoading(false));
    };

    const handleAdd = () => {
        setLoading(true);

        const newTask: CreateTaskRequestType = {
            title: newTaskTitle,
            description: '',
        };
        toDoApi
            .addTask(newTask)
            .then((res) => setTasks((prev) => [...prev, { id: res.id, title: newTaskTitle, description: '', isCompleted: false }]))
            .catch(notify.error)
            .then(() => setLoading(false));

        setNewTaskTitle('');
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            toDoApi
                .getToDo()
                .then((s) => setTasks(s))
                .catch(notify.error)
                .then(() => setLoading(false));
        }, 1000);
    }, []);

    return (
        <>
            <div className="mb-3">
                <AddTaskBox
                    loading={loading}
                    onAdd={handleAdd}
                    value={newTaskTitle}
                    onChange={(v) => {
                        setNewTaskTitle(v);
                    }}
                />
            </div>

            <AnimatePresence>
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}>
                        <TaskRow
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            completed={task.isCompleted}
                            loading={loading}
                            onToggle={(id: number | string, checked: boolean) => handleToggle(Number(id), checked)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    );
}

export default DashboardApp;
