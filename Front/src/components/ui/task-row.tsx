import React from 'react';
import Toggle from './toggle';

export type TaskRowProps = {
    id: string | number;
    title: string;
    description?: string;
    completed: boolean;
    onToggle: (id: string | number, checked: boolean) => void;
};

const TaskRow: React.FC<TaskRowProps> = ({ id, title, description, completed, onToggle }) => {
    return (
        <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2 border border-gray-100 dark:border-gray-700">
            <Toggle checked={completed} onChange={(checked) => onToggle(id, checked)} />
            <div className="flex-1 min-w-0">
                <div className={`font-medium text-gray-900 dark:text-gray-100 ${completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>{title}</div>
                {description && <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>}
            </div>
        </div>
    );
};

export default TaskRow; 