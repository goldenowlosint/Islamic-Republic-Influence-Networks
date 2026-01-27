import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex h-screen w-full bg-black text-white overflow-hidden font-inter">
            <Navbar />
            <div className="flex-1 ml-20 relative h-full overflow-hidden flex flex-col">
                <main className="flex-1 relative overflow-hidden">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
