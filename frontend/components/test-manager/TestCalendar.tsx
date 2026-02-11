import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users } from 'lucide-react';

const TestCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1)); // February 2026
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');

  // Mock test events
  const testEvents = [
    {
      id: 1,
      title: 'Java Assessment',
      date: '2026-02-05',
      time: '10:00 AM',
      candidates: 15,
      status: 'Live',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Frontend Skills Test',
      date: '2026-02-08',
      time: '02:00 PM',
      candidates: 22,
      status: 'Scheduled',
      color: 'green',
    },
    {
      id: 3,
      title: 'DevOps Engineering',
      date: '2026-02-12',
      time: '09:00 AM',
      candidates: 8,
      status: 'Scheduled',
      color: 'purple',
    },
    {
      id: 4,
      title: 'System Design Round',
      date: '2026-02-15',
      time: '03:00 PM',
      candidates: 5,
      status: 'Scheduled',
      color: 'orange',
    },
    {
      id: 5,
      title: 'Database Design Test',
      date: '2026-02-18',
      time: '11:00 AM',
      candidates: 12,
      status: 'Draft',
      color: 'red',
    },
  ];

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const getEventForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return testEvents.find(e => e.date === dateStr);
  };

  // Calendar grid generation
  const calendarDays = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Test Calendar</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center gap-2">
          <Plus size={16} />
          Schedule Test
        </button>
      </div>

      {/* View Mode Selection */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {[
          { id: 'month', label: 'Month' },
          { id: 'week', label: 'Week' },
          { id: 'agenda', label: 'Agenda' },
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              viewMode === mode.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Month View */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <ChevronLeft size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <ChevronRight size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {days.map(day => (
              <div key={day} className="text-center font-medium text-slate-700 dark:text-slate-300 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              const event = day ? getEventForDate(day) : null;
              const statusColors = {
                'Live': 'bg-red-100 dark:bg-red-900/30',
                'Scheduled': 'bg-blue-100 dark:bg-blue-900/30',
                'Draft': 'bg-gray-100 dark:bg-gray-900/30',
              };

              return (
                <div
                  key={idx}
                  className={`aspect-square p-2 rounded-lg border border-slate-200 dark:border-slate-700 ${
                    day ? 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer' : 'bg-gray-100 dark:bg-slate-800'
                  }`}
                >
                  {day && (
                    <div className="h-full flex flex-col">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{day}</p>
                      {event && (
                        <div className={`mt-1 p-1 rounded text-xs font-medium text-center truncate ${statusColors[event.status as keyof typeof statusColors] || 'bg-slate-200'}`}>
                          {event.title}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Week View</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].map(time => (
              <div key={time} className="flex items-center gap-4">
                <span className="w-20 text-sm text-slate-600 dark:text-slate-400">{time}</span>
                <div className="flex-1 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-3 text-sm text-slate-700 dark:text-slate-300">
                  {time === '10:00 AM' && 'Java Assessment (15 candidates)'}
                  {time === '2:00 PM' && 'Frontend Skills (22 candidates)'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agenda View */}
      {viewMode === 'agenda' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upcoming Tests</h3>
          <div className="space-y-3">
            {testEvents.map(event => (
              <div key={event.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border-l-4 border-slate-400">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">{event.title}</h4>
                  <span className={`px-3 py-1 text-xs font-medium rounded ${
                    event.status === 'Live'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : event.status === 'Scheduled'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} />
                    {event.candidates} candidates
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Status Legend</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Live', color: 'bg-red-100 dark:bg-red-900/30', textColor: 'text-red-800 dark:text-red-300' },
            { label: 'Scheduled', color: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-800 dark:text-blue-300' },
            { label: 'Draft', color: 'bg-gray-100 dark:bg-gray-900/30', textColor: 'text-gray-800 dark:text-gray-300' },
          ].map((status, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${status.color}`}></div>
              <span className={`text-sm font-medium ${status.textColor}`}>{status.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestCalendar;
