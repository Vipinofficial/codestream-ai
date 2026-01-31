import React, { useState } from "react";
import {
  Code,
  List,
  BarChart,
  Tag,
  AlignLeft,
  FileCode,
  Terminal,
  Save,
  Check,
  Plus,
  Trash2,
  GitCommit,
} from "lucide-react";
import FormInput from "../components/question-builder/FormInput";
import FormTextarea from "../components/question-builder/FormTextarea";
import FormSelect from "../components/question-builder/FormSelect";

const QUESTION_TYPES = [
  "CODING",
  "MCQ",
  "MULTI_SELECT",
  "MATCHING",
] as const;

const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

type QuestionType = typeof QUESTION_TYPES[number];

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface MatchingPair {
  id: number;
  prompt: string;
  answer: string;
}

export default function QuestionBuilder() {
  const [form, setForm] = useState<any>({
    title: "",
    type: "CODING" as QuestionType,
    difficulty: "Easy",
    category: "",
    description: "",
    // Coding specific
    initialCode: "",
    testCode: "",
    // MCQ/Multi-select specific
    options: [{ id: 1, text: "", isCorrect: false }],
    // Matching specific
    matchingPairs: [{ id: 1, prompt: "", answer: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Question:", form);
    // TODO: API call here, data needs to be cleaned up based on type
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    setForm((prev: any) => ({
      ...prev,
      type: newType,
      // Reset specific fields when type changes
      initialCode: "",
      testCode: "",
      options: [{ id: 1, text: "", isCorrect: false }],
      matchingPairs: [{ id: 1, prompt: "", answer: "" }],
    }));
  };

  const renderCodingFields = () => (
    <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-wide">
        Coding Section
      </h3>
      <FormTextarea
        name="initialCode"
        label="Initial Code"
        icon={<FileCode size={18} />}
        value={form.initialCode}
        onChange={handleChange}
        rows={8}
      />
      <FormTextarea
        name="testCode"
        label="Test Code"
        icon={<Terminal size={18} />}
        value={form.testCode}
        onChange={handleChange}
        rows={8}
      />
    </div>
  );

  const handleOptionChange = (id: number, text: string) => {
    const newOptions = form.options.map((option: Option) =>
      option.id === id ? { ...option, text } : option
    );
    setForm({ ...form, options: newOptions });
  };

  const handleCorrectChange = (id: number) => {
    const newOptions = form.options.map((option: Option) => ({
      ...option,
      isCorrect: option.id === id,
    }));
    setForm({ ...form, options: newOptions });
  };

  const addOption = () => {
    const newId = form.options.length > 0 ? Math.max(...form.options.map((o: Option) => o.id)) + 1 : 1;
    setForm({
      ...form,
      options: [...form.options, { id: newId, text: "", isCorrect: false }],
    });
  };

  const removeOption = (id: number) => {
    const newOptions = form.options.filter((option: Option) => option.id !== id);
    setForm({ ...form, options: newOptions });
  };

  const renderMCQFields = () => (
    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-wide">
        Multiple Choice Options
      </h3>
      <div className="space-y-4">
        {form.options.map((option: Option, index: number) => (
          <div key={option.id} className="flex items-center gap-4">
            <input
              type="radio"
              name="correctOption"
              checked={option.isCorrect}
              onChange={() => handleCorrectChange(option.id)}
              className="form-radio h-5 w-5 text-indigo-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={() => removeOption(option.id)}
              className="p-2 text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addOption}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        <Plus size={16} />
        Add Option
      </button>
    </div>
  );

  const handleMultiCorrectChange = (id: number) => {
    const newOptions = form.options.map((option: Option) =>
      option.id === id ? { ...option, isCorrect: !option.isCorrect } : option
    );
    setForm({ ...form, options: newOptions });
  };

  const renderMultiSelectFields = () => (
    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-wide">
        Multi-Select Options
      </h3>
      <div className="space-y-4">
        {form.options.map((option: Option, index: number) => (
          <div key={option.id} className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={() => handleMultiCorrectChange(option.id)}
              className="form-checkbox h-5 w-5 text-indigo-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded focus:ring-indigo-500"
            />
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={() => removeOption(option.id)}
              className="p-2 text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addOption}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        <Plus size={16} />
        Add Option
      </button>
    </div>
  );

  const handleMatchingPairChange = (id: number, field: 'prompt' | 'answer', value: string) => {
    const newPairs = form.matchingPairs.map((pair: MatchingPair) =>
      pair.id === id ? { ...pair, [field]: value } : pair
    );
    setForm({ ...form, matchingPairs: newPairs });
  };

  const addMatchingPair = () => {
    const newId = form.matchingPairs.length > 0 ? Math.max(...form.matchingPairs.map((p: MatchingPair) => p.id)) + 1 : 1;
    setForm({
      ...form,
      matchingPairs: [...form.matchingPairs, { id: newId, prompt: "", answer: "" }],
    });
  };

  const removeMatchingPair = (id: number) => {
    const newPairs = form.matchingPairs.filter((pair: MatchingPair) => pair.id !== id);
    setForm({ ...form, matchingPairs: newPairs });
  };

  const renderMatchingFields = () => (
    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-wide">
        Matching Pairs
      </h3>
      <div className="space-y-4">
        {form.matchingPairs.map((pair: MatchingPair, index: number) => (
          <div key={pair.id} className="flex items-center gap-4">
            <input
              type="text"
              value={pair.prompt}
              onChange={(e) => handleMatchingPairChange(pair.id, 'prompt', e.target.value)}
              placeholder={`Prompt ${index + 1}`}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <GitCommit size={24} className="text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={pair.answer}
              onChange={(e) => handleMatchingPairChange(pair.id, 'answer', e.target.value)}
              placeholder={`Answer ${index + 1}`}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={() => removeMatchingPair(pair.id)}
              className="p-2 text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addMatchingPair}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        <Plus size={16} />
        Add Pair
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              Create New Question
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Fill in the details to add a new question to the library.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                name="title"
                label="Title"
                icon={<Code size={18} />}
                value={form.title}
                onChange={handleChange}
              />
              <FormSelect
                name="type"
                label="Question Type"
                icon={<List size={18} />}
                value={form.type}
                onChange={handleTypeChange}
                options={QUESTION_TYPES}
              />
              <FormSelect
                name="difficulty"
                label="Difficulty"
                icon={<BarChart size={18} />}
                value={form.difficulty}
                onChange={handleChange}
                options={DIFFICULTIES}
              />
              <FormInput
                name="category"
                label="Category"
                icon={<Tag size={18} />}
                value={form.category}
                onChange={handleChange}
              />
            </div>

            <FormTextarea
              name="description"
              label="Description"
              icon={<AlignLeft size={18} />}
              value={form.description}
              onChange={handleChange}
              rows={6}
            />

            {form.type === "CODING" && renderCodingFields()}
            
            {form.type === "MCQ" && renderMCQFields()}

            {form.type === "MULTI_SELECT" && renderMultiSelectFields()}

            {form.type === "MATCHING" && renderMatchingFields()}

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-indigo-500/30 active:scale-95"
              >
                <Save size={18} />
                Save Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
