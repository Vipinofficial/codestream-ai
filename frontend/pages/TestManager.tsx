import React, { useState, useEffect } from "react";
import { FileStack, List, GitMerge } from "lucide-react";
import TestList from "../components/test-manager/TestList";
import CategoryList from "../components/test-manager/CategoryList";
import MergeTestList from "../components/test-manager/MergeTestList";
import api from "../services/api/api";

interface Question {
  _id: string;
  title?: string;
  question?: string;
  type: "MCQ" | "CODING";
  difficulty: string;
  category: string;
  points?: number;
}

const TestManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "tests" | "categories" | "merge"
  >("tests");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "tests", label: "Tests", icon: List },
    { id: "categories", label: "Categories", icon: FileStack },
    { id: "merge", label: "Create Test", icon: GitMerge },
  ];

  /* ================= FETCH ALL QUESTIONS ================= */

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    setIsLoading(true);
    try {
      const [mcqRes, codingRes] = await Promise.all([
        api.get("/questions/mcq"),
        api.get("/questions/coding"),
      ]);

      const mcq = (mcqRes.data || []).map((q: any) => ({
        _id: q._id,
        title: q.question,
        type: "MCQ",
        difficulty: q.difficulty,
        category: q.category,
        points: q.points || 10,
      }));

      const coding = (codingRes.data || []).map((q: any) => ({
        _id: q._id,
        title: q.title,
        type: "CODING",
        difficulty: q.difficulty,
        category: q.category,
        points: q.points || 100,
      }));

      setQuestions([...mcq, ...coding]);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= SELECTION LOGIC ================= */

  const toggleSelectQuestion = (id: string) => {
    const newSet = new Set(selectedQuestions);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedQuestions(newSet);
  };

  const clearSelection = () => {
    setSelectedQuestions(new Set());
  };

  /* ================= CREATE TEST ================= */

  const createTest = async (testName: string) => {
    if (!testName || selectedQuestions.size === 0) {
      alert("Test name and at least 1 question required");
      return;
    }

    try {
      await api.post("/tests", {
        name: testName,
        questions: Array.from(selectedQuestions),
      });

      alert("Test created successfully!");
      clearSelection();
      setActiveTab("tests");
    } catch (error) {
      console.error("Create test failed:", error);
      alert("Failed to create test");
    }
  };

  /* ================= TAB CONTENT ================= */

  const renderContent = () => {
    switch (activeTab) {
      case "tests":
        return <TestList />;

      case "categories":
        return <CategoryList />;

      case "merge":
        return (
          <MergeTestList
            questions={questions}
            selectedQuestions={selectedQuestions}
            onToggleSelect={toggleSelectQuestion}
            onCreateTest={createTest}
            isLoading={isLoading}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8 lg:p-12 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Test Manager
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as "tests" | "categories" | "merge")
              }
              className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-500 text-indigo-500"
                  : "text-slate-500 hover:text-indigo-500"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="py-10">{renderContent()}</div>
      </div>
    </div>
  );
};

export default TestManager;