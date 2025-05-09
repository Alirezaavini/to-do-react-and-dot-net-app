import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useLayoutDirection } from '../../app/LayoutDirectionContext';
import Sidebar from './sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/stores/store';
import { userInfoActions } from '../../app/stores/user-info-slice';
import { T } from '../../components/basic/text';
import { notify } from '../../components/basic/toast';
import { t } from 'i18next';

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
];

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userData = useSelector((state: RootState) => state.userInfo);
    const dispatch = useDispatch();
    const navigae = useNavigate();

    const onChangeSidebar = (state: boolean) => {
        setSidebarOpen(state);
    };

    const logOut = () => {
        dispatch(userInfoActions.logOut());
        notify.info(t('signed-out'));
        navigae('/login');
    };

    useEffect(() => {
        if (!userData || !userData?.name) navigae('/login');
    }, []);

    return (
        <>
            <div>
                <Sidebar sidebarOpen={sidebarOpen} onChangeSidebar={onChangeSidebar} />

                <div className="lg:ps-72 overflow-hidden ">
                    <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8 ">
                        <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                            </button>

                            {/* Separator */}
                            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 ">
                                <form action="#" method="GET" className="relative  flex-1 hidden lg:flex">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <MagnifyingGlassIcon
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-y-0 start-0 h-full w-5 text-gray-400"
                                    />
                                    <input
                                        id="search-field"
                                        name="search"
                                        type="search"
                                        placeholder="Search..."
                                        className=" focus:outline-none block h-full w-full border-0 py-0 ps-8 pe-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    />
                                </form>
                                <div className="flex items-center gap-x-4 lg:gap-x-6 min-w-full justify-between p-2">
                                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>

                                    {/* Separator */}
                                    <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative justify-self-end mx-6">
                                        <MenuButton className="-m-1.5 flex items-center p-1.5 ">
                                            <span className="sr-only">Open user menu</span>
                                            <UserIcon className="size-5" />
                                            <span className="flex lg:items-center">
                                                <span aria-hidden="true" className="ms-4 text-sm font-semibold leading-6 text-gray-900">
                                                    {userData.name}
                                                </span>
                                                <ChevronDownIcon aria-hidden="true" className="ms-2 h-5 w-5 text-gray-400" />
                                            </span>
                                        </MenuButton>
                                        <MenuItems
                                            transition
                                            className="absolute end-0 z-10 mt-2.5 w-32 t rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in origin-top-righ">
                                            <MenuItem key="1" as="div" className="py-1 px-2 w-full min-w-full hover:bg-gray-100 cursor-pointer " onClick={() => logOut()}>
                                                <T>sign-out</T>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="py-10 ">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-08 ">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;
