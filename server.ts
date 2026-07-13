import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for the session
let projects = [
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
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-b1841e285098?auto=format&fit=crop&w=800&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f86f8?auto=format&fit=crop&w=800&q=80'
  }
];

let issues = [
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
  }
];

let tenders = [
  {
    id: 'TND-2026-01',
    title: 'Construction of Shinkafi Agro-Processing Incubation Center',
    ministry: 'Ministry of Commerce & Industry',
    lga: 'Shinkafi',
    budget: '₦1.8 Billion',
    deadline: '2026-08-15',
    complianceStatus: 'Open',
    requirements: ['CAC Certificate (Minimum 3 Years)', 'COREN / COBON Certification', 'Tax Clearance Certificate (2023-2025)']
  },
  {
    id: 'TND-2026-02',
    title: 'Bungudu Solar Street Lighting Phase III',
    ministry: 'Ministry of Works & Infrastructure',
    lga: 'Bungudu',
    budget: '₦950 Million',
    deadline: '2026-08-30',
    complianceStatus: 'Open',
    requirements: ['REAN Member Certificate', 'ISO 9001 Quality Standard']
  }
];

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", state: "Zamfara State, Nigeria", sdg: "SDG 9" });
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const newProj = { id: `PRJ-00${projects.length + 1}`, ...req.body };
  projects.unshift(newProj);
  res.json(newProj);
});

app.get("/api/issues", (req, res) => {
  res.json(issues);
});

app.post("/api/issues", (req, res) => {
  const newIssue = { id: `ISS-10${issues.length + 1}`, reportedDate: new Date().toISOString().split('T')[0], status: 'Pending', ...req.body };
  issues.unshift(newIssue);
  res.json(newIssue);
});

app.patch("/api/issues/:id", (req, res) => {
  const { id } = req.params;
  const { status, assignedEngineer } = req.body;
  issues = issues.map(iss => iss.id === id ? { ...iss, ...(status && { status }), ...(assignedEngineer !== undefined && { assignedEngineer }) } : iss);
  res.json({ success: true, issues });
});

app.get("/api/tenders", (req, res) => {
  res.json(tenders);
});

// Gemini AI Assistant endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are "Infratech Zamfara AI", an expert civic tech advisor and SDG 9 specialist for Zamfara State, Nigeria. 
    You advise government officials, contractors, and citizens on infrastructure development, local economic growth, renewable energy, digital fiber expansion, and public transparency. 
    Keep your answers concise, professional, data-driven, and tailored to Zamfara State's 14 LGAs (Gusau, Talata Mafara, Bakura, Zurmi, Kaura Namoda, Maru, Bungudu, Maradun, Shinkafi, Bukkuyum, Gummi, Tsafe, Birnin Magaji, Zurmi).`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\nContext about projects & issues: ${JSON.stringify(context || {})}\n\nUser Question: ${message}` }] }
      ]
    });

    const reply = response.text || "I am analyzing the infrastructural parameters for Zamfara State. Please repeat your query.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with Gemini AI." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Infratech Zamfara server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
