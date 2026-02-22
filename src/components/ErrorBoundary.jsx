import React, { Component } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

import { SystemPhysician } from '../utils/SystemPhysician';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        // Silent Auto-Heal attempt for transient errors
        const diagnostics = SystemPhysician.diagnose();
        if (diagnostics.corruptedKeys.length > 0) {
            SystemPhysician.treat(diagnostics);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldAlert className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mb-2">Security Interruption</h1>
                        <p className="text-slate-500 mb-6 font-medium font-inter">An unexpected exception was caught. The System Physician is standing by to repair your session.</p>
                        <button
                            onClick={() => SystemPhysician.emergencyRecovery()}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95"
                        >
                            <RefreshCw className="w-4 h-4 animate-spin-slow" />
                            Auto-Heal & Restart
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
