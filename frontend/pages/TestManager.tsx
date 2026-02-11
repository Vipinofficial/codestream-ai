import React, { useState } from 'react';
import { FileStack, List, GitMerge, Plus, Share2, BarChart2, Brain, Database, Settings, Upload, CheckSquare, MessageSquare, Users, Award, Calendar, GitBranch, FileText, Zap } from 'lucide-react';
import TestList from '../components/test-manager/TestList';
import CategoryList from '../components/test-manager/CategoryList';
import MergeTestList from '../components/test-manager/MergeTestList';
import TestFromPool from '../components/test-manager/TestFromPool';
import TestDistribution from '../components/test-manager/TestDistribution';
import TestAnalytics from '../components/test-manager/TestAnalytics';
import QuestionBank from '../components/test-manager/QuestionBank';
import TestTemplates from '../components/test-manager/TestTemplates';
import ProctoringSecurity from '../components/test-manager/ProctoringSecurity';
import CandidateManagement from '../components/test-manager/CandidateManagement';
import CommunicationNotifications from '../components/test-manager/CommunicationNotifications';
import TestConfiguration from '../components/test-manager/TestConfiguration';
import ImportExport from '../components/test-manager/ImportExport';
import ScoringValidation from '../components/test-manager/ScoringValidation';
import AdvancedFeatures from '../components/test-manager/AdvancedFeatures';
import TestVersionControl from '../components/test-manager/TestVersionControl';
import TestCalendar from '../components/test-manager/TestCalendar';
import ReportBuilder from '../components/test-manager/ReportBuilder';
import CertificateGenerator from '../components/test-manager/CertificateGenerator';
import WorkflowApproval from '../components/test-manager/WorkflowApproval';
import GapAnalysis from '../components/test-manager/GapAnalysis';
import AssignmentWorkflow from '../components/test-manager/AssignmentWorkflow';
import AssignmentDashboard from '../components/test-manager/AssignmentDashboard';

const TestManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tests' | 'categories' | 'merge' | 'create-pool' | 'distribution' | 'analytics' | 'questions' | 'templates' | 'security' | 'candidates' | 'communication' | 'configure' | 'import' | 'scoring' | 'advanced' | 'versions' | 'calendar' | 'reports' | 'certificates' | 'approvals' | 'gaps' | 'assign-workflow' | 'assign-dashboard'>('tests');

  const tabs = [
    { id: 'tests', label: 'Tests', icon: List },
    { id: 'categories', label: 'Categories', icon: FileStack },
    { id: 'merge', label: 'Merge', icon: GitMerge },
    { id: 'create-pool', label: 'Create from Pool', icon: Plus },
    { id: 'distribution', label: 'Distribution', icon: Share2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'questions', label: 'Questions', icon: Brain },
    { id: 'templates', label: 'Templates', icon: FileStack },
    { id: 'security', label: 'Security', icon: Database },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'configure', label: 'Configure', icon: Settings },
    { id: 'import', label: 'Import/Export', icon: Upload },
    { id: 'scoring', label: 'Scoring', icon: CheckSquare },
    { id: 'advanced', label: 'Advanced', icon: Zap },
    { id: 'versions', label: 'Versions', icon: GitBranch },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare },
    { id: 'gaps', label: 'Gap Analysis', icon: Brain },
    { id: 'assign-workflow', label: 'Assign Test', icon: Share2 },
    { id: 'assign-dashboard', label: 'Assignment Track', icon: BarChart2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tests':
        return <TestList />;
      case 'categories':
        return <CategoryList />;
      case 'merge':
        return <MergeTestList />;
      case 'create-pool':
        return <TestFromPool />;
      case 'distribution':
        return <TestDistribution />;
      case 'analytics':
        return <TestAnalytics />;
      case 'questions':
        return <QuestionBank />;
      case 'templates':
        return <TestTemplates />;
      case 'security':
        return <ProctoringSecurity />;
      case 'candidates':
        return <CandidateManagement />;
      case 'communication':
        return <CommunicationNotifications />;
      case 'configure':
        return <TestConfiguration />;
      case 'import':
        return <ImportExport />;
      case 'scoring':
        return <ScoringValidation />;
      case 'advanced':
        return <AdvancedFeatures />;
      case 'versions':
        return <TestVersionControl />;
      case 'calendar':
        return <TestCalendar />;
      case 'reports':
        return <ReportBuilder />;
      case 'certificates':
        return <CertificateGenerator />;
      case 'approvals':
        return <WorkflowApproval />;
      case 'gaps':
        return <GapAnalysis />;
      case 'assign-workflow':
        return <AssignmentWorkflow />;
      case 'assign-dashboard':
        return <AssignmentDashboard />;
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

        <div className="flex border-b border-slate-200 dark:border-white/10 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
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
