import React, { useState } from 'react';
import { FileStack, List, GitMerge } from 'lucide-react';
import TestList from '../components/test-manager/TestList';
import CategoryList from '../components/test-manager/CategoryList';
import MergeTestList from '../components/test-manager/MergeTestList';

const TestManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tests' | 'categories' | 'merge'>('tests');

  const tabs = [
    { id: 'tests', label: 'Tests', icon: List },
    { id: 'categories', label: 'Categories', icon: FileStack },
    { id: 'merge', label: 'Merge Test', icon: GitMerge },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tests':
        return <TestList />;
      case 'categories':
        return <CategoryList />;
      case 'merge':
        return <MergeTestList />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 lg:p-12">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Test Manager
          </h1>
        </div>

        <div className="flex border-b border-slate-200 dark:border-white/10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-indigo-500 text-indigo-500'
                  : 'text-slate-500 hover:text-indigo-500'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TestManager;
