import React, { useState } from 'react';
import { User, Issue, Tender, DigitalSkillCourse } from '../types';
import { LayoutDashboard, FileText, Briefcase, GraduationCap, PlusCircle, CheckCircle2, Clock, AlertTriangle, UploadCloud, MapPin, Award } from 'lucide-react';

interface UserDashboardProps {
  currentUser: User;
  issues: Issue[];
  tenders: Tender[];
  courses: DigitalSkillCourse[];
  onAddNewIssue: (issue: Omit<Issue, 'id'>) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  issues,
  tenders,
  courses,
  onAddNewIssue
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'tenders' | 'skills'>('overview');

  // Report Issue form state
  const [issueType, setIssueType] = useState<Issue['issueType']>('Road Deficit');
  const [lga, setLga] = useState(currentUser.lga || 'Gusau');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Issue['priority']>('Medium');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Bid submission modal state
  const [biddingTender, setBiddingTender] = useState<Tender | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidProposalSubmitted, setBidProposalSubmitted] = useState(false);

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    onAddNewIssue({
      issueType,
      lga,
      description,
      reportedBy: currentUser.name,
      status: 'Pending',
      priority,
      imageUrl: selectedFile || 'https://images.unsplash.com/photo-1515162305215-6e0a811c7d0d?auto=format&fit=crop&w=600&q=80'
    });

    setSubmittedSuccess(true);
    setDescription('');
    setSelectedFile(null);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveTab('overview');
    }, 2000);
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBidProposalSubmitted(true);
    setTimeout(() => {
      setBidProposalSubmitted(false);
      setBiddingTender(null);
      setBidAmount('');
      alert('Bid proposal successfully submitted to Zamfara State Bureau for Public Procurement!');
    }, 1500);
  };

  const userIssues = issues.filter(i => i.reportedBy === currentUser.name || currentUser.role === 'contractor');

  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-6 shrink-0">
        <div>
          <div className="text-xs uppercase font-mono text-emerald-400 mb-1">Citizen & Contractor Portal</div>
          <h2 className="text-lg font-bold text-white">{currentUser.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{currentUser.companyName || currentUser.email}</p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Activity</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'report' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Issue</span>
          </button>

          <button
            onClick={() => setActiveTab('tenders')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'tenders' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Active Tenders & Bids</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'skills' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Digital Skills Hub</span>
          </button>
        </nav>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-emerald-400">LGA Assignment</div>
          <div className="text-xs text-slate-300 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentUser.lga} Local Government Area</span>
          </div>
          <div className="text-[11px] text-slate-500 pt-1">Verified INDIGENE / VENDOR ID: #ZM-9042</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-sm text-slate-400">Track your reported infrastructure tickets and contractor bidding statuses.</p>
              </div>
              <button
                onClick={() => setActiveTab('report')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Issue Report</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400">Reported Infrastructure Issues</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">{userIssues.length}</div>
                <div className="text-xs text-slate-500 mt-2">Active across {currentUser.lga} LGA</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400">Contractor Compliance Status</div>
                <div className="text-2xl font-bold text-blue-400 mt-1">{currentUser.role === 'contractor' ? 'Verified Tier 1' : 'Standard Citizen'}</div>
                <div className="text-xs text-slate-500 mt-2">BPP Bureau Clearance Active</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs text-slate-400">SDG 9 Community Contribution</div>
                <div className="text-2xl font-bold text-teal-400 mt-1">Active</div>
                <div className="text-xs text-slate-500 mt-2">Participating in public audit</div>
              </div>
            </div>

            {/* Reported Issues List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Recent Infrastructure Reports</h3>
              <div className="space-y-3">
                {issues.map((issue) => (
                  <div key={issue.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 shrink-0 overflow-hidden border border-slate-700">
                        <img src={issue.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-white">{issue.issueType}</span>
                          <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">{issue.lga} LGA</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{issue.description}</p>
                        <div className="text-[11px] text-slate-500 mt-1">Reported by {issue.reportedBy} on {issue.reportedDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 w-full md:w-auto justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                      <div className="text-right">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-medium ${
                          issue.status === 'Resolved' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' :
                          issue.status === 'In Progress' ? 'bg-blue-900/60 text-blue-300 border border-blue-700' :
                          'bg-amber-900/60 text-amber-300 border border-amber-700'
                        }`}>
                          {issue.status}
                        </span>
                        {issue.assignedEngineer && (
                          <div className="text-[10px] text-slate-400 mt-1">Engr: {issue.assignedEngineer}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REPORT ISSUE TAB */}
        {activeTab === 'report' && (
          <div className="max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Report Infrastructure Issue</h2>
              <p className="text-xs text-slate-400 mt-1">Submit road deficits, power outages, or water drop incidents directly to Zamfara State Ministry of Works.</p>
            </div>

            {submittedSuccess && (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-200 p-4 rounded-xl text-sm flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Issue successfully logged into State Infrastructure Matrix. Dispatching regional engineer...</span>
              </div>
            )}

            <form onSubmit={handleIssueSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Issue Category</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value as Issue['issueType'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Road Deficit">Road Deficit / Erosion</option>
                    <option value="Power Outage">Power Outage / Transformer Fault</option>
                    <option value="Water Drop">Water Drop / Borehole Failure</option>
                    <option value="ICT Infrastructure">ICT / Fiber Duct Damage</option>
                    <option value="Public Facility">Public Facility / School / Clinic Deficit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Local Government Area (LGA)</label>
                  <select
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Gusau">Gusau</option>
                    <option value="Talata Mafara">Talata Mafara</option>
                    <option value="Bakura">Bakura</option>
                    <option value="Anka">Anka</option>
                    <option value="Zurmi">Zurmi</option>
                    <option value="Kaura Namoda">Kaura Namoda</option>
                    <option value="Maru">Maru</option>
                    <option value="Bungudu">Bungudu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Urgency Priority</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Low', 'Medium', 'High', 'Critical'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        priority === p ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Description & Landmark</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the exact location, severity, and impact on the local community..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Photo Evidence Simulation */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Photo Evidence (Optional)</label>
                <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-xl p-6 text-center bg-slate-950 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-300 font-medium">Drag & drop photo evidence, or click to browse</p>
                  <p className="text-[10px] text-slate-500 mt-1">Supports PNG, JPG up to 10MB (GPS tagged automatically)</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={() => setSelectedFile('https://images.unsplash.com/photo-1515162305215-6e0a811c7d0d?auto=format&fit=crop&w=600&q=80')}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
              >
                Submit Report to Ministry
              </button>
            </form>
          </div>
        )}

        {/* TENDERS & BIDS TAB */}
        {activeTab === 'tenders' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Active State Tenders & Procurement</h2>
              <p className="text-sm text-slate-400">Registered contractors can review compliance guidelines and submit competitive bids.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {tenders.map((tender) => (
                <div key={tender.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-mono text-xs bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">{tender.id}</span>
                        <span className="text-xs text-slate-400">{tender.ministry}</span>
                        <span className="text-xs bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded">{tender.lga} LGA</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{tender.title}</h3>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Budget Allocation</div>
                      <div className="text-xl font-extrabold text-emerald-400">{tender.budget}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium block mb-1">Mandatory Compliance Requirements:</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {tender.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col justify-between items-start md:items-end space-y-2">
                      <div>
                        <span className="text-slate-400">Bid Deadline: </span>
                        <span className="text-amber-400 font-bold">{tender.deadline}</span>
                      </div>
                      <button
                        onClick={() => setBiddingTender(tender)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all"
                      >
                        Submit Bid Proposal
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIGITAL SKILLS HUB TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Zamfara Digital Skills & Infrastructure Training Hub</h2>
              <p className="text-sm text-slate-400">Empowering youth with technical skills for fiber optics, solar grid installation, and civic tech.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded font-mono">{course.category}</span>
                      <span className="text-xs text-slate-400 font-medium">{course.level}</span>
                    </div>
                    <h3 className="font-bold text-lg text-white">{course.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Duration: {course.duration}</span>
                      <span className="text-emerald-400 font-bold">{course.enrolledCount} Enrolled</span>
                    </div>
                    <button
                      onClick={() => alert(`Successfully enrolled in ${course.title}! Check your email for orientation schedule.`)}
                      className="w-full bg-slate-800 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold transition-all"
                    >
                      Enroll in Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Bid Modal */}
      {biddingTender && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Submit Bid for {biddingTender.title}</h3>
            <p className="text-xs text-slate-400">Target Budget: {biddingTender.budget}</p>

            {bidProposalSubmitted && (
              <div className="bg-emerald-950 text-emerald-200 p-3 rounded-xl text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Uploading encrypted bid documents to BPP portal...</span>
              </div>
            )}

            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Proposed Bid Amount (₦)</label>
                <input
                  type="text"
                  required
                  placeholder="₦1,650,000,000"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Upload Technical & Financial Proposal (PDF)</label>
                <input type="file" required className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700" />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBiddingTender(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-xs font-bold"
                >
                  Submit Official Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
