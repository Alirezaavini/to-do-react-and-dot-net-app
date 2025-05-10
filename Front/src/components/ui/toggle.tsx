import React from 'react';

type ToggleProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
};

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false, className = '' }) => {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${checked ? 'border-indigo-600' : 'border-gray-400'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
        >
            <span
                className={`block w-3 h-3 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-transparent'}`}
            />
        </button>
    );
};

export default Toggle; 