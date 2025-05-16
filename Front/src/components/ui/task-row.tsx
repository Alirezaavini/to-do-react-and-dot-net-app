import React from 'react';
import Toggle from './toggle';
import { TrashIcon } from '@heroicons/react/24/outline';

export type TaskRowProps = {
    id: string | number;
    title: string;
    description?: string;
    loading?: boolean;
    completed: boolean;
    onToggle: (id: string | number, checked: boolean) => void;
    onRemove: (id: string | number) => void;
};

const TaskRow: React.FC<TaskRowProps> = ({ id, title, description, completed, loading, onToggle, onRemove }) => {
    return (
        <div className="cursor-pointer hover:bg-gray-100 flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2 border border-gray-100 dark:border-gray-700">
            <Toggle checked={completed} onChange={(checked) => onToggle(id, checked)} disabled={loading} />
            <div className="flex-1 min-w-0">
                <div
                    className={`font-medium text-gray-900 dark:text-gray-100 ${
                        completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
                    }`}>
                    {title}
                </div>
                {description && <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>}
            </div>
            <TrashIcon className="size-6 text-red-500 cursor-pointer" onClick={() => !loading && onRemove(id)} />
        </div>
    );
};

export default TaskRow;
