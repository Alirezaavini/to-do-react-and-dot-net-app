import { ReactNode } from 'react';

type CardProps = {
    title?: ReactNode;
    children?: ReactNode;
    classNames?: string;
};

function BasicCard({ title, children, classNames }: CardProps) {
    let cardClassNames = 'p-2 border-b border-stone-200 text-black dark:text-white rounded-t-xl flex gap-2 align-middle items-center';

    return (
        <>
            <div className={`bg-white border border-stone-200 rounded-2xl dark:bg-gray-900 dark:border-gray-600 ${classNames}`}>
                <div className={`${cardClassNames}`}>{title}</div>
                {children}
            </div>
        </>
    );
}

export default BasicCard;
