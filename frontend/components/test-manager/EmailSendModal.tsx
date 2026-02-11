import React, { useState } from 'react';
import { X, Mail, Check } from 'lucide-react';

interface EmailRecipient {
  email: string;
  name: string;
  group: string;
}

interface EmailTemplateProps {
  testId: string;
  testName: string;
  recipients: EmailRecipient[];
  isOpen: boolean;
  onClose: () => void;
  onSend: (emails: EmailRecipient[], message: string, subject: string) => void;
}

const predefinedTemplates = [
  {
    name: 'Default Invitation',
    subject: 'You are invited to take an Assessment',
    body: `Dear {{candidateName}},

You are invited to participate in an assessment: {{testName}}.

This assessment is designed to evaluate your skills and knowledge. Please ensure you have a stable internet connection and a quiet environment when taking the test.

Important Details:
- Test Name: {{testName}}
- Group: {{groupName}}
- Duration: Please check before starting

Best regards,
Recruitment Team`,
  },
  {
    name: 'Urgent Assessment',
    subject: 'Action Required: Complete Your Assessment',
    body: `Dear {{candidateName}},

This is to inform you that an important assessment awaits your completion: {{testName}}

Your prompt attention to this matter is greatly appreciated. Please complete this assessment at your earliest convenience.

Group: {{groupName}}

Thank you for your time and effort.

Best regards,
Recruitment Team`,
  },
  {
    name: 'Friendly Reminder',
    subject: 'Ready to Showcase Your Skills?',
    body: `Hi {{candidateName}},

We're excited to see you take on this challenge: {{testName}}

This is your opportunity to demonstrate your expertise. We believe you'll do great!

Details:
- Assessment: {{testName}}
- Group: {{groupName}}

Best of luck!

Best regards,
Recruitment Team`,
  },
];

const EmailSendModal: React.FC<EmailTemplateProps> = ({ testId, testName, recipients, isOpen, onClose, onSend }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(predefinedTemplates[0]);
  const [subject, setSubject] = useState(predefinedTemplates[0].subject);
  const [message, setMessage] = useState(predefinedTemplates[0].body);
  const [customTemplate, setCustomTemplate] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendComplete, setSendComplete] = useState(false);

  const handleTemplateChange = (template: typeof predefinedTemplates[0]) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setMessage(template.body);
    setCustomTemplate(false);
  };

  const handleSendEmails = async () => {
    setIsSending(true);
    // Simulate sending emails
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSend(recipients, message, subject);
    setIsSending(false);
    setSendComplete(true);
    
    setTimeout(() => {
      setSendComplete(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send Test Invitations</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{testName} • {recipients.length} recipients</p>
          </div>
          <button
            onClick={onClose}
            disabled={isSending}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={24} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Success State */}
        {sendComplete && (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Check size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Emails Sent Successfully!</h3>
            <p className="text-slate-600 dark:text-slate-400">
              {recipients.length} invitation{recipients.length !== 1 ? 's' : ''} have been sent.
            </p>
          </div>
        )}

        {/* Content */}
        {!sendComplete && (
          <div className="p-6 space-y-6">
            {/* Templates */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Email Templates
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {predefinedTemplates.map(template => (
                  <button
                    key={template.name}
                    onClick={() => handleTemplateChange(template)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate.name === template.name && !customTemplate
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{template.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setCustomTemplate(true);
                }}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Message
              </label>
              <div className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                Use <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">{'{{candidateName}}'}</code>, 
                <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded mx-1">{'{{testName}}'}</code>,
                <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded mx-1">{'{{groupName}}'}</code> for placeholders
              </div>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setCustomTemplate(true);
                }}
                rows={12}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
              />
            </div>

            {/* Recipients Preview */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Recipients Preview ({recipients.length})
              </label>
              <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Name</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Email</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Group</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {recipients.map((recipient, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="px-4 py-3 text-slate-900 dark:text-white">{recipient.name}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{recipient.email}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{recipient.group}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {!sendComplete && (
          <div className="flex gap-3 justify-end p-6 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900">
            <button
              onClick={onClose}
              disabled={isSending}
              className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSendEmails}
              disabled={isSending || recipients.length === 0}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Send {recipients.length} Invitation{recipients.length !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSendModal;
