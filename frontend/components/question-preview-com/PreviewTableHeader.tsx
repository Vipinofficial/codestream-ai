import React from 'react';

interface PreviewTableHeaderProps {
  allSelected: boolean;
  totalQuestions: number;
  onSelectAll: () => void;
}

const PreviewTableHeader: React.FC<PreviewTableHeaderProps> = ({
  allSelected,
  totalQuestions,
  onSelectAll,
}) => {
  return (
    <thead>
      <tr className="bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <th className="px-6 py-4 text-left">
          <input
            type="checkbox"
            checked={allSelected && totalQuestions > 0}
            onChange={onSelectAll}
            className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
          />
        </th>
        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          S.No
        </th>
        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Question
        </th>
        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Type
        </th>
        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Difficulty
        </th>
        <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Marks
        </th>
        <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Negative
        </th>
        <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Max Opt
        </th>
        <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default PreviewTableHeader;
