import React, { useState } from 'react';
import { AlertCircle, Eye, Video, Lock, Zap, Shield, Clock, Users } from 'lucide-react';

interface SecurityEvent {
  id: string;
  candidateName: string;
  eventType: 'TAB_SWITCH' | 'COPY_PASTE' | 'BLUR' | 'MULTIPLE_FACES' | 'SUSPICIOUS_BEHAVIOR' | 'UNUSUAL_PATTERN';
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'flagged' | 'reviewed' | 'dismissed';
}

interface ProctoringSession {
  id: string;
  candidateName: string;
  testName: string;
  startTime: string;
  duration: number;
  flagCount: number;
  riskLevel: 'low' | 'medium' | 'high';
  screenRecorded: boolean;
  status: 'ongoing' | 'completed' | 'flagged';
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    candidateName: 'John Doe',
    eventType: 'TAB_SWITCH',
    timestamp: '2026-02-12 10:15:32',
    description: 'Switched to browser tab during test',
    severity: 'medium',
    status: 'flagged',
  },
  {
    id: '2',
    candidateName: 'Jane Smith',
    eventType: 'COPY_PASTE',
    timestamp: '2026-02-12 10:20:15',
    description: 'Attempted to copy answer text',
    severity: 'low',
    status: 'flagged',
  },
  {
    id: '3',
    candidateName: 'Mike Johnson',
    eventType: 'MULTIPLE_FACES',
    timestamp: '2026-02-12 10:25:48',
    description: 'Multiple faces detected in webcam',
    severity: 'critical',
    status: 'flagged',
  },
];

const mockProctoringSession: ProctoringSession[] = [
  {
    id: '1',
    candidateName: 'John Doe',
    testName: 'Java Fundamentals',
    startTime: '2026-02-12 10:00:00',
    duration: 45,
    flagCount: 2,
    riskLevel: 'medium',
    screenRecorded: true,
    status: 'ongoing',
  },
  {
    id: '2',
    candidateName: 'Jane Smith',
    testName: 'Frontend Skills',
    startTime: '2026-02-12 09:30:00',
    duration: 52,
    flagCount: 0,
    riskLevel: 'low',
    screenRecorded: true,
    status: 'completed',
  },
];

const ProctoringSecurity: React.FC = () => {
  const [viewMode, setViewMode] = useState<'live' | 'events' | 'settings' | 'recordings'>('live');
  const [selectedSession, setSelectedSession] = useState<ProctoringSession | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredEvents = mockSecurityEvents.filter(e =>
    filterSeverity === 'all' || e.severity === filterSeverity
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Proctoring & Security</h2>
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(['live', 'events', 'recordings', 'settings'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              viewMode === mode
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {mode === 'live' && <Eye size={16} />}
            {mode === 'events' && <AlertCircle size={16} />}
            {mode === 'recordings' && <Video size={16} />}
            {mode === 'settings' && <Shield size={16} />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Live Monitoring Tab */}
      {viewMode === 'live' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Active Sessions</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {mockProctoringSession.filter(s => s.status === 'ongoing').length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Flagged Sessions</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {mockProctoringSession.filter(s => s.status === 'flagged').length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">High Risk</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {mockProctoringSession.filter(s => s.riskLevel === 'high').length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Security Events</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{mockSecurityEvents.length}</p>
            </div>
          </div>

          {/* Live Sessions */}
          <div className="space-y-3">
            {mockProctoringSession.map(session => (
              <div
                key={session.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer"
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 dark:text-white">{session.candidateName}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{session.testName}</p>
                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                        {session.duration} min
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(session.riskLevel)}`}>
                        {session.riskLevel.toUpperCase()}
                      </span>
                      {session.screenRecorded && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                          <Video size={12} className="inline mr-1" />
                          Recording
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {session.flagCount > 0 && (
                      <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                        <Zap size={16} />
                        {session.flagCount}
                      </span>
                    )}
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Session Details Modal */}
          {selectedSession && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg max-w-2xl w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedSession.candidateName}</h3>
                  <button onClick={() => setSelectedSession(null)} className="text-slate-500 hover:text-slate-700">×</button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Test</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedSession.testName}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Duration</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedSession.duration} minutes</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Risk Level</p>
                    <p className={`font-semibold ${getRiskColor(selectedSession.riskLevel)}`}>{selectedSession.riskLevel.toUpperCase()}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Security Flags</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedSession.flagCount}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                      Watch Live Session
                    </button>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                      View Recording
                    </button>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                      Security Events
                    </button>
                    <button className="px-4 py-2 border border-yellow-200 dark:border-yellow-700 rounded-lg text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                      Flag Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Security Events Tab */}
      {viewMode === 'events' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['all', 'low', 'medium', 'high', 'critical'] as const).map(severity => (
              <button
                key={severity}
                onClick={() => setFilterSeverity(severity)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterSeverity === severity
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">{event.candidateName}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{event.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{event.timestamp}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recordings Tab */}
      {viewMode === 'recordings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProctoringSession.map(session => (
            <div key={session.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <div className="bg-gray-900 h-32 flex items-center justify-center">
                <Video className="text-white opacity-30" size={48} />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-slate-900 dark:text-white">{session.candidateName}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{session.testName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{session.startTime}</p>
                <button className="mt-3 w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                  Watch Recording
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {viewMode === 'settings' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Proctoring Features</h3>
            <div className="space-y-3">
              {[
                { label: 'AI-Based Proctoring', enabled: true },
                { label: 'Webcam Verification', enabled: true },
                { label: 'Screen Recording', enabled: true },
                { label: 'Tab Switch Detection', enabled: true },
                { label: 'Copy-Paste Restriction', enabled: true },
                { label: 'Live Monitoring', enabled: false },
                { label: 'Cheating Detection', enabled: true },
                { label: 'Location Tracking', enabled: false },
              ].map(feature => (
                <label key={feature.label} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={feature.enabled}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{feature.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Alert Thresholds</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Max Tab Switches Before Alert
                </label>
                <input
                  type="number"
                  defaultValue="3"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Max Copy-Paste Attempts
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
              Reset to Default
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

export default ProctoringSecurity;
