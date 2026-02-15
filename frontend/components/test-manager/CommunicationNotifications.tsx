import React, { useState } from 'react';
import { Mail, Bell, Calendar, MessageSquare, Send, Clock, Settings } from 'lucide-react';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'invitation' | 'reminder' | 'result' | 'feedback';
  subject: string;
  enabled: boolean;
  scheduleType: 'immediate' | 'scheduled' | 'recurring';
}

const mockTemplates: NotificationTemplate[] = [
  { id: '1', name: 'Test Invitation', type: 'invitation', subject: 'You are invited to take {{testName}}', enabled: true, scheduleType: 'immediate' },
  { id: '2', name: 'Test Reminder', type: 'reminder', subject: 'Reminder: {{testName}} due on {{dueDate}}', enabled: true, scheduleType: 'scheduled' },
  { id: '3', name: 'Result Notification', type: 'result', subject: 'Your {{testName}} results are ready', enabled: true, scheduleType: 'immediate' },
  { id: '4', name: 'Feedback Email', type: 'feedback', subject: 'Feedback on your {{testName}} performance', enabled: false, scheduleType: 'scheduled' },
];

const CommunicationNotifications: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'templates' | 'schedule' | 'history' | 'settings'>('templates');
  const [templates, setTemplates] = useState(mockTemplates);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Communication & Notifications</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(['templates', 'schedule', 'history', 'settings'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              currentTab === tab
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab === 'templates' && <MessageSquare size={16} className="inline mr-2" />}
            {tab === 'schedule' && <Calendar size={16} className="inline mr-2" />}
            {tab === 'history' && <Clock size={16} className="inline mr-2" />}
            {tab === 'settings' && <Settings size={16} className="inline mr-2" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Templates Tab */}
      {currentTab === 'templates' && (
        <div className="space-y-3">
          {templates.map(template => (
            <div key={template.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 dark:text-white">{template.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{template.subject}</p>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                      {template.type}
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                      {template.scheduleType}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={template.enabled}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                      readOnly
                    />
                  </label>
                  <button className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Tab */}
      {currentTab === 'schedule' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Scheduled Campaigns</h3>
            <div className="space-y-3">
              {[
                { name: 'Invitation Campaign - Batch 1', date: '2026-02-15', type: 'Scheduled', recipients: 25 },
                { name: 'Reminder Campaign - Batch 2', date: '2026-02-18', type: 'Scheduled', recipients: 32 },
                { name: 'Result Notification', date: '2026-02-20', type: 'Automatic', recipients: 18 },
              ].map((campaign, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{campaign.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{campaign.recipients} recipients • {campaign.date}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                    {campaign.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Create New Campaign</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g., Batch 3 Test Reminder"
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Template</label>
                <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
                  <option>Test Invitation</option>
                  <option>Test Reminder</option>
                  <option>Result Notification</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Recipients Group</label>
                <select className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
                  <option>Java Batch 2026</option>
                  <option>Frontend Engineers</option>
                  <option>All Candidates</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Schedule Time</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                Schedule Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {currentTab === 'history' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Campaign</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Sent</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Recipients</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Opened</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Clicked</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {[
                { campaign: 'Batch 1 Invitation', sent: '2026-02-10', recipients: 25, opened: 24, clicked: 22, status: 'Completed' },
                { campaign: 'Batch 2 Reminder', sent: '2026-02-11', recipients: 32, opened: 28, clicked: 26, status: 'Completed' },
                { campaign: 'Results Notification', sent: '2026-02-12', recipients: 18, opened: 18, clicked: 15, status: 'Sent' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{item.campaign}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.sent}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.recipients}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.opened}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.clicked}</td>
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

      {/* Settings Tab */}
      {currentTab === 'settings' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Email Settings</h3>
            <div className="space-y-3">
              {[
                { label: 'Send test invitations', enabled: true },
                { label: 'Send automatic reminders', enabled: true },
                { label: 'Send result notifications', enabled: true },
                { label: 'Send performance feedback', enabled: false },
                { label: 'Send schedule updates', enabled: true },
              ].map(setting => (
                <label key={setting.label} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{setting.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Reminder Schedule</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Send reminder</label>
                <input type="number" defaultValue="2" min="1" className="w-24 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700" />
                <span className="ml-2 text-slate-700 dark:text-slate-300">days before test due date</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
              Reset
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationNotifications;
