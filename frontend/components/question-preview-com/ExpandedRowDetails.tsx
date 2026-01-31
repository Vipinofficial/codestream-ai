import React from 'react';

interface Question {
  id: number;
  title: string;
  description?: string;
  category?: string;
  options?: any[];
  initialCode?: string;
  matchingPairs?: any[];
}

interface ExpandedRowDetailsProps {
  question: Question;
}

const ExpandedRowDetails: React.FC<ExpandedRowDetailsProps> = ({ question }) => {
  return (
    <tr className="bg-slate-50 dark:bg-slate-800/30">
      <td colSpan={9} className="px-6 py-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
              Full Question:
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
              {question.description || question.title}
            </p>
          </div>

          {question.category && (
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Category:
              </span>
              <span className="ml-2 text-slate-600 dark:text-slate-400">
                {question.category}
              </span>
            </div>
          )}

          {question.options && question.options.length > 0 && (
            <div>
              <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Options:
              </h5>
              <ul className="space-y-1">
                {question.options.map((opt: any, i: number) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400">
                    {opt.isCorrect && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓{' '}
                      </span>
                    )}
                    {opt.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {question.initialCode && (
            <div>
              <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Initial Code:
              </h5>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs">
                {question.initialCode}
              </pre>
            </div>
          )}

          {question.matchingPairs && question.matchingPairs.length > 0 && (
            <div>
              <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Matching Pairs:
              </h5>
              <div className="space-y-2">
                {question.matchingPairs.map((pair: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-slate-600 dark:text-slate-400">{pair.prompt}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-600 dark:text-slate-400">{pair.answer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ExpandedRowDetails;
