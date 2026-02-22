import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, label, value, colorClass, trend }) => {
    return (
        <motion.div
            whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: -5,
                transition: { duration: 0.2 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="perspective-1000"
        >
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-primary-100/50 transition-all duration-300 preserve-3d">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-2xl ${colorClass} shadow-inner`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${trend.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {trend.isUp ? '▲' : '▼'} {trend.value}%
                        </div>
                    )}
                </div>
                <div style={{ translateZ: 20 }}>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
