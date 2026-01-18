import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="flex h-screen w-full bg-black text-white overflow-hidden font-inter">
            <Navbar />
            <div className="flex-1 ml-20 relative h-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
