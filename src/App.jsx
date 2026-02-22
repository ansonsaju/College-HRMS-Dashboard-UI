import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import EmployeeTable from './components/EmployeeTable';
import AddEmployeeModal from './components/AddEmployeeModal';
import Toast from './components/Toast';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { Users, UserPlus, CalendarClock, ShieldAlert } from 'lucide-react';

import employeesData from './data.json';
import { motion } from 'framer-motion';
import { SystemPhysician } from './utils/SystemPhysician';

// Initial Health Check
const diagnostics = SystemPhysician.diagnose();
if (diagnostics.corruptedKeys.length > 0) {
  SystemPhysician.treat(diagnostics);
}

const Attendance = () => {
  const [isPresent, setIsPresent] = useState(false);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <div className="p-6 lg:p-12 space-y-12 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Duty Log</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Institutional Chronology Node</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPresent(!isPresent)}
          className={`px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl ${isPresent
            ? 'bg-emerald-500 text-white shadow-emerald-200'
            : 'bg-slate-900 text-white shadow-slate-200'
            }`}
        >
          {isPresent ? 'Active on Record' : 'Initiate Shift'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Weekly Cycle</h3>
          <div className="flex items-end justify-between h-48 gap-4 px-4">
            {days.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-4 h-full">
                <div className="flex-1 w-full bg-slate-100 rounded-2xl relative overflow-hidden flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${[85, 92, 78, 95, 88][i]}%` }}
                    className="w-full bg-indigo-500 rounded-2xl"
                    transition={{ delay: i * 0.1, duration: 1 }}
                  />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-xl font-black mb-6 tracking-tight relative z-10">Real-time Node Status</h3>
          <div className="space-y-6 relative z-10">
            {[
              { label: 'Security Gateway', status: 'Online', color: 'text-emerald-400' },
              { label: 'Biometric Mesh', status: 'Active', color: 'text-emerald-400' },
              { label: 'Sync Latency', status: '0.4ms', color: 'text-indigo-400' }
            ].map((node) => (
              <div key={node.label} className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{node.label}</span>
                <span className={`text-xs font-black uppercase tracking-widest ${node.color}`}>{node.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Payroll = ({ setToast }) => {
  const exportPayrollCSV = () => {
    const headers = ['Batch ID', 'Cycle', 'Processed Date', 'Status', 'Total Disbursement'];
    const rows = [
      ['#1021', 'Cycle Summary - Feb 2026', '22 Feb', 'Authorized', '$280,800'],
      ['#1022', 'Cycle Summary - Jan 2026', '22 Jan', 'Authorized', '$280,800'],
      ['#1023', 'Cycle Summary - Dec 2025', '22 Dec', 'Authorized', '$280,800']
    ];
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SJCET_Payroll_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ open: true, message: 'Institutional Payroll Report Downloaded' });
  };

  return (
    <div className="p-6 lg:p-12 space-y-12 max-w-[1200px] mx-auto w-full">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Credits Engine</h2>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Institutional Compensation Node</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Cycle Budget', value: '$842,400', icon: Users },
          { label: 'Next Batch', value: '05 Mar', icon: CalendarClock },
          { label: 'Compliance', value: '100%', icon: ShieldAlert }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100/50 group hover:border-indigo-500/30 transition-all">
            <stat.icon className="w-6 h-6 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-black text-slate-900 tracking-tight italic">Batch Protocol</h3>
          <button
            onClick={exportPayrollCSV}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            Generate Master CSV
          </button>
        </div>
        <div className="p-10 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-sm text-indigo-600 shadow-sm">
                  #{1020 + i}
                </div>
                <div>
                  <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">Cycle Summary - Feb 2026</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Processed: 22 Feb</p>
                </div>
              </div>
              <button
                onClick={() => setToast({ open: true, message: `Batch #${1020 + i} Authorization Detailed` })}
                className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:underline"
              >
                Authorized
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Settings = ({ setToast }) => {
  const [toggles, setToggles] = useState({
    mfa: true,
    audit: false,
    encryption: true
  });
  const { logout } = useAuth();

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    setToast({ open: true, message: `Protocol ${key.toUpperCase()} Updated` });
  };

  return (
    <div className="p-6 lg:p-12 space-y-12 max-w-[1200px] mx-auto w-full">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Node Preferences</h2>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Institutional Security Configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
        <div className="space-y-8">
          <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] ml-2">Administrative Cluster</h3>
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-10">
            {[
              { id: 'mfa', label: 'Institutional 2FA', desc: 'Secure node access via biometric mesh.' },
              { id: 'audit', label: 'Cycle Audit Logging', desc: 'Track every personnel interaction.' },
              { id: 'encryption', label: 'Protocol Encryption', desc: 'Force AES-256 state encryption.' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-8 group">
                <div className="space-y-1">
                  <p className="font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{item.label}</p>
                  <p className="text-xs font-medium text-slate-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`w-12 h-6 rounded-full p-1 relative transition-all duration-300 ${toggles[item.id] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${toggles[item.id] ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] ml-2">Identity Node</h3>
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-900/30 text-center space-y-8">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] mx-auto shadow-2xl flex items-center justify-center font-black text-3xl italic">RA</div>
            <div>
              <h4 className="text-2xl font-black tracking-tight">Root Admin</h4>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mt-1 italic">Master Protocol Authority</p>
            </div>
            <button
              onClick={() => logout()}
              className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all italic"
            >
              Terminate Current Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function DashboardLayout() {
  const [employees, setEmployees] = useState(employeesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '' });

  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'On Leave').length;

  const stats = [
    { icon: Users, label: 'Total Employees', value: employees.length.toLocaleString(), colorClass: 'bg-primary-100 text-primary-600', trend: { value: 12, isUp: true } },
    { icon: UserPlus, label: 'Present Today', value: activeEmployees.toLocaleString(), colorClass: 'bg-green-100 text-green-600', trend: { value: 5, isUp: true } },
    { icon: CalendarClock, label: 'On Leave', value: onLeaveEmployees.toLocaleString(), colorClass: 'bg-orange-100 text-orange-600', trend: { value: 2, isUp: false } },
  ];

  const handleAddEmployee = (newEmp) => {
    setEmployees([newEmp, ...employees]);
    setIsAddModalOpen(false);
    setToast({ open: true, message: 'Employee Registered Successfully' });
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setToast({ open: true, message: 'Record Terminated Successfully' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter selection:bg-primary-100 selection:text-primary-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-md"
          onClick={() => setIsSidebarOpen(false)}
        ></motion.div>
      )}

      <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-500">
        <Header
          toggleSidebar={() => setIsSidebarOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="flex-1 transition-all duration-300">
          <Routes>
            <Route path="/" element={
              <div className="p-4 sm:p-6 lg:p-12 space-y-12 max-w-[1600px] mx-auto w-full">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Core</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                      <StatsCard key={index} {...stat} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Personnel Overview</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Live Node Status</p>
                    </div>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <UserPlus className="w-4 h-4" />
                      Add Employee
                    </button>
                  </div>

                  <EmployeeTable
                    employees={employees}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onDelete={handleDeleteEmployee}
                  />
                </div>
              </div>
            } />
            <Route path="/employees" element={
              <div className="p-4 sm:p-6 lg:p-12 space-y-8 max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Personnel Directory</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Authorized Node Registry</p>
                  </div>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Employee
                  </button>
                </div>

                <EmployeeTable
                  employees={employees}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onDelete={handleDeleteEmployee}
                />
              </div>
            } />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll setToast={setToast} />} />
            <Route path="/settings" element={<Settings setToast={setToast} />} />
          </Routes>
        </main>

        <AddEmployeeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddEmployee}
        />

        <Toast
          isOpen={toast.open}
          message={toast.message}
          onClose={() => setToast({ ...toast, open: false })}
        />

        <footer className="p-8 text-center text-slate-400 text-sm border-t border-slate-100">
          &copy; {new Date().getFullYear()} St. Joseph's College of Engineering and Technology. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
