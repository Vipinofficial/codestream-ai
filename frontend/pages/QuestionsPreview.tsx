import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import QuestionRow from '../components/question-preview-com/QuestionRow';
import ExpandedRowDetails from '../components/question-preview-com/ExpandedRowDetails';
import PreviewTableHeader from '../components/question-preview-com/PreviewTableHeader';
import TotalsSummary from '../components/question-preview-com/TotalsSummary';
import Pagination from '../components/question-preview-com/Pagination';
import ActionBar from '../components/question-preview-com/ActionBar';

interface Question {
  id: number;
  title: string;
  type: string;
  difficulty: string;
  category: string;
  description: string;
  marks?: number;
  negative?: number;
  maxOptLimit?: number;
  options?: any[];
  matchingPairs?: any[];
  initialCode?: string;
}

interface QuestionsPreviewProps {
  questions: Question[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onBack: () => void;
  onSave: () => void;
  marks?: number;
  negativeMarks?: number;
}

const QuestionsPreview: React.FC<QuestionsPreviewProps> = ({
  questions,
  onDelete,
  onEdit,
  onBack,
  onSave,
  marks = 1.0,
  negativeMarks = 0.0,
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const itemsPerPage = 10;

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(startIdx, startIdx + itemsPerPage);

  const toggleSelectQuestion = (id: number) => {
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
      setSelectedQuestions(new Set(questions.map(q => q.id)));
    }
  };

  const deleteSelected = () => {
    selectedQuestions.forEach(id => onDelete(id));
    setSelectedQuestions(new Set());
  };

  const toggleExpandRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleDeleteQuestion = (id: number) => {
    onDelete(id);
    setSelectedQuestions(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
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
            Review all entered questions before saving. Make edits or delete questions as needed.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="mb-6">
          <ActionBar
            totalQuestions={questions.length}
            selectedCount={selectedQuestions.size}
            onDeleteSelected={deleteSelected}
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <PreviewTableHeader
                allSelected={selectedQuestions.size === questions.length && questions.length > 0}
                totalQuestions={questions.length}
                onSelectAll={toggleSelectAll}
              />
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {paginatedQuestions.map((question, idx) => (
                  <React.Fragment key={question.id}>
                    <QuestionRow
                      question={question}
                      index={startIdx + idx + 1}
                      isSelected={selectedQuestions.has(question.id)}
                      isExpanded={expandedRows.has(question.id)}
                      onSelectChange={toggleSelectQuestion}
                      onEdit={onEdit}
                      onDelete={handleDeleteQuestion}
                      onExpandToggle={toggleExpandRow}
                    />
                    {expandedRows.has(question.id) && (
                      <ExpandedRowDetails question={question} />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {questions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                No questions added yet. Add some questions to see them here.
              </p>
            </div>
          )}
        </div>

        {/* Totals Section */}
        <div className="mb-8">
          <TotalsSummary
            totalQuestions={questions.length}
            marks={marks}
            negativeMarks={negativeMarks}
          />
        </div>

        {/* Pagination */}
        <div className="mb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
          >
            <ChevronLeft size={18} />
            Back to Editor
          </button>

          <button
            onClick={onSave}
            disabled={questions.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save All Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPreview;
