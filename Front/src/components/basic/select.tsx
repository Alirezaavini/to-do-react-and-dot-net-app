type item = {
    id: string | number;
    title?: string | null;
};

type SelectProps = {
    items: [item];
    onChange: (e: any) => {};
    defaultValue: string | number | undefined;
};

function Select({ items, onChange, defaultValue }: SelectProps) {
    return (
        <select
            id="lang"
            name="lang"
            onChange={(e) => {
                onChange(e);
            }}
            defaultValue={defaultValue}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6  dark:text-gray-200 dark:ring-gray-400 dark:bg-gray-800">
            <option>fa</option>
            <option>en</option>
        </select>
    );
}

export default Select;
