import React from 'react';
import { Bell, Search, Menu, UserCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Header = ({ toggleSidebar, searchTerm, setSearchTerm }) => {
    const { user } = useAuth();
    return (
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 h-20 flex items-center justify-between px-3 sm:px-4 lg:px-10 w-full max-w-full">
            <div className="flex items-center gap-2 sm:gap-6">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSidebar}
                    className="p-3 lg:hidden text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </motion.button>
                <div className="hidden sm:block">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        System Overview
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                    </h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">SJCET Enterprise Node</p>
                </div>
                <h1 className="text-xl font-black text-slate-900 sm:hidden">HRMS</h1>
            </div>

            <div className="flex items-center gap-2 lg:gap-6">
                <div className="relative hidden md:flex items-center group">
                    <Search className="absolute left-4 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search employee directory..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-slate-100/50 border border-transparent focus:border-indigo-200 focus:bg-white rounded-2xl text-sm w-72 focus:ring-4 focus:ring-indigo-100/50 transition-all outline-none font-medium"
                    />
                </div>

                <div className="flex items-center gap-3 mr-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => alert('Clear Logs: Institutional security protocols active.')}
                        className="relative p-3 text-slate-600 bg-slate-100/50 hover:bg-slate-100 rounded-2xl transition-all"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                    </motion.button>
                </div>

                <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => alert(`Active Session: ${user?.name || 'Root Admin'}`)}
                    className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all"
                >
                    <div className="hidden lg:block text-right">
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{user?.name || 'Admin'}</p>
                        <p className="text-[10px] text-primary-600 uppercase tracking-widest font-black">{user?.role || 'Root Admin'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <UserCircle className="w-7 h-7 text-white" />
                    </div>
                </motion.button>
            </div>
        </header>
    );
};

export default Header;
