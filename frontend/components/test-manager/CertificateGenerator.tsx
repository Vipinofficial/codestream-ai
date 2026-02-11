import React, { useState } from 'react';
import { FileText, Download, Eye, Edit, Zap, Award } from 'lucide-react';

const CertificateGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'generate' | 'sent'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');

  const certificateTemplates = [
    {
      id: 'professional',
      name: 'Professional Certificate',
      description: 'Formal certificate for professional assessments',
      preview: '🎓 Professional Certificate Design',
    },
    {
      id: 'achievement',
      name: 'Achievement Badge',
      description: 'Modern badge-style certificate',
      preview: '⭐ Achievement Badge Design',
    },
    {
      id: 'completion',
      name: 'Completion Certificate',
      description: 'Simple completion confirmation',
      preview: '✓ Completion Certificate Design',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certificate Generator</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
          <Zap size={16} className="inline mr-2" />
          Generate Batch
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {[
          { id: 'templates', label: 'Templates' },
          { id: 'generate', label: 'Generate Certificates' },
          { id: 'sent', label: 'Sent (24)' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificateTemplates.map(template => (
              <div
                key={template.id}
                className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                  selectedTemplate === template.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="h-32 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4 text-4xl">
                  {template.preview}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{template.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{template.description}</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-xs bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-900 dark:text-white font-medium flex items-center justify-center gap-2">
                    <Eye size={14} />
                    Preview
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium flex items-center justify-center gap-2">
                    <Edit size={14} />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Template Customization */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Customize Template</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Certificate Title
                </label>
                <input
                  type="text"
                  defaultValue="Certificate of Achievement"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  defaultValue="TechAssess Inc."
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  {['#FFFFFF', '#F0F9FF', '#FEF3C7'].map(color => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded border-2 border-slate-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Accent Color
                </label>
                <div className="flex gap-2">
                  {['#4F46E5', '#DC2626', '#059669'].map(color => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded border-2 border-slate-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Tab */}
      {activeTab === 'generate' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Generate Certificates</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Select Test
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
                  <option>Java Fundamentals Assessment</option>
                  <option>Frontend Development Skills</option>
                  <option>DevOps Engineering Test</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Passing Score Threshold (%)
                </label>
                <input
                  type="number"
                  defaultValue="60"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Certificate Template
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
                  <option>Professional Certificate</option>
                  <option>Achievement Badge</option>
                  <option>Completion Certificate</option>
                </select>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>12 certificates</strong> ready to generate for candidates who scored above 60%
                </p>
              </div>

              <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center gap-2">
                <Zap size={18} />
                Generate 12 Certificates
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Certificate Preview</h3>
            <div className="aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Award size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-2" />
                <p className="text-slate-600 dark:text-slate-400">Certificate Preview</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Select a template to see preview</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sent Tab */}
      {activeTab === 'sent' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Sent Certificates</h3>
          <div className="space-y-2">
            {[
              {
                candidate: 'John Doe',
                test: 'Java Fundamentals',
                date: '2026-02-10',
                status: 'Delivered',
              },
              {
                candidate: 'Jane Smith',
                test: 'Frontend Skills',
                date: '2026-02-09',
                status: 'Opened',
              },
              {
                candidate: 'Mike Johnson',
                test: 'DevOps Assessment',
                date: '2026-02-08',
                status: 'Downloaded',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{item.candidate}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.test}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-600 dark:text-slate-400">{item.date}</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded ${
                    item.status === 'Delivered'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : item.status === 'Opened'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                  }`}>
                    {item.status}
                  </span>
                  <button className="px-3 py-1 text-xs bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-900 dark:text-white">
                    <Download size={14} className="inline mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
