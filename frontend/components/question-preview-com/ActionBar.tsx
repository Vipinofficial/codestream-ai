import React from 'react';
import { Trash2 } from 'lucide-react';

interface ActionBarProps {
  totalQuestions: number;
  selectedCount: number;
  onDeleteSelected: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  totalQuestions,
  selectedCount,
  onDeleteSelected,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Total Questions: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{totalQuestions}</span>
        </p>
        {selectedCount > 0 && (
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Selected: <span className="text-orange-600 dark:text-orange-400 font-bold">{selectedCount}</span>
          </p>
        )}
      </div>

      {selectedCount > 0 && (
        <button
          onClick={onDeleteSelected}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
        >
          <Trash2 size={16} />
          Delete Selected
        </button>
      )}
    </div>
  );
};

export default ActionBar;
