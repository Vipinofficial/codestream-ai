
import React from 'react';
import { Settings, ShieldCheck, Database, Zap, Users, Key, Server, Activity, FileDown, PieChart, Plus, Archive } from 'lucide-react';
import ExportButton from './ExportButton';

const AdminSettings: React.FC = () => {
  const stats = [
    { label: 'API Usage', value: '42.5k tokens', icon: Zap, color: 'yellow' },
    { label: 'Active Sessions', value: '1,284', icon: Activity, color: 'green' },
    { label: 'Total Users', value: '8,420', icon: Users, color: 'indigo' },
    { label: 'Server Load', value: '14%', icon: Server, color: 'blue' },
  ];

  const siteData = { monthlyUptime: "99.98%", topDepartments: ["Engineering", "FinTech", "Quality Assurance"], avgCandidateScore: 78.4, proctoringAlerts: 42 };

  const handleSchedule = () => alert("System Audit Task scheduled for next maintenance window.");
  const handleViewArchive = () => alert("Redirecting to AWS S3 Archive Storage...");

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-3"><ShieldCheck className="text-red-500" /> Platform Admin</h2>
          <p className="text-slate-400">Configure global settings and monitor performance.</p>
        </div>
        <ExportButton data={siteData} type="admin" label="Global Site Audit" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className={`p-2 rounded-lg bg-${s.color}-500/10 text-${s.color}-400 w-fit mb-4`}><s.icon size={20} /></div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-4"><PieChart className="text-indigo-400" size={20} /><h3 className="font-bold text-slate-200">Report Generation</h3></div>
            <p className="text-sm text-slate-500 mb-6">Automated summaries generated on the 1st of every month.</p>
            <div className="flex gap-4">
               <button onClick={handleSchedule} className="flex-1 py-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl text-xs font-bold text-slate-400 flex items-center justify-center gap-2 transition-all"><Plus size={14} /> Schedule New</button>
               <button onClick={handleViewArchive} className="flex-1 py-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl text-xs font-bold text-slate-400 flex items-center justify-center gap-2 transition-all"><Archive size={14} /> View Archive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
