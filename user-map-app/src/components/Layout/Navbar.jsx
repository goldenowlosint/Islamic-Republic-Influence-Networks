import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Users, BarChart2, Clock, Menu } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { path: '/', icon: Map, label: 'Map' },
        { path: '/users', icon: Users, label: 'Directory' },
        { path: '/insights', icon: BarChart2, label: 'Insights' },
        { path: '/timeline', icon: Clock, label: 'Timeline' },
    ];

    return (
        <nav className="fixed left-0 top-0 h-screen w-20 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 flex flex-col items-center z-[2000] shadow-2xl overflow-y-auto custom-scrollbar">
            {/* Top Logo Section with padding */}
            <div className="pt-8 mb-12 flex-none">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="text-white font-bold text-xl">U</span>
                </div>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col gap-6 w-full px-3 pb-8 flex-none">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                        p-3 rounded-xl transition-all duration-300 group relative flex justify-center
                        ${isActive
                                ? 'bg-blue-600/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                    `}
                    >
                        <item.icon size={24} strokeWidth={2} />

                        {/* Tooltip */}
                        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 pointer-events-none shadow-xl">
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
