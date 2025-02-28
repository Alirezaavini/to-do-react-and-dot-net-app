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
        'ring-1 ring-inset ring-red-500 placeholder:text-red-300 text-red-500 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6';

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-gray-500 ">
                {label}
            </label>
            <input
                className={`mt-2 leading-flight rounded-md ring-1 ring-inset py-1.5 px-2 focus:ring-indigo-600 ${
                    !meta.error && 'ring-gray-300 dark:text-gray-300 sm:text-sm'
                }
                ${meta.touched && !meta.error && 'ring-green-500 '}
                  ${meta.touched && meta.error && errorClassNames}`}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? <div className="error text-sm text-red-600">{meta.error}</div> : null}
        </>
    );
}

export default CustomTextInput;
