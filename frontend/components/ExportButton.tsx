
import React, { useState } from 'react';
import { Download, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { generatePerformanceSummary } from '../services/geminiService';

interface ExportButtonProps {
  data: any;
  type: 'student' | 'teacher' | 'admin';
  label: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, type, label }) => {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle');

  const handleExport = async () => {
    setStatus('analyzing');
    try {
      // Simulate AI Insights being generated for the report
      const aiSummary = await generatePerformanceSummary(data, type);
      
      const report = {
        title: `${label} - Monthly Performance Report`,
        generatedAt: new Date().toISOString(),
        aiInsights: aiSummary,
        rawRecords: data
      };

      // In a real app, this would trigger a Blob download
      console.log('Generated Report:', report);
      
      // Simulate download delay
      setTimeout(() => {
        setStatus('done');
        setTimeout(() => setStatus('idle'), 3000);
      }, 1500);

    } catch (e) {
      console.error(e);
      setStatus('idle');
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={status === 'analyzing'}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
        status === 'analyzing' 
          ? 'bg-slate-800 text-indigo-400 cursor-not-allowed' 
          : status === 'done'
          ? 'bg-green-600 text-white'
          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
      }`}
    >
      {status === 'analyzing' ? (
        <>
          <Sparkles size={14} className="animate-pulse" />
          AI Analyzing...
        </>
      ) : status === 'done' ? (
        <>
          <CheckCircle2 size={14} />
          Report Ready
        </>
      ) : (
        <>
          <Download size={14} />
          {label}
        </>
      )}
    </button>
  );
};

export default ExportButton;
