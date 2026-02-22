import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, CreditCard, Settings, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { logout } = useAuth();
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Employees', path: '/employees' },
        { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
        { icon: CreditCard, label: 'Payroll', path: '/payroll' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl`}>
            <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-900 to-[#020617]">
                <div className="flex items-center gap-4 px-8 py-10">
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="p-3 bg-indigo-500 rounded-2xl shadow-xl shadow-indigo-500/20"
                    >
                        <GraduationCap className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className="text-2xl font-black tracking-tighter leading-none">
                        SJCET<br />
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-[0.3em]">HRMS</span>
                    </span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={toggleSidebar}
                            className={({ isActive }) => `group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${isActive
                                ? 'bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-3">
                                        <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-500' : 'group-hover:text-indigo-400'}`} />
                                        <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                    </div>
                                    {isActive && <motion.div layoutId="active-pill" className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-5 py-4 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-2xl border border-white/5 transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-sm">Terminate Session</span>
                    </motion.button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
