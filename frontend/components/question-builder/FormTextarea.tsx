import React from "react";

interface FormTextareaProps {
  name: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  icon,
  value,
  onChange,
  rows = 4,
}) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
          {icon}
        </span>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all font-mono"
        />
      </div>
    </div>
  );
};

export default FormTextarea;
