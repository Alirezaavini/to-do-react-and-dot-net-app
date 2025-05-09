import { useField } from 'formik';
import { ReactNode } from 'react';

type inputProps = {
    label: ReactNode;
    id?: string;
    name?: string;
    type?: string;
    className?: string;
};

function CustomTextInput({ label, ...props }: inputProps) {
    const [field, meta] = useField(props);

    const errorClassNames = ['ring-red-500', 'placeholder:text-red-300', 'text-red-500'].join(' ');

    const baseClassNames = [
        'mt-2',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-inset',
        'dark:bg-gray-700',
        'outline-0',
        'dark:shadow-sm',
        'dark:ring-white/30',
        'dark:text-white',
        'leading-flight',
        'rounded-md',
        'ring-1',
        'ring-inset',
        'py-2',
        'px-2',
        'dark:border-0',
        'dark:focus:ring-0',
    ];

    const normalClassNames = ['ring-gray-300', 'dark:text-gray-300', 'sm:text-sm'].join(' ');

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-gray-400">
                {label}
            </label>
            <input
                className={[meta.error && meta.touched ? errorClassNames : normalClassNames, ...baseClassNames, props.className || ''].join(
                    ' '
                )}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? <div className="error text-sm text-red-600">{meta.error}</div> : null}
        </>
    );
}

export default CustomTextInput;
