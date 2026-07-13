export type UserRole = 'citizen' | 'contractor' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lga: string;
  phone?: string;
  companyName?: string;
  verified?: boolean;
}

export interface ProjectMilestone {
  title: string;
  date: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Transport & Aviation' | 'Digital & ICT' | 'Water Resources' | 'Energy & Power' | 'Healthcare & Social' | 'Agriculture & Roads';
  lga: string;
  budget: string;
  budgetNumeric: number;
  spentNumeric: number;
  progress: number; // 0 - 100
  status: 'Planning' | 'In Progress' | 'Delayed' | 'Completed';
  contractor: string;
  startDate: string;
  targetCompletion: string;
  sdgImpact: string;
  description: string;
  milestones: ProjectMilestone[];
  imageUrl: string;
  lat: number;
  lng: number;
}

export interface Issue {
  id: string;
  issueType: 'Road Deficit' | 'Power Outage' | 'Water Drop' | 'ICT Infrastructure' | 'Public Facility' | 'Other';
  lga: string;
  description: string;
  reportedBy: string;
  reportedDate: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  assignedEngineer?: string;
  imageUrl?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Tender {
  id: string;
  title: string;
  ministry: string;
  lga: string;
  budget: string;
  deadline: string;
  complianceStatus: 'Open' | 'Under Review' | 'Closed' | 'Awarded';
  requirements: string[];
}

export interface DigitalSkillCourse {
  id: string;
  title: string;
  category: 'Fiber Optics & Network' | 'Solar Installation' | 'Civic Tech & Data' | 'Road Engineering Tech';
  enrolledCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface SystemKPIs {
  totalLoggedIssues: number;
  resolvedIssues: number;
  activeRoadProjects: number;
  budgetUtilization: number; // percentage
  sdg9ImpactScore: number; // out of 100
  totalContractorsVerified: number;
}
