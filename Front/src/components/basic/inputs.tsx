import { ChevronDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

function Inputs() {
    return (
        <>
            <div>
                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                    Price
                </label>
                <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
                        <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="0.00"
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        />
                        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                            <select
                                id="currency"
                                name="currency"
                                aria-label="Currency"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option>USD</option>
                                <option>CAD</option>
                                <option>EUR</option>
                            </select>
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div id='c-input'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        defaultValue="adamwathan"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        aria-invalid="true"
                        aria-describedby="email-error"
                        className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 focus:outline-none placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
                    </div>
                </div>
                <p id="email-error" className="mt-2 text-sm text-red-600">
                    Not a valid email address.
                </p>
            </div>
        </>
    );
}

export default Inputs;
