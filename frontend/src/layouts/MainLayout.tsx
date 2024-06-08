import React from 'react';
import { Outlet } from 'react-router-dom';

interface IMainLayout {
    headerContent?: React.ReactNode;
}

const MainLayout = ({ headerContent = null }: IMainLayout) => (
    <>
        <header className="fixed z-10 w-full bg-teal-600 text-white py-4 h-20">
            <div className="container mx-auto px-4">
                {headerContent}
            </div>
        </header>
        <main className="relative h-screen pt-20 bg-gray-50">
            <div className="bg-white p-8 shadow-md max-w-screen-lg mx-auto h-full">
                <Outlet />
            </div>
        </main>
    </>
);

export { MainLayout };
