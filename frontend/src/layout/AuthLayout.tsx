import React from "react"
import { Outlet } from "react-router-dom";

interface IAuthLayout {
    headerContent?: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayout> = ({ headerContent }) => (
    <>
        <header className="bg-blue-600 text-white py-4">
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
)

export { AuthLayout };
