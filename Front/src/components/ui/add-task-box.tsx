import React from 'react';
import Toggle from './toggle';
import { CalendarIcon, BellIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface AddTaskBoxProps {
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
    checked?: boolean;
    onRadioClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
}

const AddTaskBox: React.FC<AddTaskBoxProps> = ({ value, onChange, onAdd, checked = false, onRadioClick, loading = false, disabled = false }) => {
    return (
        <div className="bg-white rounded-xl shadow border border-gray-100  mx-auto mt-4">
            <div className="flex items-center px-6 py-4">
                <Toggle checked={checked} onChange={onRadioClick || (() => {})} className="me-4" />
                <input
                    type="text"
                    className="flex-1 border-none outline-none bg-transparent text-lg placeholder-gray-500"
                    placeholder="Add a task"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    disabled={disabled || loading}
                />
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3 rounded-b-xl">
                <div className="flex gap-6 text-gray-500">
                    <button type="button" className="hover:text-indigo-600 p-1" tabIndex={-1}><CalendarIcon className="w-6 h-6" /></button>
                    <button type="button" className="hover:text-indigo-600 p-1" tabIndex={-1}><BellIcon className="w-6 h-6" /></button>
                    <button type="button" className="hover:text-indigo-600 p-1" tabIndex={-1}><ArrowPathIcon className="w-6 h-6" /></button>
                </div>
                <button
                    type="button"
                    className="px-4 py-1 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    onClick={onAdd}
                    disabled={disabled || loading || !value.trim()}
                >
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default AddTaskBox; 