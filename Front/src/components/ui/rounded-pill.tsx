type RoundedProps = {
    title: string;
};

function RoundedPill({ title }: RoundedProps) {
    return (
        <div
            className="relative cursor-pointer rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 me-2
        dark:text-gray-200 dark:ring-gray-300 dark:hover:ring-gray-50
        ">
            {title}{' '}
        </div>
    );
}

export default RoundedPill;
