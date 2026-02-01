import React from "react";
import { ChevronDown } from "lucide-react";

interface FormSelectProps {
  name: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  icon,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
          {icon}
        </span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-10 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-white dark:bg-slate-900">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          size={18}
        />
      </div>
    </div>
  );
};

export default FormSelect;
