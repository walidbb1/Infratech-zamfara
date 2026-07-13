import { Project, Issue, Tender, DigitalSkillCourse, SystemKPIs, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-abdulkadir',
    name: 'Abdulkadir Bala',
    email: 'abdulkadir.bala@zamfara.gov.ng',
    role: 'admin',
    lga: 'Gusau',
    phone: '+234 803 000 1234',
    verified: true
  },
  {
    id: 'usr-1',
    name: 'Hon. Dr. Ibrahim Sani',
    email: 'admin.infratech@zamfara.gov.ng',
    role: 'admin',
    lga: 'Gusau',
    phone: '+234 803 111 2233',
    verified: true
  },
  {
    id: 'usr-2',
    name: 'Alhaji Bello Shinkafi',
    email: 'bello.contractor@zamfarabuild.ng',
    role: 'contractor',
    lga: 'Shinkafi',
    companyName: 'Savannah Civil Engineering Ltd',
    phone: '+234 802 444 5566',
    verified: true
  },
  {
    id: 'usr-3',
    name: 'Zainab Mohammed',
    email: 'zainab.citizen@gmail.com',
    role: 'citizen',
    lga: 'Talata Mafara',
    phone: '+234 813 777 8899',
    verified: true
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    title: 'Gusau International Airport Phase 1 (Cargo Terminal & Runway)',
    category: 'Transport & Aviation',
    lga: 'Gusau',
    budget: '₦14.8 Billion',
    budgetNumeric: 14800000000,
    spentNumeric: 11200000000,
    progress: 75,
    status: 'In Progress',
    contractor: 'CCECC Nigeria & Zamfara Works Consortium',
    startDate: 'Jan 2024',
    targetCompletion: 'Dec 2026',
    sdgImpact: 'High (Boosts regional trade, logistics, and industrial connectivity)',
    description: 'Construction of a 3.4km category 4E runway, passenger terminal, and modern cargo handling facility to bridge landlocked transport bottlenecks in North-West Nigeria.',
    milestones: [
      { title: 'Site Survey & Environmental Impact Assessment', date: 'Feb 2024', completed: true },
      { title: 'Runway Asphalt Paving & Lighting', date: 'Nov 2025', completed: true },
      { title: 'Terminal Building Structural Framework', date: 'May 2026', completed: true },
      { title: 'Air Traffic Control Tower & Avionics Calibration', date: 'Nov 2026', completed: false }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    lat: 12.1656,
    lng: 6.6610
  },
  {
    id: 'PRJ-002',
    title: 'Zamfara State Backbone Fiber Optic Expansion (ZIIT)',
    category: 'Digital & ICT',
    lga: 'Gusau',
    budget: '₦4.2 Billion',
    budgetNumeric: 4200000000,
    spentNumeric: 3600000000,
    progress: 88,
    status: 'In Progress',
    contractor: 'Mainstreet Technologies & ZIIT',
    startDate: 'Mar 2024',
    targetCompletion: 'Oct 2026',
    sdgImpact: 'High (Digital infrastructure, e-governance, and broadband access for schools)',
    description: 'Laying over 450km of underground fiber optic cables connecting government institutions, tertiary schools, and innovation hubs across Gusau, Tsafe, and Talata Mafara.',
    milestones: [
      { title: 'Metropolitan Ducting Gusau Central', date: 'Jun 2024', completed: true },
      { title: 'Inter-LGA Backbone Trenching', date: 'Jan 2025', completed: true },
      { title: 'Node Switching Stations Setup', date: 'Jul 2025', completed: true },
      { title: 'Last-Mile Enterprise & Community Wi-Fi Hotspots', date: 'Oct 2026', completed: false }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    lat: 12.1800,
    lng: 6.6750
  },
  {
    id: 'PRJ-003',
    title: 'Bakura 5MW Solar Hybrid Mini-Grid Project',
    category: 'Energy & Power',
    lga: 'Bakura',
    budget: '₦2.8 Billion',
    budgetNumeric: 2800000000,
    spentNumeric: 2800000000,
    progress: 100,
    status: 'Completed',
    contractor: 'Gongoni Power & REA Partners',
    startDate: 'Aug 2023',
    targetCompletion: 'Jan 2026',
    sdgImpact: 'High (Clean renewable energy, powers 4,500 rural households & agro-processing)',
    description: 'Deployment of a 5-megawatt solar photovoltaic installation complete with battery energy storage system (BESS) to power agrarian clusters and primary health centers in Bakura.',
    milestones: [
      { title: 'Land Acquisition & Geotechnical Test', date: 'Oct 2023', completed: true },
      { title: 'PV Panel Array Installation', date: 'Jun 2024', completed: true },
      { title: 'Substation & Distribution Grid Integration', date: 'Dec 2025', completed: true },
      { title: 'Commissioning & Community Handover', date: 'Jan 2026', completed: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-b1841e285098?auto=format&fit=crop&w=800&q=80',
    lat: 12.2833,
    lng: 5.6833
  },
  {
    id: 'PRJ-004',
    title: 'Talata Mafara Regional Potable Water Scheme',
    category: 'Water Resources',
    lga: 'Talata Mafara',
    budget: '₦6.5 Billion',
    budgetNumeric: 6500000000,
    spentNumeric: 3100000000,
    progress: 48,
    status: 'In Progress',
    contractor: 'Triacta Nigeria Ltd',
    startDate: 'Nov 2024',
    targetCompletion: 'August 2027',
    sdgImpact: 'High (Clean water and sanitation, reduces waterborne illnesses)',
    description: 'Comprehensive rehabilitation of intake pumps, water treatment plants, and laying of 65km distribution pipelines across Talata Mafara and surrounding farming districts.',
    milestones: [
      { title: 'River Sokoto Intake Station Dredging', date: 'Feb 2025', completed: true },
      { title: 'Water Treatment Chemical Plant Upgrade', date: 'Nov 2025', completed: true },
      { title: 'Main Trunk Line Laying', date: 'Jun 2026', completed: false },
      { title: 'Public Fetching Points & Metering', date: 'Aug 2027', completed: false }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f86f8?auto=format&fit=crop&w=800&q=80',
    lat: 12.5741,
    lng: 6.0617
  },
  {
    id: 'PRJ-005',
    title: 'Anka-Bukkuyum Rural Access Agricultural Road',
    category: 'Agriculture & Roads',
    lga: 'Anka',
    budget: '₦5.1 Billion',
    budgetNumeric: 5100000000,
    spentNumeric: 1500000000,
    progress: 30,
    status: 'In Progress',
    contractor: 'Savannah Civil Engineering Ltd',
    startDate: 'Jan 2025',
    targetCompletion: 'Dec 2026',
    sdgImpact: 'High (Reduces post-harvest loss, connects food production belts to urban markets)',
    description: 'Upgrading of 42km arterial earth road to durable asphalt concrete with reinforced concrete drainage structures to facilitate grain and livestock transportation.',
    milestones: [
      { title: 'Route Survey and Clearing', date: 'Mar 2025', completed: true },
      { title: 'Culverts and Bridge Crossings', date: 'Nov 2025', completed: true },
      { title: 'Sub-base and Stone Base Laying', date: 'Jul 2026', completed: false },
      { title: 'Asphalt Wearing Course & Signage', date: 'Dec 2026', completed: false }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    lat: 12.1158,
    lng: 5.9250
  },
  {
    id: 'PRJ-006',
    title: 'Zurmi Smart General Hospital Upgrade',
    category: 'Healthcare & Social',
    lga: 'Zurmi',
    budget: '₦3.4 Billion',
    budgetNumeric: 3400000000,
    spentNumeric: 3400000000,
    progress: 100,
    status: 'Completed',
    contractor: 'Medica Infrastructures Nigeria',
    startDate: 'Feb 2024',
    targetCompletion: 'April 2026',
    sdgImpact: 'High (Good health and wellbeing, telemedicine integration)',
    description: 'Modernization of Zurmi General Hospital with emergency trauma center, solar-powered medical refrigeration, and satellite-enabled telemedicine link to Gusau Specialist Hospital.',
    milestones: [
      { title: 'Emergency Ward Civil Works', date: 'Aug 2024', completed: true },
      { title: 'Diagnostic Equipment Installation', date: 'Jul 2025', completed: true },
      { title: 'Solar Backup Power Grid', date: 'Dec 2025', completed: true },
      { title: 'Staff Training & Handover', date: 'Apr 2026', completed: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    lat: 13.1558,
    lng: 6.7903
  }
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'ISS-101',
    issueType: 'Road Deficit',
    lga: 'Maru',
    description: 'Major erosion gully cutting across the main access route near Maru Central Market, threatening transit.',
    reportedBy: 'Zainab Mohammed',
    reportedDate: '2026-07-02',
    status: 'In Progress',
    assignedEngineer: 'Engr. Yusuf Garba',
    priority: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1515162305215-6e0a811c7d0d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ISS-102',
    issueType: 'Water Drop',
    lga: 'Kaura Namoda',
    description: 'Borehole solar pump damaged at Ward 4 community center, leaving 1,200 residents without steady water.',
    reportedBy: 'Mallam Ibrahim Gusau',
    reportedDate: '2026-07-05',
    status: 'Pending',
    priority: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ISS-103',
    issueType: 'Power Outage',
    lga: 'Gusau',
    description: 'Transformer spark and outage along Tudun Wada layout affecting small scale tech enterprises.',
    reportedBy: 'Aminu Shehu',
    reportedDate: '2026-07-08',
    status: 'Resolved',
    assignedEngineer: 'Engr. Fatima Bello',
    priority: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_TENDERS: Tender[] = [
  {
    id: 'TND-2026-01',
    title: 'Construction of Shinkafi Agro-Processing Incubation Center',
    ministry: 'Ministry of Commerce & Industry',
    lga: 'Shinkafi',
    budget: '₦1.8 Billion',
    deadline: '2026-08-15',
    complianceStatus: 'Open',
    requirements: ['CAC Certificate (Minimum 3 Years)', 'COREN / COBON Certification', 'Tax Clearance Certificate (2023-2025)', 'Proof of Similar Zamfara State Projects']
  },
  {
    id: 'TND-2026-02',
    title: 'Bungudu Solar Street Lighting Phase III',
    ministry: 'Ministry of Works & Infrastructure',
    lga: 'Bungudu',
    budget: '₦950 Million',
    deadline: '2026-08-30',
    complianceStatus: 'Open',
    requirements: ['REAN Member Certificate', 'ISO 9001 Quality Standard', 'Local Labor Content Plan (Min 60% Zamfara indigene)']
  },
  {
    id: 'TND-2026-03',
    title: 'Gummi Perimeter Irrigation Channelization',
    ministry: 'Ministry of Water Resources',
    lga: 'Gummi',
    budget: '₦2.4 Billion',
    deadline: '2026-07-25',
    complianceStatus: 'Under Review',
    requirements: ['Hydrological Survey License', 'Environmental Impact Assessment Certification', 'Bank Guarantee 5%']
  }
];

export const DIGITAL_COURSES: DigitalSkillCourse[] = [
  {
    id: 'CRS-01',
    title: 'Fiber Optic Splicing & Network Maintenance',
    category: 'Fiber Optics & Network',
    enrolledCount: 340,
    duration: '6 Weeks',
    level: 'Intermediate',
    description: 'Hands-on practical training on fusion splicing, OTDR testing, and underground duct deployment for Zamfara youth.'
  },
  {
    id: 'CRS-02',
    title: 'Solar PV Systems Installation & Grid Integration',
    category: 'Solar Installation',
    enrolledCount: 520,
    duration: '4 Weeks',
    level: 'Beginner',
    description: 'Learn sizing, mounting, inverter configuration, and battery storage management for rural mini-grids.'
  },
  {
    id: 'CRS-03',
    title: 'GIS Mapping & Infrastructure Auditing',
    category: 'Civic Tech & Data',
    enrolledCount: 215,
    duration: '8 Weeks',
    level: 'Advanced',
    description: 'Use QGIS and mobile GPS tools to map public assets, roads, and monitor SDG 9 infrastructure milestones.'
  }
];

export const INITIAL_KPIS: SystemKPIs = {
  totalLoggedIssues: 42,
  resolvedIssues: 31,
  activeRoadProjects: 14,
  budgetUtilization: 82.4,
  sdg9ImpactScore: 89.2,
  totalContractorsVerified: 58
};
