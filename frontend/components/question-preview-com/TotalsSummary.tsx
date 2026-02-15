import React from "react";
import { FileText, Award, TrendingDown, TrendingUp } from "lucide-react";

interface TotalsSummaryProps {
  totalQuestions: number;
  totalMarks: number;
  totalNegativeMarks: number;
}
const TotalsSummary: React.FC<TotalsSummaryProps> = ({
  totalQuestions,
  totalMarks,
  totalNegativeMarks,
}) => {

  const netMarks = totalMarks - totalNegativeMarks;

  if (totalQuestions === 0) return null;

  const stats = [
    {
      label: "Total Questions",
      value: totalQuestions,
      icon: <FileText size={18} />,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-100 dark:bg-indigo-900/40",
    },
    {
      label: "Total Marks",
      value: totalMarks.toFixed(2),
      icon: <Award size={18} />,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/40",
    },
    {
      label: "Negative Marks",
      value: totalNegativeMarks.toFixed(2),
      icon: <TrendingDown size={18} />,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/40",
    },
    {
      label: "Net Marks",
      value: netMarks.toFixed(2),
      icon: <TrendingUp size={18} />,
      color:
        netMarks >= 0
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-red-600 dark:text-red-400",
      bg:
        netMarks >= 0
          ? "bg-emerald-100 dark:bg-emerald-900/40"
          : "bg-red-100 dark:bg-red-900/40",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <div
              className={`p-3 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}
            >
              {stat.icon}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalsSummary;