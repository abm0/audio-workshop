import React from "react"
import { Outlet } from "react-router-dom";

interface IAuthLayout {
    headerContent?: React.ReactNode;
}

const AuthLayout = ({ headerContent }: IAuthLayout) => (
    <>
        <header className="fixed z-10 w-full bg-teal-600 text-white py-4 h-20">
            <div className="container mx-auto px-4 max-w-screen-lg">
                {headerContent}
            </div>
        </header>
        <main className="relative flex flex-col justify-center h-screen bg-gray-50 dark:md:bg-gray-900 z-0">
            <div className="relative bg-gray-50 px-6 pt-8 pb-8 md:shadow-xl md:ring-1 md:w-160 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <Outlet />
            </div>
        </main>
    </>
)

export { AuthLayout };
