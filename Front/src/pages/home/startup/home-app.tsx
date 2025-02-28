import { useNavigate } from 'react-router-dom';
import Navigation from '../../../components/ui/navigation';
import RoundedPill from '../../../components/ui/rounded-pill';
import BlurBackground from '../../../components/ui/blur-background';
/* eslint-disable @typescript-eslint/no-unused-vars */

export default function HomeApp() {
    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <Navigation />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <BlurBackground />
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <RoundedPill title="multi language" />
                        <RoundedPill title="dark mode" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">To Do App</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">A simple react application and .Net API</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                onClick={() => navigate('/login')}
                                className="rounded-md  bg-indigo-600 px-4.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Login
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                                Github repo <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
