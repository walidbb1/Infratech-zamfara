import React, { useState, useEffect } from 'react';
import { User, Project, Issue, Tender, DigitalSkillCourse, SystemKPIs } from './types';
import { INITIAL_USERS, INITIAL_PROJECTS, INITIAL_ISSUES, INITIAL_TENDERS, DIGITAL_COURSES, INITIAL_KPIS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { AuthModal } from './components/AuthModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // starts logged out
  const [activeTab, setActiveTab] = useState<'home' | 'user-dashboard' | 'admin-dashboard'>('home');
  
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  const [tenders] = useState<Tender[]>(INITIAL_TENDERS);
  const [courses] = useState<DigitalSkillCourse[]>(DIGITAL_COURSES);
  const [kpis] = useState<SystemKPIs>(INITIAL_KPIS);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Sync with backend if available
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setProjects(data); })
      .catch(() => {});

    fetch('/api/issues')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setIssues(data); })
      .catch(() => {});
  }, []);

  const handleAddNewIssue = (newIssueData: Omit<Issue, 'id'>) => {
    const newIssue: Issue = {
      id: `ISS-${100 + issues.length + 1}`,
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...newIssueData
    };
    setIssues(prev => [newIssue, ...prev]);

    // Also post to backend
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssueData)
    }).catch(() => {});
  };

  const handleUpdateIssueStatus = (issueId: string, status: Issue['status'], engineer?: string) => {
    setIssues(prev => prev.map(iss => iss.id === issueId ? { ...iss, status, ...(engineer && { assignedEngineer: engineer }) } : iss));

    fetch(`/api/issues/${issueId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, assignedEngineer: engineer })
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-600 selection:text-white flex flex-col">
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={() => { setCurrentUser(null); setActiveTab('home'); }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAI={() => setAiModalOpen(true)}
      />

      <div className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              kpis={kpis}
              onExploreProjects={() => {
                const el = document.getElementById('project-grid-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenReportModal={() => {
                if (!currentUser) {
                  setAuthModalOpen(true);
                } else {
                  setActiveTab('user-dashboard');
                }
              }}
            />
            <div id="project-grid-section">
              <ProjectGrid projects={projects} />
            </div>
          </>
        )}

        {activeTab === 'user-dashboard' && currentUser && (
          <UserDashboard
            currentUser={currentUser}
            issues={issues}
            tenders={tenders}
            courses={courses}
            onAddNewIssue={handleAddNewIssue}
          />
        )}

        {activeTab === 'admin-dashboard' && currentUser && (
          <AdminDashboard
            currentUser={currentUser}
            issues={issues}
            projects={projects}
            kpis={kpis}
            onUpdateIssueStatus={handleUpdateIssueStatus}
          />
        )}
      </div>

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') setActiveTab('admin-dashboard');
          else setActiveTab('user-dashboard');
        }}
        initialUsers={INITIAL_USERS}
      />

      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        projectsCount={projects.length}
        issuesCount={issues.length}
      />
    </div>
  );
}
