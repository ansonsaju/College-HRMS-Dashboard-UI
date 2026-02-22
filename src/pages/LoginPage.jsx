import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, Mail, Eye, EyeOff, ShieldAlert, CheckCircle2, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticleField from '../components/ParticleField';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const result = login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
                setLoading(false);
            }
        }, 800);
    };

    const handleDemoAccess = () => {
        setEmail('admin@sjcet.ac.in');
        setPassword('admin123');
        setLoading(true);
        setTimeout(() => {
            login('admin@sjcet.ac.in', 'admin123');
            navigate('/');
        }, 600);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden font-inter">
            {/* Subtle Institutional Ambient Motion */}
            <ParticleField count={15} />

            <div className="w-full max-w-4xl grid md:grid-cols-10 bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_48px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden relative z-10 transition-all duration-700 hover:shadow-[0_64px_120px_-30px_rgba(0,0,0,0.12)]">

                {/* Left Branding Panel (Job-Ready Professionalism) */}
                <div className="md:col-span-4 bg-slate-900 p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex p-3.5 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30 mb-8 mt-2">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">SJCET</h1>
                        <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.3em] mb-12">Human Resource Node</p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 p-1 bg-emerald-500/20 rounded-full"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-0.5">Verified Infrastructure</h3>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Enterprise grade security protocols active for SJ-NET personnel.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 p-1 bg-indigo-500/20 rounded-full"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-0.5">Real-time Analytics</h3>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Monitoring personnel KPIs across institutional departments.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-10">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-black tracking-widest mb-1">Station Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <p className="text-[11px] text-emerald-400 font-bold">All Systems Operational</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Panel (Clean & Functional) */}
                <form onSubmit={handleSubmit} className="md:col-span-6 p-6 sm:p-12 bg-white flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Administrative Login</h2>
                        <p className="text-slate-500 font-medium text-sm">Please identify yourself to access the institutional dashboard.</p>
                    </div>

                    <div className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold shadow-sm"
                            >
                                <ShieldAlert className="w-5 h-5 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Authorized Email ID</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all text-slate-900 font-bold placeholder:text-slate-300 text-sm"
                                    placeholder="admin@sjcet.ac.in"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Security Token</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all text-slate-900 font-bold placeholder:text-slate-300 text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4.5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Authorize Session"
                            )}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-white px-4 text-slate-300 tracking-[0.4em]">Reviewer Node</span></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleDemoAccess}
                            className="w-full py-4 border-2 border-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 hover:border-indigo-100 transition-all flex items-center justify-center gap-3"
                        >
                            <Monitor className="w-4 h-4" />
                            One-Tap Presentation Access
                        </button>
                    </div>

                    <div className="mt-12 text-center border-t border-slate-50 pt-6">
                        <p className="text-[10px] text-slate-300 leading-relaxed uppercase font-black tracking-[0.3em]">
                            Restricted Access • St. Joseph's College of Engineering & Technology
                        </p>
                    </div>
                </form>
            </div>

            {/* Bottom Credits for Recruiter */}
            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-10Opacity-20">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.5em]">
                    Institutional Dashboard • Built by Sajus
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
