
import React, { useState } from 'react';
import { Plus, Trash2, FileStack, BookOpen, Check, X, Calendar, ArrowRight } from 'lucide-react';
import { Challenge, Template } from '../types';
import { CHALLENGES } from '../constants';

const TemplateBuilder: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem('cs_templates');
    return saved ? JSON.parse(saved) : [
      {
        id: 'default-1',
        name: 'Senior Frontend Engineer',
        description: 'Standard technical assessment for high-level UI roles.',
        challengeIds: ['1', '2'],
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const saveTemplates = (newTemplates: Template[]) => {
    setTemplates(newTemplates);
    localStorage.setItem('cs_templates', JSON.stringify(newTemplates));
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: newName,
      description: newDesc,
      challengeIds: selectedIds,
      createdAt: new Date().toISOString()
    };

    saveTemplates([newTemplate, ...templates]);
    resetForm();
  };

  const resetForm = () => {
    setNewName('');
    setNewDesc('');
    setSelectedIds([]);
    setIsCreating(false);
  };

  const deleteTemplate = (id: string) => {
    saveTemplates(templates.filter(t => t.id !== id));
  };

  const toggleChallenge = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-100 mb-2">Assessment Templates</h2>
          <p className="text-slate-400">Build custom challenge sets for specific job roles or skill levels.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <Plus size={20} />
            New Template
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-100">Create New Template</h3>
            <button onClick={resetForm} className="text-slate-500 hover:text-slate-300">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Template Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Fullstack Developer (L5)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-indigo-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  rows={4}
                  placeholder="What is this assessment for?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-indigo-600 transition-colors resize-none"
                />
              </div>

              <div className="p-6 bg-indigo-600/5 border border-indigo-500/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-indigo-400 font-bold">Summary</h4>
                  <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {selectedIds.length} Challenges
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  You are building an assessment with {selectedIds.length} challenge{selectedIds.length !== 1 ? 's' : ''}. 
                  Estimated time: {selectedIds.length * 30} minutes.
                </p>
              </div>

              <button 
                onClick={handleCreate}
                disabled={!newName.trim() || selectedIds.length === 0}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
              >
                Save Template
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Select Challenges</label>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {CHALLENGES.map(challenge => (
                  <div 
                    key={challenge.id}
                    onClick={() => toggleChallenge(challenge.id)}
                    className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-center justify-between group ${
                      selectedIds.includes(challenge.id) 
                        ? 'bg-indigo-600/10 border-indigo-600/50' 
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedIds.includes(challenge.id) ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {selectedIds.includes(challenge.id) ? <Check size={20} /> : <BookOpen size={20} />}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-200 text-sm">{challenge.title}</h5>
                        <p className="text-xs text-slate-500">{challenge.difficulty} • {challenge.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div key={template.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl group hover:border-indigo-600/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-slate-950 p-3 rounded-2xl text-indigo-400">
                  <FileStack size={24} />
                </div>
                <button 
                  onClick={() => deleteTemplate(template.id)}
                  className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">
                {template.name}
              </h4>
              <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                {template.description || "No description provided."}
              </p>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between py-3 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <BookOpen size={14} />
                    <span>{template.challengeIds.length} Challenges</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Calendar size={14} />
                    <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-950 border border-slate-800 hover:border-indigo-600/30 text-slate-300 rounded-xl text-sm font-bold transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600">
                  Use Template
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty State Card */}
          {templates.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
              <FileStack size={48} className="text-slate-700 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-slate-300">No Templates Found</h4>
              <p className="text-slate-500 mb-6">Create your first custom assessment template to streamline hiring.</p>
              <button 
                onClick={() => setIsCreating(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold"
              >
                Create New
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;
