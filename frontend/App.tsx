import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Editor from './components/Editor';
import AIChat from './components/AIChat';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import RequestAccess from './components/RequestAccess';
import Profile from './components/Profile';
import AdminSettings from './components/AdminSettings';
import TemplateBuilder from './components/TemplateBuilder';
import RecruiterDashboard from './components/RecruiterDashboard';
import ProctoringFeed from './components/ProctoringFeed';
import MCQStep from './components/MCQStep';
import Whiteboard from './components/Whiteboard';
import LiveInterview from './components/LiveInterview';
import ProjectWorkspace from './components/ProjectWorkspace';
import VideoResponseStep from './components/VideoResponseStep';
import SpreadsheetStep from './components/SpreadsheetStep';
import TextResponseStep from './components/TextResponseStep';
import FileUploadStep from './components/FileUploadStep';
import PersonalityStep from './components/PersonalityStep';
import { CHALLENGES as INITIAL_CHALLENGES } from './constants';
import { AppView, Challenge, User, UserRole, SessionStep, ChallengeType, UserCredentials } from './types';
import { api } from './services/api';
import { 
  Code, BookOpen, ChevronRight, Timer, 
  UserCheck, LogOut, FileCheck, CheckCircle2, Zap, 
  Brain, Terminal, Sun, Moon, Info, LayoutGrid, Layers, Globe, Activity, ArrowRight, Video, PenTool, FolderCode, FileText, Table, Upload, Smile
} from 'lucide-react';
import AddCodingQuestionForm from './components/Questions';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [sessionStep, setSessionStep] = useState<SessionStep>(SessionStep.PREVIEW);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('cs_theme') as 'light' | 'dark' || 'dark';
  });

  const [timeLeft, setTimeLeft] = useState(3600);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [showIDEPanel, setShowIDEPanel] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('cs_token');
      if (token) {
        try {
          const user = await api.getCurrentUser();
          setCurrentUser({
            ...user,
            role: mapBackendRoleToFrontend(user.role)
          });
          // Redirect based on role
          if (user.role === 'ADMIN') setView(AppView.SYSTEM_SETTINGS);
          else if (user.role === 'RECRUITER') setView(AppView.ADMIN);
          else setView(AppView.DASHBOARD);
        } catch (err) {
          // Token invalid or expired - clear it
          console.log('Session expired or invalid');
          localStorage.removeItem('cs_token');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem('cs_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAssessmentActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isAssessmentActive, timeLeft]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = async (credentials: UserCredentials) => {
    try {

      const response = await api.login(credentials.email, credentials.password, credentials.selectedRole);
      const { token, user } = response;
      
      // Store token for authenticated requests
      if (token) {
        localStorage.setItem('cs_token', token);
      }
      
      setCurrentUser({
        ...user,
        role: mapBackendRoleToFrontend(user.role)
      });
      console.log(user.role)
      if (user.role === 'ADMIN') setView(AppView.SYSTEM_SETTINGS);
      else if (user.role === 'RECRUITER') setView(AppView.ADMIN);
      else setView(AppView.DASHBOARD);
    } catch (err: any) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const handleRegister = async (data: { name: string; email: string; password: string; role: string }) => {
    try {
      const response = await api.register(data.name, data.email, data.password, data.role);
      const { user } = response;
      setCurrentUser({
        ...user,
        role: mapBackendRoleToFrontend(user.role)
      });
      setView(AppView.DASHBOARD);
    } catch (err: any) {
      console.error("Registration failed:", err);
      throw err;
    }
  };

  const mapBackendRoleToFrontend = (backendRole: string): UserRole => {
    switch (backendRole) {
      case 'ADMIN': return UserRole.ADMIN;
      case 'RECRUITER': return UserRole.RECRUITER;
      case 'candidate': return UserRole.CANDIDATE;
      default: return UserRole.CANDIDATE;
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // Ignore logout errors
    }
    // Clear token
    localStorage.removeItem('cs_token');
    setCurrentUser(null);
    setSelectedChallenge(null);
    setIsAssessmentActive(false);
    setView(AppView.DASHBOARD);
  };

  const startAssessment = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsAssessmentActive(true);
    
    if (challenge.type === ChallengeType.DESIGN) setView(AppView.WHITEBOARD);
    else if (challenge.type === ChallengeType.PROJECT) setView(AppView.PROJECT);
    else if (challenge.type === ChallengeType.VIDEO_RESPONSE) { setSessionStep(SessionStep.VIDEO_RESPONSE); setView(AppView.CHALLENGE); }
    else if (challenge.type === ChallengeType.SPREADSHEET) { setSessionStep(SessionStep.SPREADSHEET); setView(AppView.CHALLENGE); }
    else if (challenge.type === ChallengeType.TEXT) { setSessionStep(SessionStep.TEXT_RESPONSE); setView(AppView.CHALLENGE); }
    else if (challenge.type === ChallengeType.FILE_UPLOAD) { setSessionStep(SessionStep.FILE_UPLOAD); setView(AppView.CHALLENGE); }
    else if (challenge.type === ChallengeType.PERSONALITY) { setSessionStep(SessionStep.PERSONALITY); setView(AppView.CHALLENGE); }
    else {
      setSessionStep(challenge.type === ChallengeType.THEORY ? SessionStep.MCQ : SessionStep.CODING);
      setView(AppView.CHALLENGE);
    }
  };

  const stopAssessment = () => {
    setIsAssessmentActive(false);
    setView(AppView.DASHBOARD);
  };

  // Show loading while checking for session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    if (view === AppView.FORGOT_PASSWORD) return <ForgotPassword onBack={() => setView(AppView.DASHBOARD)} />;
    if (view === AppView.REGISTER) return <Register onRegister={handleRegister} onNavigate={setView} />;
    if (view === AppView.REQUEST_ACCESS) return <RequestAccess onBack={() => setView(AppView.DASHBOARD)} />;
    return <Login onLogin={handleLogin} onNavigate={setView} />;
  }

  const renderDashboard = () => (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-12">
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">Mission Grid</h2>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Active Intelligence Nodes</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                 <button className="p-2.5 text-indigo-500 bg-white dark:bg-slate-900 rounded-lg shadow-sm"><LayoutGrid size={18}/></button>
                 <button className="p-2.5 text-slate-400 hover:text-slate-200"><Activity size={18}/></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  onClick={() => { setSelectedChallenge(challenge); setView(AppView.ASSESSMENT_START); }}
                  className="group relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 hover:border-indigo-500/30 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className={`p-4 rounded-2xl ${
                      challenge.type === ChallengeType.THEORY ? 'bg-amber-500/10 text-amber-500' : 
                      challenge.type === ChallengeType.DESIGN ? 'bg-emerald-500/10 text-emerald-500' :
                      challenge.type === ChallengeType.PROJECT ? 'bg-blue-500/10 text-blue-500' :
                      challenge.type === ChallengeType.VIDEO_RESPONSE ? 'bg-red-500/10 text-red-500' :
                      challenge.type === ChallengeType.SPREADSHEET ? 'bg-emerald-500/10 text-emerald-500' :
                      challenge.type === ChallengeType.FILE_UPLOAD ? 'bg-purple-500/10 text-purple-500' :
                      challenge.type === ChallengeType.PERSONALITY ? 'bg-pink-500/10 text-pink-500' :
                      'bg-indigo-500/10 text-indigo-500'
                    } border border-transparent group-hover:border-current transition-all`}>
                      {challenge.type === ChallengeType.THEORY ? <Brain size={24} /> : 
                       challenge.type === ChallengeType.DESIGN ? <PenTool size={24} /> :
                       challenge.type === ChallengeType.PROJECT ? <FolderCode size={24} /> :
                       challenge.type === ChallengeType.VIDEO_RESPONSE ? <Video size={24} /> :
                       challenge.type === ChallengeType.SPREADSHEET ? <Table size={24} /> :
                       challenge.type === ChallengeType.FILE_UPLOAD ? <Upload size={24} /> :
                       challenge.type === ChallengeType.PERSONALITY ? <Smile size={24} /> :
                       <Code size={24} />}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{challenge.difficulty}</p>
                      <div className="flex gap-1 justify-end">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`w-1 h-3 rounded-full ${i <= (challenge.difficulty === 'Easy' ? 1 : challenge.difficulty === 'Medium' ? 2 : 3) ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2 group-hover:text-indigo-500 transition-colors tracking-tight text-slate-900 dark:text-white">{challenge.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 font-medium leading-relaxed">{challenge.description}</p>
                  </div>

                  <div className="flex items-center justify-between relative z-10 pt-6 border-t border-slate-100 dark:border-white/5">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {challenge.category}
                    </span>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500 group-hover:translate-x-1 transition-transform">
                      Initiate <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="xl:col-span-4 space-y-8">
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
              <Zap className="absolute -top-6 -right-6 text-white/10 w-48 h-48 rotate-12" />
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-2 tracking-tight">Logic Capacity</h4>
                <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed">System performance is optimal. All AI neural nodes synchronized.</p>
                <div className="space-y-4">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span>Grid Load</span>
                      <span>14%</span>
                   </div>
                   <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[14%] rounded-full shadow-[0_0_12px_#fff]" />
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Assessment Modes</h4>
               <div className="space-y-4">
                 <button onClick={() => setView(AppView.LIVE_INTERVIEW)} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-indigo-500 transition-all group">
                   <div className="flex items-center gap-3">
                     <Video size={16} className="text-emerald-500" />
                     <span className="text-xs font-black uppercase tracking-widest">Live AI Interview</span>
                   </div>
                   <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                 </button>
                 {currentUser.role !== UserRole.CANDIDATE && (
                    <button onClick={() => setView(AppView.ADMIN)} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-indigo-500 transition-all group">
                      <div className="flex items-center gap-3">
                        <Terminal size={16} className="text-indigo-500" />
                        <span className="text-xs font-black uppercase tracking-widest">Recruiter Command</span>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                 )}
               </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );

  const renderSessionContent = () => {
    if (!selectedChallenge) return null;

    return (
      <div className="flex flex-col h-full w-full bg-[#020617]">
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl shrink-0 z-50">
           <div className="flex items-center gap-6">
             <button onClick={() => setShowIDEPanel(!showIDEPanel)} className={`p-2 rounded-xl transition-all ${showIDEPanel ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}>
               <Layers size={18} />
             </button>
             <div className="h-4 w-[1px] bg-white/10" />
             <div className="flex flex-col">
               <span className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-0.5">Assessment Session</span>
               <h2 className="text-sm font-black tracking-tight text-white">{selectedChallenge.title}</h2>
             </div>
           </div>

           <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                 <Timer size={14} className="text-indigo-400" />
                 <span className="text-xs font-mono font-black text-white">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
              </div>
              <button 
                onClick={stopAssessment}
                className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                Abort Link
              </button>
           </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <aside className={`transition-all duration-500 ease-in-out bg-[#020617] border-r border-white/5 overflow-hidden flex flex-col shrink-0 ${showIDEPanel ? 'w-[450px]' : 'w-0'}`}>
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6 flex items-center gap-2">
                <Info size={12} className="text-indigo-500" /> Protocol-Doc_X01
              </h3>
              <div className="space-y-6 text-slate-400 leading-relaxed font-medium">
                {selectedChallenge.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>

              {selectedChallenge.testCases && (
                <div className="mt-12 space-y-4">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">IO Unit Nodes</h4>
                  {selectedChallenge.testCases.map((tc, idx) => (
                    <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-indigo-500/30 transition-all">
                      <p className="text-[10px] font-mono text-indigo-400 mb-1">Input: {tc.input}</p>
                      <p className="text-[10px] font-mono text-emerald-400">Expect: {tc.expectedOutput}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          <main className="flex-1 flex flex-col bg-[#020617] relative">
             {view === AppView.WHITEBOARD ? (
               <Whiteboard challenge={selectedChallenge} />
             ) : view === AppView.PROJECT ? (
               <ProjectWorkspace challenge={selectedChallenge} />
             ) : sessionStep === SessionStep.MCQ ? (
               <MCQStep questions={selectedChallenge.mcqs || []} onComplete={stopAssessment} />
             ) : sessionStep === SessionStep.VIDEO_RESPONSE ? (
               <VideoResponseStep challenge={selectedChallenge} onComplete={stopAssessment} />
             ) : sessionStep === SessionStep.SPREADSHEET ? (
               <SpreadsheetStep challenge={selectedChallenge} onComplete={stopAssessment} />
             ) : sessionStep === SessionStep.TEXT_RESPONSE ? (
               <TextResponseStep challenge={selectedChallenge} onComplete={stopAssessment} />
             ) : sessionStep === SessionStep.FILE_UPLOAD ? (
               <FileUploadStep challenge={selectedChallenge} onComplete={stopAssessment} />
             ) : sessionStep === SessionStep.PERSONALITY ? (
               <PersonalityStep questions={selectedChallenge.personalityQuestions || []} onComplete={stopAssessment} />
             ) : (
               <Editor challenge={selectedChallenge} onSubmissionComplete={() => setSessionStep(SessionStep.FINISHED)} />
             )}
          </main>
        </div>
        
        {isAssessmentActive && currentUser.role === UserRole.CANDIDATE && <ProctoringFeed />}
      </div>
    );
  };

  const renderContent = () => {
    switch (view) {
      case AppView.DASHBOARD: return renderDashboard();
      case AppView.QUESTIONS: return <AddCodingQuestionForm/>
      case AppView.ASSESSMENT_START: return (
        <div className="flex items-center justify-center h-full p-8 bg-[#020617]">
          <div className="max-w-xl w-full bg-white/[0.02] border border-white/10 rounded-[3rem] p-16 text-center animate-in zoom-in-95 duration-500 shadow-2xl">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-indigo-600/30">
               <Globe size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Initiate Link?</h2>
            <p className="text-slate-500 text-lg mb-12 font-medium">The neural interface will monitor logic patterns and biometric telemetry throughout the session.</p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
               <button onClick={() => setView(AppView.DASHBOARD)} className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Decline</button>
               <button onClick={() => startAssessment(selectedChallenge!)} className="py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all">Authorize Session</button>
            </div>
          </div>
        </div>
      );
      case AppView.CHALLENGE: 
      case AppView.WHITEBOARD:
      case AppView.PROJECT: return renderSessionContent();
      case AppView.LIVE_INTERVIEW: return <LiveInterview onComplete={stopAssessment} />;
      case AppView.TEMPLATES: return <TemplateBuilder />;
      case AppView.ADMIN: return <RecruiterDashboard onAddChallenge={(c) => setChallenges([...challenges, c])} />;
      case AppView.SYSTEM_SETTINGS: return <AdminSettings />;
      case AppView.PROFILE: return <Profile user={currentUser!} onUpdate={setCurrentUser} onLogout={handleLogout} />;
      default: return renderDashboard();
    }
  };

  return (
    <Layout activeView={view} setView={setView} currentUser={currentUser} selectedChallenge={selectedChallenge} isSessionActive={isAssessmentActive} theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;

