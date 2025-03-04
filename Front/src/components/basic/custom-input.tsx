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
    const errorClassNames =
        'ring-1 ring-inset ring-red-500 placeholder:text-red-300 text-red-500 focus:ring-red-500 sm:text-sm sm:leading-6 border border-red-200 ';

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-gray-400 ">
                {label}
            </label>
            <input
                className={`${
                    meta.error && errorClassNames
                } mt-2 focus:outline-1 focus:outline-gray-500 dark:bg-gray-700 outline-0 dark:shadow-sm dark:ring-white/30 dark:text-white leading-flight rounded-md ring-1 ring-inset py-2 px-2 dark:border-0 dark:focus:ring-0 ${
                    !meta.error && 'ring-gray-300 dark:text-gray-300 sm:text-sm'
                }
                
                ${meta.touched && !meta.error && ' ring-green-500 '}
                  `}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? <div className="error text-sm text-red-600">{meta.error}</div> : null}
        </>
    );
}

export default CustomTextInput;
