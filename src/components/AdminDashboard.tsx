import React, { useState } from 'react';
import { User, Issue, Project, SystemKPIs } from '../types';
import { ShieldCheck, LayoutDashboard, FileText, Users, TrendingUp, CheckCircle2, Clock, AlertTriangle, UserCheck, Plus, Settings } from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  issues: Issue[];
  projects: Project[];
  kpis: SystemKPIs;
  onUpdateIssueStatus: (issueId: string, status: Issue['status'], engineer?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  issues,
  projects,
  kpis,
  onUpdateIssueStatus
}) => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'tickets' | 'projects' | 'vendors'>('tickets');
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [engineerName, setEngineerName] = useState('');

  const handleAssignEngineer = (issueId: string) => {
    onUpdateIssueStatus(issueId, 'In Progress', engineerName || 'Engr. Ibrahim Sani');
    setAssigningId(null);
    setEngineerName('');
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-6 shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Ministry Admin Console</span>
          </div>
          <h2 className="text-lg font-bold text-white">{currentUser.name}</h2>
          <p className="text-xs text-slate-400">Zamfara State Ministry of Works</p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'tickets' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Ticket Review Matrix ({issues.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('kpis')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'kpis' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Operational KPIs & SDG 9</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>State Projects Budget</span>
          </button>

          <button
            onClick={() => setActiveTab('vendors')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'vendors' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Vendor Verifications</span>
          </button>
        </nav>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-blue-400">Security Clearance</div>
          <div className="text-xs text-slate-300">Level 5 State Superuser</div>
          <div className="text-[10px] text-emerald-400 font-mono">● Encrypted Gov Connection</div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* KPI CARDS HEADER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">Total Logged Issues</div>
            <div className="text-3xl font-extrabold text-white mt-1">{issues.length}</div>
            <div className="text-xs text-emerald-400 mt-2">⚡ 74% resolution rate</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">Active Road & Infra Projects</div>
            <div className="text-3xl font-extrabold text-blue-400 mt-1">{projects.length}</div>
            <div className="text-xs text-slate-400 mt-2">Across 14 LGAs</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">Budget Utilization Rate</div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">{kpis.budgetUtilization}%</div>
            <div className="text-xs text-slate-400 mt-2">₦32.5B Total Capital Outlay</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">SDG 9 Impact Index</div>
            <div className="text-3xl font-extrabold text-teal-400 mt-1">{kpis.sdg9ImpactScore}</div>
            <div className="text-xs text-emerald-400 mt-2">Top 5 Northern States</div>
          </div>
        </div>

        {/* TICKET REVIEW MATRIX TAB */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Citizen Ticket Review Matrix</h2>
                <p className="text-sm text-slate-400">Review citizen reports, assign regional engineers, and update resolution lifecycle statuses.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-4">Ticket ID & Type</th>
                      <th className="p-4">LGA & Location</th>
                      <th className="p-4">Description</th>
                      <th className="p-4">Reporter</th>
                      <th className="p-4">Status & Engineer</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {issues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-medium text-white">
                          <div>{issue.id}</div>
                          <span className="text-xs text-emerald-400">{issue.issueType}</span>
                        </td>
                        <td className="p-4 font-medium text-white">{issue.lga} LGA</td>
                        <td className="p-4 max-w-xs truncate text-xs text-slate-400">{issue.description}</td>
                        <td className="p-4 text-xs">{issue.reportedBy}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
                            issue.status === 'Resolved' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' :
                            issue.status === 'In Progress' ? 'bg-blue-900/60 text-blue-300 border border-blue-700' :
                            'bg-amber-900/60 text-amber-300 border border-amber-700'
                          }`}>
                            {issue.status}
                          </span>
                          {issue.assignedEngineer && (
                            <div className="text-[10px] text-slate-400 mt-1">Engr: {issue.assignedEngineer}</div>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => onUpdateIssueStatus(issue.id, 'Resolved')}
                            className="bg-emerald-600/80 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium"
                          >
                            Resolve
                          </button>
                          <button
                            onClick={() => setAssigningId(issue.id)}
                            className="bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-medium"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* OPERATIONAL KPIS & SDG 9 TAB */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">SDG 9 Impact & Telemetry Analytics</h2>
              <p className="text-sm text-slate-400">Monitoring industrialization, innovation, and sustainable infrastructure indicators.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-base text-white">Infrastructure Resilience Index by LGA</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Gusau Capital Metropolis</span>
                      <span className="text-emerald-400 font-bold">92%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Talata Mafara Agro Zone</span>
                      <span className="text-teal-400 font-bold">84%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full"><div className="bg-teal-400 h-2 rounded-full" style={{ width: '84%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Bakura Energy Grid Cluster</span>
                      <span className="text-emerald-400 font-bold">96%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full"><div className="bg-emerald-400 h-2 rounded-full" style={{ width: '96%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Kaura Namoda Corridor</span>
                      <span className="text-amber-400 font-bold">71%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full"><div className="bg-amber-400 h-2 rounded-full" style={{ width: '71%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-base text-white">Ministry Budget Allocation Breakdown</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span>Transport & Aviation (Gusau Airport)</span>
                    <span className="font-bold text-emerald-400">₦14.8B</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span>Water Resources (Talata Mafara Scheme)</span>
                    <span className="font-bold text-blue-400">₦6.5B</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span>Agriculture & Roads (Anka-Bukkuyum)</span>
                    <span className="font-bold text-teal-400">₦5.1B</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span>Digital Fiber Backbone (ZIIT)</span>
                    <span className="font-bold text-purple-400">₦4.2B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS BUDGET TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">State Capital Projects Overview</h2>
              <p className="text-sm text-slate-400">Manage capital allocation, milestones, and contractor accountability.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">LGA</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4">Contractor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-white">{proj.title}</td>
                      <td className="p-4">{proj.lga} LGA</td>
                      <td className="p-4 text-emerald-400 font-bold">{proj.budget}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs">{proj.progress}%</span>
                          <div className="w-20 bg-slate-950 h-2 rounded-full"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${proj.progress}%` }}></div></div>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-slate-400">{proj.contractor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VENDOR VERIFICATIONS TAB */}
        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Vendor & Contractor Verifications</h2>
              <p className="text-sm text-slate-400">Review pending contractor license applications and compliance documents.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <h4 className="font-bold text-white text-sm">Savannah Civil Engineering Ltd</h4>
                  <p className="text-xs text-slate-400">Applied for Anka-Bukkuyum Road Lot 2 • CAC #RC-99821</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => alert('Vendor verified successfully!')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Verify & Approve</button>
                  <button onClick={() => alert('Vendor request flagged.')} className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Reject</button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <h4 className="font-bold text-white text-sm">Gongoni Power & REA Partners</h4>
                  <p className="text-xs text-slate-400">Applied for Bakura Solar Extension • CAC #RC-44512</p>
                </div>
                <span className="text-xs bg-emerald-900/60 text-emerald-300 px-3 py-1 rounded font-mono">Verified & Active</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Engineer Assignment Modal */}
      {assigningId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-sm rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold">Assign Regional Engineer</h3>
            <p className="text-xs text-slate-400">Assign an authorized Zamfara State Ministry engineer to ticket #{assigningId}.</p>
            
            <input
              type="text"
              placeholder="e.g. Engr. Yusuf Garba"
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />

            <div className="flex space-x-2">
              <button
                onClick={() => setAssigningId(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAssignEngineer(assigningId)}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-bold"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
