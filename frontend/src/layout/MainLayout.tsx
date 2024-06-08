import React from 'react';
import { Outlet } from 'react-router-dom';

interface IMainLayout {
    headerContent?: React.ReactNode;
}

export const MainLayout = ({ headerContent = null }: IMainLayout) => (
    <>
        <header className="bg-green-400 text-white py-4">
            <div className="container mx-auto px-4">
                {headerContent}
            </div>
        </header>
        <main className="relative min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md max-w-screen-lg mx-auto">
                <Outlet />
            </div>
        </main>
    </>
);