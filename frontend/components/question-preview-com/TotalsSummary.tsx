import React from 'react';

interface TotalsSummaryProps {
  totalQuestions: number;
  marks: number;
  negativeMarks: number;
}

const TotalsSummary: React.FC<TotalsSummaryProps> = ({
  totalQuestions,
  marks,
  negativeMarks,
}) => {
  const totalMarks = totalQuestions * marks;
  const totalNegativeMarks = totalQuestions * negativeMarks;
  const netMarks = totalMarks - totalNegativeMarks;

  if (totalQuestions === 0) return null;

  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
            Total Questions
          </p>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {totalQuestions}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
            Total Marks
          </p>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {totalMarks.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
            Negative Marks
          </p>
          <p className="text-3xl font-black text-red-600 dark:text-red-400">
            {totalNegativeMarks.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
            Net Marks
          </p>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {netMarks.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalsSummary;
