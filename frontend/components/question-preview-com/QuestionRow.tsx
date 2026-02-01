import React from 'react';
import { Trash2, Eye, EyeOff } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  type: string;
  difficulty: string;
  marks?: number;
  negative?: number;
  maxOptLimit?: number;
}

interface QuestionRowProps {
  question: Question;
  index: number;
  isSelected: boolean;
  isExpanded: boolean;
  onSelectChange: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onExpandToggle: (id: number) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
    case 'Medium':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
    case 'Hard':
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'CODING':
      return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400';
    case 'MCQ':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    case 'MULTI_SELECT':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
    case 'MATCHING':
      return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400';
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
  }
};

const QuestionRow: React.FC<QuestionRowProps> = ({
  question,
  index,
  isSelected,
  isExpanded,
  onSelectChange,
  onEdit,
  onDelete,
  onExpandToggle,
}) => {
  const getQuestionPreview = (title: string) => {
    if (title.length > 60) {
      return title.substring(0, 60) + '...';
    }
    return title;
  };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectChange(question.id)}
          className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
        />
      </td>
      <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">
        {index}
      </td>
      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 max-w-xs">
        <div className="flex items-center gap-2">
          <span className="truncate">{getQuestionPreview(question.title)}</span>
          <button
            onClick={() => onExpandToggle(question.id)}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            title="View full question"
          >
            {isExpanded ? (
              <EyeOff size={14} className="text-slate-500" />
            ) : (
              <Eye size={14} className="text-slate-500" />
            )}
          </button>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <span className={`inline-block px-3 py-1 rounded-lg font-semibold text-xs ${getTypeColor(question.type)}`}>
          {question.type}
        </span>
      </td>
      <td className="px-6 py-4 text-sm">
        <span className={`inline-block px-3 py-1 rounded-lg font-semibold text-xs ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-center text-slate-700 dark:text-slate-300">
        {question.marks || 1.0}
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-center text-slate-700 dark:text-slate-300">
        {question.negative || 0.0}
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-center text-slate-700 dark:text-slate-300">
        {question.maxOptLimit || 0}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onEdit(question.id)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(question.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default QuestionRow;
