import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader, AlertCircle } from "lucide-react";
import QuestionRow from "../components/question-preview-com/QuestionRow";
import ExpandedRowDetails from "../components/question-preview-com/ExpandedRowDetails";
import PreviewTableHeader from "../components/question-preview-com/PreviewTableHeader";
import TotalsSummary from "../components/question-preview-com/TotalsSummary";
import Pagination from "../components/question-preview-com/Pagination";
import ActionBar from "../components/question-preview-com/ActionBar";
import api from "../services/api/api";

interface Question {
  _id?: string;
  id?: number;
  title?: string;
  question?: string;
  type: string;
  difficulty: string;
  category: string;
  description?: string;
  explanation?: string;
  marks?: number;
  negative?: number;
  maxOptLimit?: number;
  points?: number;
  options?: any[];
  matchingPairs?: any[];
  initialCode?: string;
  starterCode?: string;
  createdAt?: string;
}

const QuestionsPreview: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [mcqRes, codingRes] = await Promise.all([
        api.get("/questions/mcq"),
        api.get("/questions/coding"),
      ]);

      const mcqQuestions: Question[] = (mcqRes.data || []).map(
        (q: any, idx: number) => ({
          _id: q._id || `mcq-${idx}`,
          title: q.question || "Untitled MCQ",
          type: "MCQ",
          difficulty: q.difficulty || "medium",
          category: q.category || "general",
          description: q.explanation || "",
          marks: q.points || 1.0,
          negative: 0,
          options: q.options || [],
          points: q.points || 10,
        }),
      );

      const codingQuestions: Question[] = (codingRes.data || []).map(
        (q: any, idx: number) => ({
          _id: q._id || `coding-${idx}`,
          title: q.title || "Untitled Coding",
          type: "CODING",
          difficulty: q.difficulty || "medium",
          category: q.category || "javascript",
          description: q.description || "",
          marks: q.points || 1.0,
          negative: 0,
          points: q.points || 100,
          starterCode: q.starterCode || "",
        }),
      );

      setQuestions([...mcqQuestions, ...codingQuestions]);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
      setError("Failed to load questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(startIdx, startIdx + itemsPerPage);

  const toggleSelectQuestion = (id: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedQuestions(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedQuestions.size === questions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(questions.map((q) => q._id || "")));
    }
  };

  const deleteSelected = async () => {
    if (!window.confirm(`Delete ${selectedQuestions.size} question(s)?`))
      return;

    try {
      for (const id of selectedQuestions) {
        const question = questions.find((q) => q._id === id);
        if (question?.type === "MCQ") {
          await api.delete(`/questions/mcq/${id}`);
        } else if (question?.type === "CODING") {
          await api.delete(`/questions/coding/${id}`);
        }
      }
      setSelectedQuestions(new Set());
      fetchQuestions();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete selected questions");
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      const question = questions.find((q) => q._id === id);
      if (question?.type === "MCQ") {
        await api.delete(`/questions/mcq/${id}`);
      } else if (question?.type === "CODING") {
        await api.delete(`/questions/coding/${id}`);
      }
      setSelectedQuestions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      fetchQuestions();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete question");
    }
  };

  const handleEditQuestion = (id: string) => {
    const question = questions.find((q) => q._id === id);
    if (!question) return;

    navigate("/question_build", {
      state: {
        questionId: id,
        questionType: question.type,
      },
    });
  };

  const toggleExpandRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">
            Questions Preview
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Review and manage all your created questions. Edit, delete, or
            select multiple questions.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-3">
            <AlertCircle
              className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
              size={20}
            />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <Loader
                className="animate-spin text-indigo-600 dark:text-indigo-400"
                size={32}
              />
              <p className="text-slate-600 dark:text-slate-400">
                Loading questions...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Actions Bar */}
            {questions.length > 0 && (
              <div className="mb-6">
                <ActionBar
                  totalQuestions={questions.length}
                  selectedCount={selectedQuestions.size}
                  onDeleteSelected={deleteSelected}
                />
              </div>
            )}

            {/* Table */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <PreviewTableHeader
                    allSelected={
                      selectedQuestions.size === questions.length &&
                      questions.length > 0
                    }
                    totalQuestions={questions.length}
                    onSelectAll={toggleSelectAll}
                  />
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {paginatedQuestions.map((question, idx) => (
                      <React.Fragment key={question._id}>
                        <QuestionRow
                          question={{
                            id: idx + 1,
                            title:
                              question.title || question.question || "Untitled",
                            type: question.type,
                            difficulty: question.difficulty,
                            marks: question.marks,
                            negative: question.negative,
                            maxOptLimit: question.maxOptLimit,
                          }}
                          index={startIdx + idx + 1}
                          isSelected={selectedQuestions.has(question._id || "")}
                          isExpanded={expandedRows.has(question._id || "")}
                          onSelectChange={() =>
                            toggleSelectQuestion(question._id || "")
                          }
                          onEdit={() => handleEditQuestion(question._id || "")}
                          onDelete={() =>
                            handleDeleteQuestion(question._id || "")
                          }
                          onExpandToggle={() =>
                            toggleExpandRow(question._id || "")
                          }
                        />
                        {expandedRows.has(question._id || "") && (
                          <ExpandedRowDetails
                            question={{
                              id: 0,
                              title:
                                question.title ||
                                question.question ||
                                "Untitled",
                              type: question.type,
                              difficulty: question.difficulty,
                              category: question.category || "",
                              description: question.description || "",
                              options: question.options,
                              initialCode: question.starterCode,
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {questions.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400 text-lg">
                    No questions created yet. Start by creating your first
                    question.
                  </p>
                </div>
              )}
            </div>

            {/* Totals Section */}
            {questions.length > 0 && (
              <div className="mb-8">
                <TotalsSummary
                  totalQuestions={questions.length}
                  totalMarks={questions.reduce(
                    (sum, q) => sum + Number(q.marks || 0),
                    0,
                  )}
                  totalNegativeMarks={questions.reduce(
                    (sum, q) => sum + Number(q.negative || 0),
                    0,
                  )}
                />
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mb-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex gap-4 justify-between">
              <button
                onClick={() => navigate("/question_build")}
                className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
              >
                <ChevronLeft size={18} />
                Back to Builder
              </button>

              <button
                disabled={questions.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save All Questions
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionsPreview;
