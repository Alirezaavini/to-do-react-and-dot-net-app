type buttonInputProps = {
    classNames?: string;
    title?: string;
    disabled?: boolean;
    onClick: VoidFunction;
    variant: 'contained' | 'outline';
    color: 'primary' | 'secondary' | 'info';
    size: 'sm' | 'md' | 'lg';
};

function Button({ classNames, title, disabled = false, onClick, variant = 'contained', color = 'primary', size = 'sm' }: buttonInputProps) {
    let customClassNames =
        'px-3 py-2 rounded-sm hover:shadow-md cursor-pointer transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2';

    switch (color) {
        case 'info':
            customClassNames += 'border border-gray-200 ';

            break;
        case 'secondary':
            break;
        case 'primary':
            customClassNames += 'shadow bg-indigo-600 hover:bg-indigo-500 text-gray-100';
            break;
    }

    if (variant === 'outline') customClassNames += ' dark:text-gray-200 dark:hover:bg-gray-600';

    switch (size) {
        case 'sm':
            customClassNames += ' text-sm ';
            break;
        case 'md':
            customClassNames += ' text-md';
            break;
        case 'lg':
            customClassNames += ' text-lg';
            break;
    }

    return (
        <button
            onClick={() => onClick()}
            disabled={disabled}
            className={`${classNames} ${customClassNames} focus:ring-4 focus:ring-gray-400`}>
            {title}
        </button>
    );
}

export default Button;
