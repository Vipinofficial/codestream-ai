import React, { useState } from 'react';
import { Settings, Shuffle, Lock, Clock, Users, HelpCircle, Save } from 'lucide-react';

const TestConfiguration: React.FC = () => {
  const [config, setConfig] = useState({
    randomizeQuestions: true,
    randomizeOptions: true,
    negativeMarking: false,
    showAnswers: false,
    showScore: true,
    allowRetake: true,
    maxAttempts: 3,
    timeLimitPerQuestion: 0,
    sectionwise: false,
    shuffleStrategy: 'full',
    allowPageNavigation: true,
    allowReview: true,
    proctoringRequired: false,
    webcamRequired: false,
    copyPasteAllowed: false,
    tabSwitchAllowed: false,
    questionSecondPass: false,
    partialCredit: false,
    skippingAllowed: true,
    markForReview: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Test Configuration</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question Behavior */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shuffle size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900 dark:text-white">Question Behavior</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'randomizeQuestions', label: 'Randomize Question Order' },
              { key: 'randomizeOptions', label: 'Randomize Answer Options' },
              { key: 'showAnswers', label: 'Show Answers After Test' },
              { key: 'showScore', label: 'Show Score Immediately' },
              { key: 'allowReview', label: 'Allow Review of Answers' },
              { key: 'markForReview', label: 'Allow Mark for Review' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config[item.key as keyof typeof config] === true}
                  onChange={(e) => setConfig({ ...config, [item.key]: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Attempt & Time Settings */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900 dark:text-white">Attempts & Timing</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={config.allowRetake}
                  onChange={(e) => setConfig({ ...config, allowRetake: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300">Allow Retakes</span>
              </label>
              {config.allowRetake && (
                <div className="ml-7">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Max Attempts</label>
                  <input
                    type="number"
                    value={config.maxAttempts}
                    onChange={(e) => setConfig({ ...config, maxAttempts: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Time Limit Per Question (0 = unlimited)
              </label>
              <input
                type="number"
                value={config.timeLimitPerQuestion}
                onChange={(e) => setConfig({ ...config, timeLimitPerQuestion: parseInt(e.target.value) })}
                min="0"
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Scoring */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900 dark:text-white">Scoring Rules</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'negativeMarking', label: 'Negative Marking for Wrong Answers' },
              { key: 'partialCredit', label: 'Allow Partial Credit' },
              { key: 'skippingAllowed', label: 'Allow Question Skipping' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config[item.key as keyof typeof config] === true}
                  onChange={(e) => setConfig({ ...config, [item.key]: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Negative Marking %</label>
            <input
              type="number"
              defaultValue="25"
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Proctoring */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900 dark:text-white">Proctoring & Security</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'proctoringRequired', label: 'Require AI Proctoring' },
              { key: 'webcamRequired', label: 'Require Webcam Verification' },
              { key: 'copyPasteAllowed', label: 'Allow Copy-Paste (disable for security)' },
              { key: 'tabSwitchAllowed', label: 'Allow Tab Switching' },
              { key: 'allowPageNavigation', label: 'Allow Page Navigation' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config[item.key as keyof typeof config] === true}
                  onChange={(e) => setConfig({ ...config, [item.key]: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900 dark:text-white">Advanced Options</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'sectionwise', label: 'Section-wise Timing' },
              { key: 'questionSecondPass', label: 'Second Pass for Questions' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config[item.key as keyof typeof config] === true}
                  onChange={(e) => setConfig({ ...config, [item.key]: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
              </label>
            ))}

            <div className="pt-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Shuffle Strategy</label>
              <select
                value={config.shuffleStrategy}
                onChange={(e) => setConfig({ ...config, shuffleStrategy: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
              >
                <option value="full">Full Randomization</option>
                <option value="block">Block Randomization</option>
                <option value="stratified">Stratified Randomization</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
          Reset
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          <Save size={16} />
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default TestConfiguration;
