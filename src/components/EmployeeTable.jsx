import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, Filter, Download, Trash2 } from 'lucide-react';
import TableSkeleton from './TableSkeleton';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeTable = ({ employees, searchTerm, setSearchTerm, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showActionsId, setShowActionsId] = useState(null);
    const itemsPerPage = 5;

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

    // Reset pagination on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const exportToCSV = () => {
        const headers = ['Employee ID', 'Name', 'Department', 'Designation', 'Status'];
        const csvRows = [
            headers.join(','),
            ...employees.map(emp => [
                emp.id,
                `"${emp.name}"`,
                `"${emp.department}"`,
                `"${emp.designation}"`,
                emp.status
            ].join(','))
        ];
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `SJCET_Staff_Export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden relative z-20">
            <div className="p-6 lg:p-10 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Staff Directory</h2>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Database</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter staff members..."
                            className="pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm w-full sm:w-80 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium focus:bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => alert('Advanced Filter System: Coming in Phase 2')}
                            className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <Filter className="w-5 h-5" />
                        </button>
                        <button
                            onClick={exportToCSV}
                            className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors group/btn"
                            title="Export to CSV"
                        >
                            <Download className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
                {loading ? (
                    <TableSkeleton />
                ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
                                <th className="px-10 py-6">ID Node</th>
                                <th className="px-10 py-6">Identity</th>
                                <th className="px-10 py-6 text-center">Division</th>
                                <th className="px-10 py-6 text-center">Role</th>
                                <th className="px-10 py-6 text-center">Protocol</th>
                                <th className="px-10 py-6 text-right">Access</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence mode="popLayout">
                                {currentEmployees.map((emp, index) => (
                                    <motion.tr
                                        key={emp.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-slate-50/80 transition-colors group relative"
                                    >
                                        <td className="px-10 py-6 font-black text-xs text-indigo-600 tracking-widest">{emp.id}</td>
                                        <td className="px-10 py-6">
                                            <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{emp.name}</p>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{emp.department}</span>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{emp.designation}</span>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${emp.status === 'Active'
                                                ? 'bg-green-100 text-green-700 shadow-sm shadow-green-200/50'
                                                : 'bg-orange-100 text-orange-700 shadow-sm shadow-orange-200/50'
                                                }`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right relative">
                                            <div className="flex justify-end relative">
                                                <button
                                                    onClick={() => setShowActionsId(showActionsId === emp.id ? null : emp.id)}
                                                    className="p-2 hover:bg-slate-100 text-slate-400 rounded-xl transition-all"
                                                >
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>

                                                {showActionsId === emp.id && (
                                                    <>
                                                        <div
                                                            className="fixed inset-0 z-40 bg-transparent"
                                                            onClick={() => setShowActionsId(null)}
                                                        />
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2"
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    onDelete(emp.id);
                                                                    setShowActionsId(null);
                                                                }}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all text-xs font-black uppercase tracking-widest"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                Terminate Record
                                                            </button>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {currentEmployees.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-10 py-20 text-center">
                                        <Search className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching personnel cycles identified</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {!loading && filteredEmployees.length > 0 && (
                <div className="p-8 lg:p-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Data Chunk <span className="text-slate-900 font-black px-1">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredEmployees.length)}</span> of <span className="text-slate-900 font-black">{filteredEmployees.length}</span> entries
                    </p>
                    <div className="flex gap-3">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="flex items-center gap-2 px-6 py-3.5 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Prev
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="flex items-center gap-2 px-6 py-3.5 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeTable;
