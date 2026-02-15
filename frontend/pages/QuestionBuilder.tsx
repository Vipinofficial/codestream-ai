import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Eye,
  Activity,
} from "lucide-react";
import FormInput from "../components/question-builder/FormInput";
import FormTextarea from "../components/question-builder/FormTextarea";
import FormSelect from "../components/question-builder/FormSelect";
import api from "../services/api/api";
import { useToast } from "@/context/ToastContext";
import { useLocation } from "react-router-dom";

const QUESTION_TYPES = ["CODING", "MCQ", "MULTI_SELECT"] as const;

const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

type QuestionType = (typeof QUESTION_TYPES)[number];

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
  const navigate = useNavigate();
  const location = useLocation();
  const editState = location.state as {
    questionId?: string;
    questionType?: string;
  } | null;
  useEffect(() => {
    if (!isEditMode) return;

    const fetchQuestionForEdit = async () => {
      try {
        let res;

        if (editState?.questionType === "MCQ") {
          res = await api.get(`/questions/mcq/${editState.questionId}`);
        } else {
          res = await api.get(`/questions/coding/${editState.questionId}`);
        }

        const q = res.data;

        if (editState?.questionType === "MCQ") {
          setForm({
            title: q.question,
            type: "MCQ",
            difficulty: q.difficulty,
            category: q.category,
            description: q.explanation,
            initialCode: "",
            testCode: "",
            options: q.options.map((o: any, index: number) => ({
              id: index + 1,
              text: o.text,
              isCorrect: o.isCorrect,
            })),
            matchingPairs: [],
          });
        } else {
          setForm({
            title: q.title,
            type: "CODING",
            difficulty: q.difficulty,
            category: q.category,
            description: q.description,
            initialCode: q.starterCode,
            testCode: "",
            options: [{ id: 1, text: "", isCorrect: false }],
            matchingPairs: [],
          });
        }
      } catch (error) {
        showToast("Failed to load question for editing", "error");
      }
    };

    fetchQuestionForEdit();
  }, [editState]);
  const isEditMode = !!editState?.questionId;
  const initialFormState = {
    title: "",
    type: "CODING" as QuestionType,
    difficulty: "Easy",
    category: "",
    description: "",
    initialCode: "",
    testCode: "",
    options: [{ id: 1, text: "", isCorrect: false }],
    matchingPairs: [{ id: 1, prompt: "", answer: "" }],
  };

  const [form, setForm] = useState<any>(initialFormState);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const fetchQuestionCount = async () => {
    try {
      const [mcqRes, codingRes] = await Promise.all([
        api.get("/questions/mcq"),
        api.get("/questions/coding"),
      ]);

      const total =
        (Array.isArray(mcqRes.data) ? mcqRes.data.length : 0) +
        (Array.isArray(codingRes.data) ? codingRes.data.length : 0);

      setQuestionCount(total);
    } catch (error: any) {
      console.error("Failed to fetch question count:", error);

      showToast(
        error?.response?.data?.message || "Unable to fetch question count",
        "error",
      );
    }
  };

  const handleNavigateToPreview = () => {
    navigate("/question_preview");
  };

  useEffect(() => {
    fetchQuestionCount();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // 🔎 Basic Validation
    if (!form.title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    if (!form.description.trim()) {
      showToast("Description is required", "error");
      return;
    }

    if (form.type === "MCQ" || form.type === "MULTI_SELECT") {
      if (
        !form.options.length ||
        form.options.some((o: Option) => !o.text.trim())
      ) {
        showToast("All options must be filled", "error");
        return;
      }

      const hasCorrect = form.options.some((o: Option) => o.isCorrect);
      if (!hasCorrect) {
        showToast("Select at least one correct answer", "error");
        return;
      }
    }

    setIsLoading(true);

    try {
      let payload;

      if (form.type === "MCQ") {
        payload = {
          question: form.title,
          options: form.options.map((o: Option) => ({
            text: o.text.trim(),
            isCorrect: !!o.isCorrect,
          })),
          category: (form.category || "general").toLowerCase(),
          difficulty: (form.difficulty || "medium").toLowerCase(),
          explanation: form.description,
          points: 10,
        };

        if (isEditMode) {
          await api.put(`/questions/mcq/${editState?.questionId}`, payload);
          showToast("MCQ updated successfully!", "success");
        } else {
          await api.post("/questions/mcq", payload);
          showToast("MCQ saved successfully!", "success");
        }
      } else if (form.type === "CODING") {
        payload = {
          title: form.title,
          description: form.description,
          category: (form.category || "javascript").toLowerCase(),
          difficulty: (form.difficulty || "medium").toLowerCase(),
          constraints: "",
          starterCode: form.initialCode || "",
          testCases: [
            {
              input: "",
              expectedOutput: form.testCode || "",
              isHidden: false,
            },
          ],
          timeLimit: 30,
          points: 100,
          tags: [],
        };

        if (isEditMode) {
          await api.put(`/questions/coding/${editState?.questionId}`, payload);
          showToast("Coding question updated!", "success");
        } else {
          await api.post("/questions/coding", payload);
          showToast("Coding question saved!", "success");
        }
      } else {
        payload = {
          question: form.title,
          options: form.options.map((o: Option) => ({
            text: o.text.trim(),
            isCorrect: !!o.isCorrect,
          })),
          category: (form.category || "general").toLowerCase(),
          difficulty: (form.difficulty || "medium").toLowerCase(),
          explanation: form.description,
          points: 10,
        };
        console.log("payload", payload);
        await api.post("/questions/mcq", payload);
        showToast("Question saved successfully!", "success");
      }

      if (isEditMode) {
        navigate("/question_preview");
      }
      
      setForm(initialFormState);
      await fetchQuestionCount();
    } catch (error: any) {
      console.error("Save question error:", error);

      showToast(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while saving the question",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
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
      option.id === id ? { ...option, text } : option,
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
    const newId =
      form.options.length > 0
        ? Math.max(...form.options.map((o: Option) => o.id)) + 1
        : 1;
    setForm({
      ...form,
      options: [...form.options, { id: newId, text: "", isCorrect: false }],
    });
  };

  const removeOption = (id: number) => {
    const newOptions = form.options.filter(
      (option: Option) => option.id !== id,
    );
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
      option.id === id ? { ...option, isCorrect: !option.isCorrect } : option,
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

  const handleMatchingPairChange = (
    id: number,
    field: "prompt" | "answer",
    value: string,
  ) => {
    const newPairs = form.matchingPairs.map((pair: MatchingPair) =>
      pair.id === id ? { ...pair, [field]: value } : pair,
    );
    setForm({ ...form, matchingPairs: newPairs });
  };

  const addMatchingPair = () => {
    const newId =
      form.matchingPairs.length > 0
        ? Math.max(...form.matchingPairs.map((p: MatchingPair) => p.id)) + 1
        : 1;
    setForm({
      ...form,
      matchingPairs: [
        ...form.matchingPairs,
        { id: newId, prompt: "", answer: "" },
      ],
    });
  };

  const removeMatchingPair = (id: number) => {
    const newPairs = form.matchingPairs.filter(
      (pair: MatchingPair) => pair.id !== id,
    );
    setForm({ ...form, matchingPairs: newPairs });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT SIDE - FORM ================= */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 shadow-xl">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                Create Question
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Build structured and interactive assessment questions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Basic Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b pb-3">
                  Basic Information
                </h2>

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
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white border-b pb-3">
                  Description
                </h2>
                <FormTextarea
                  name="description"
                  label="Problem Statement"
                  icon={<AlignLeft size={18} />}
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                />
              </div>

              {/* Dynamic Sections */}
              {form.type === "CODING" && (
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                  {renderCodingFields()}
                </div>
              )}

              {form.type === "MCQ" && (
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                  {renderMCQFields()}
                </div>
              )}

              {form.type === "MULTI_SELECT" && (
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                  {renderMultiSelectFields()}
                </div>
              )}

              {/* Submit Section */}
              <div className="flex justify-end pt-8 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-3 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white rounded-2xl font-bold tracking-wide shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  <Save size={18} />
                  {isLoading
                    ? isEditMode
                      ? "Updating..."
                      : "Saving..."
                    : isEditMode
                      ? "Update Question"
                      : "Save Question"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ================= RIGHT SIDE - STATS PANEL ================= */}
        <div className="space-y-6">
          <div className="sticky top-8 space-y-6">
            {/* Stats Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <Activity
                  className="text-indigo-600 dark:text-indigo-400"
                  size={28}
                />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Session Stats
                </h3>
              </div>

              <div className="text-center py-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Questions
                </p>
                <p className="text-5xl font-black text-slate-900 dark:text-white mt-2">
                  {questionCount}
                </p>
              </div>
            </div>

            {/* Preview Button */}
            <button
              onClick={handleNavigateToPreview}
              disabled={questionCount === 0}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white rounded-2xl font-bold tracking-wide transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              <Eye size={20} />
              Preview All Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
