import React, { useState } from 'react';
import { FileUp, Download, RotateCw, Check, X, AlertCircle, Zap } from 'lucide-react';

interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  warnings: number;
  details: {
    fileName: string;
    status: 'success' | 'partial' | 'failed';
    message: string;
  }[];
}

const ImportExport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'history'>('import');
  const [importResults, setImportResults] = useState<ImportResult | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('qti');
  const [exportFormat, setExportFormat] = useState('csv');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Import/Export</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(['import', 'export', 'history'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab === 'import' && <FileUp size={16} className="inline mr-2" />}
            {tab === 'export' && <Download size={16} className="inline mr-2" />}
            {tab === 'history' && <RotateCw size={16} className="inline mr-2" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          {!importResults ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* QTI Import */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Import Questions (QTI Format)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Upload QTI XML files to import questions and tests
                  </p>
                  <div
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                  >
                    <FileUp size={32} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">QTI XML files up to 50MB</p>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <p>✓ Supports QTI v1.2 and v2.1</p>
                    <p>✓ Import multiple files at once</p>
                    <p>✓ Maps questions automatically</p>
                  </div>
                </div>

                {/* CSV Import */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Import Candidates (CSV)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Upload CSV file with candidate details
                  </p>
                  <div
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                  >
                    <FileUp size={32} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CSV files with email, name, group columns</p>
                  </div>
                  <button className="mt-4 w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600">
                    Download Sample Template
                  </button>
                </div>

                {/* JSON/JSONL Import */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Import Tests (JSON)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Upload JSON/JSONL test configurations
                  </p>
                  <div
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                  >
                    <FileUp size={32} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Click to upload
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">JSON/JSONL format</p>
                  </div>
                </div>

                {/* LMS Integration */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">LMS Integration</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Connect with external learning platforms
                  </p>
                  <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 mb-3">
                    <option>Select LMS...</option>
                    <option>Canvas</option>
                    <option>Blackboard</option>
                    <option>Moodle</option>
                    <option>D2L</option>
                  </select>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                    Connect LMS
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Import Results</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{importResults.total}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">Successful</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{importResults.successful}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-300">Failed</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{importResults.failed}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Details</h4>
                <div className="space-y-2">
                  {importResults.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      {detail.status === 'success' && <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />}
                      {detail.status === 'failed' && <X size={18} className="text-red-600 flex-shrink-0 mt-0.5" />}
                      {detail.status === 'partial' && <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white">{detail.fileName}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{detail.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setImportResults(null)}
                  className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Import More Files
                </button>
                <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: 'Export Questions', type: 'questions', formats: ['CSV', 'JSON', 'QTI'] },
            { title: 'Export Test Results', type: 'results', formats: ['CSV', 'Excel', 'PDF'] },
            { title: 'Export Candidates', type: 'candidates', formats: ['CSV', 'Excel'] },
            { title: 'Export Analytics Report', type: 'analytics', formats: ['PDF', 'Excel'] },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{item.title}</h3>
              <div className="space-y-3">
                {item.formats.map(format => (
                  <button
                    key={format}
                    className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Export as {format}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Action</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">File</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Format</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {[
                { action: 'Export', file: 'test_results.csv', format: 'CSV', date: '2026-02-12', status: 'Completed' },
                { action: 'Import', file: 'batch_1_candidates.csv', format: 'CSV', date: '2026-02-11', status: 'Completed' },
                { action: 'Export', file: 'questions_backup.json', format: 'JSON', date: '2026-02-10', status: 'Completed' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{item.action}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.file}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.format}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImportExport;
