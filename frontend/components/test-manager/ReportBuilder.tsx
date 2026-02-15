import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, Download, Save, Clock, Mail } from 'lucide-react';

const ReportBuilder: React.FC = () => {
  const [reportType, setReportType] = useState<'standard' | 'custom'>('standard');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'totalAttempts',
    'averageScore',
    'passRate',
  ]);

  const allMetrics = [
    { id: 'totalAttempts', label: 'Total Attempts' },
    { id: 'averageScore', label: 'Average Score' },
    { id: 'passRate', label: 'Pass Rate' },
    { id: 'timeSpent', label: 'Average Time Spent' },
    { id: 'questionPerf', label: 'Question Performance' },
    { id: 'candidatePerf', label: 'Candidate Performance' },
    { id: 'difficulty', label: 'Difficulty Distribution' },
    { id: 'attendance', label: 'Attendance Rate' },
  ];

  const toggleMetric = (id: string) => {
    setSelectedMetrics(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Report Builder</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2">
            <Download size={16} />
            Export PDF
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2">
            <Download size={16} />
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="col-span-2 space-y-6">
          {/* Report Type Selection */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Report Type</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="standard"
                  checked={reportType === 'standard'}
                  onChange={e => setReportType(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span className="text-slate-700 dark:text-slate-300">Standard Report</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="custom"
                  checked={reportType === 'custom'}
                  onChange={e => setReportType(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span className="text-slate-700 dark:text-slate-300">Custom Report</span>
              </label>
            </div>
          </div>

          {/* Metrics Selection */}
          {reportType === 'custom' && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Select Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                {allMetrics.map(metric => (
                  <label
                    key={metric.id}
                    className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={() => toggleMetric(metric.id)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300">{metric.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Chart Preview */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Chart Preview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center h-48 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <BarChart3 size={32} className="text-slate-600 dark:text-slate-400 mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400">Bar Chart</p>
              </div>
              <div className="flex flex-col items-center justify-center h-48 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <LineChart size={32} className="text-slate-600 dark:text-slate-400 mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400">Line Chart</p>
              </div>
              <div className="flex flex-col items-center justify-center h-48 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <PieChart size={32} className="text-slate-600 dark:text-slate-400 mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400">Pie Chart</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduling & Templates */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Schedule Report</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Frequency
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Email on schedule</span>
                </label>
              </div>

              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center justify-center gap-2">
                <Save size={16} />
                Save Schedule
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Saved Templates</h3>
            <div className="space-y-2">
              {['Executive Summary', 'Detailed Analysis', 'Quick Overview'].map((template, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Reports</h3>
        <div className="space-y-2">
          {[
            { name: 'Java Skills - Jan 2025', date: '2026-01-30', size: '2.4 MB' },
            { name: 'Frontend Assessment - Jan 2025', date: '2026-01-25', size: '1.8 MB' },
          ].map((report, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{report.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{report.date} • {report.size}</p>
              </div>
              <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;
