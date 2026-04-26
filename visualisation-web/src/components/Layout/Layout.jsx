import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

import DatasetSelector from '../DatasetSelector';

const Layout = () => {
    return (
        <div className="flex h-screen w-full bg-black text-white overflow-hidden font-inter">
            <Navbar />
            <div className="flex-1 ml-20 relative h-full overflow-hidden flex flex-col">
                <div className="absolute top-4 right-6 z-50">
                    <DatasetSelector />
                </div>
                <main className="flex-1 relative overflow-hidden">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
