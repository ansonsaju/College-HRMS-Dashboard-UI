import React from 'react';

const TableSkeleton = () => {
    return (
        <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-100">
                    <div className="h-4 w-16 bg-slate-200 rounded"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                    <div className="flex-1"></div>
                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                    <div className="h-4 w-16 bg-slate-200 rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;
