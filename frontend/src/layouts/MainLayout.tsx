import React from 'react';
import { Outlet } from 'react-router-dom';

interface IMainLayout {
    headerContent?: React.ReactNode;
}

const MainLayout = ({ headerContent = null }: IMainLayout) => (
    <>
        <header className="fixed z-10 w-full bg-teal-600 text-white py-4 h-20">
            <div className="container mx-auto px-4 max-w-screen-lg">
                {headerContent}
            </div>
        </header>
        <main id="main" className="relative min-h-full pt-20 bg-gray-50 dark:bg-gray-900">
            <div className="bg-white p-8 shadow-md max-w-screen-lg mx-auto min-h-full">
                <Outlet />
            </div>
        </main>
    </>
);

export { MainLayout };
