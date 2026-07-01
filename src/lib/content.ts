/** Central content store — single source of truth for all copy */

export const SITE = {
  name: "Shudhanshu Jaiswal",
  role: "Business Data Analyst",
  institution: "Indian Institute of Management Jammu",
  program: "Integrated Programme in Management (IPM)",
  tagline: "Business × Data × Technology",
  email: "shdhanshuj097@gmail.com",
  collegeEmail: "ipm25125@iimj.ac.in",
  linkedin: "https://www.linkedin.com/in/shudhanshuj/",
  github: "https://github.com/shudhanshu097",
  profileImage: "/images/profile.jpg",
  location: "Jammu, India",
  year: new Date().getFullYear(),
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO_TYPING = [
  "actionable insights",
  "data-driven stories",
  "predictive models",
  "visual dashboards",
] as const;

export const HERO = {
  role: "Business Data Analyst",
  institution: "IIM Jammu",
  intro:
    "I turn complex datasets into clear, actionable insights — building at the intersection of business strategy, statistics, and modern analytics.",
  ctas: {
    projects: { label: "View Projects", href: "#projects" },
    resume: { label: "Resume", href: "#resume" },
    contact: { label: "Contact", href: "#contact" },
  },
} as const;

export type WorkspacePreview = "image" | "chart" | "code" | "simulation" | "sql";

export type WorkspaceWindowConfig = {
  id: string;
  title: string;
  category: string;
  preview: WorkspacePreview;
  image?: string;
  link: string;
  accent: "blue" | "purple" | "emerald" | "amber";
  /** Percent from top-left of viewport */
  position: { top: number; left: number };
  depth: number;
  tilt: number;
  phase: number;
  size: "sm" | "md";
  /** Hidden on viewports below lg */
  desktopOnly?: boolean;
};

export const HERO_WORKSPACE_WINDOWS: WorkspaceWindowConfig[] = [
  {
    id: "power-bi",
    title: "Power BI Dashboard",
    category: "Visualization",
    preview: "image",
    image: "/projects/sales-dashboard.jpg",
    link: "#projects",
    accent: "blue",
    position: { top: 10, left: 3 },
    depth: 0.55,
    tilt: -5,
    phase: 0,
    size: "md",
  },
  {
    id: "sql-analytics",
    title: "SQL Analytics",
    category: "Database",
    preview: "sql",
    link: "#projects",
    accent: "purple",
    position: { top: 8, left: 78 },
    depth: 0.7,
    tilt: 4,
    phase: 1.2,
    size: "sm",
    desktopOnly: true,
  },
  {
    id: "tea-monte-carlo",
    title: "Tea Stall Monte Carlo",
    category: "Simulation",
    preview: "simulation",
    link: "#projects",
    accent: "amber",
    position: { top: 38, left: 2 },
    depth: 0.45,
    tilt: -3,
    phase: 2.4,
    size: "md",
    desktopOnly: true,
  },
  {
    id: "python-automation",
    title: "Python Automation",
    category: "Programming",
    preview: "code",
    link: "#projects",
    accent: "emerald",
    position: { top: 34, left: 80 },
    depth: 0.65,
    tilt: 5,
    phase: 0.8,
    size: "sm",
  },
  {
    id: "tableau",
    title: "Tableau Dashboard",
    category: "Visualization",
    preview: "image",
    image: "/projects/market-analysis.jpg",
    link: "#projects",
    accent: "purple",
    position: { top: 68, left: 5 },
    depth: 0.5,
    tilt: -4,
    phase: 3.1,
    size: "md",
  },
  {
    id: "retail-sales",
    title: "Retail Sales Analysis",
    category: "Business",
    preview: "chart",
    link: "#projects",
    accent: "blue",
    position: { top: 72, left: 76 },
    depth: 0.6,
    tilt: 3,
    phase: 1.9,
    size: "sm",
    desktopOnly: true,
  },
  {
    id: "forecasting",
    title: "Forecasting Model",
    category: "Analytics",
    preview: "chart",
    link: "#projects",
    accent: "emerald",
    position: { top: 18, left: 16 },
    depth: 0.35,
    tilt: -2,
    phase: 4.2,
    size: "sm",
    desktopOnly: true,
  },
  {
    id: "segmentation",
    title: "Customer Segmentation",
    category: "Machine Learning",
    preview: "image",
    image: "/projects/customer-segmentation.jpg",
    link: "#projects",
    accent: "blue",
    position: { top: 20, left: 72 },
    depth: 0.4,
    tilt: 3,
    phase: 2.7,
    size: "md",
  },
];

export const LOADING_STEPS = [
  "Initializing analytics engine",
  "Loading business intelligence modules",
  "Syncing data pipelines",
  "Calibrating visualization layer",
  "Preparing experience",
] as const;

export const ABOUT = {
  eyebrow: "About",
  title: "Where business instinct meets analytical rigor",
  paragraphs: [
    "I am an Integrated Programme in Management student at IIM Jammu, building the intersection of management thinking and data science. My work sits at the confluence of strategy, statistics, and systems — turning complex datasets into decisions leaders can act on.",
    "From econometric modeling to executive dashboards, I approach every problem with the discipline of an analyst and the perspective of a future business leader. I believe the best insights are not just accurate — they are actionable, elegant, and grounded in commercial reality.",
  ],
  highlights: [
    {
      label: "Programme",
      value: "IPM — IIM Jammu",
    },
    {
      label: "Focus",
      value: "Data Analytics",
    },
    {
      label: "Approach",
      value: "Data-informed strategy",
    },
  ],
} as const;

export const MISSION = {
  quote:
    "The future belongs to professionals who can translate data into narrative — and narrative into impact.",
  attribution: "Shudhanshu Jaiswal",
} as const;

export const JOURNEY_SECTION = {
  eyebrow: "Journey",
  title: "Career GPS",
  description:
    "Every milestone has been a checkpoint leading toward my goal of becoming a Business Data Analyst.",
} as const;

export type JourneyIcon = "academic" | "compass" | "target" | "briefcase" | "flag";
export type JourneyVisual =
  | "foundation"
  | "campus"
  | "skills"
  | "projects"
  | "destination";
export type JourneyStatus = "completed" | "upcoming";

export const JOURNEY = [
  {
    id: "pcm",
    checkpoint: "01",
    year: "2023",
    title: "PCM Background",
    description:
      "Built a strong analytical foundation through mathematics and logical problem solving.",
    icon: "academic" as JourneyIcon,
    visual: "foundation" as JourneyVisual,
    status: "completed" as JourneyStatus,
  },
  {
    id: "iim",
    checkpoint: "02",
    year: "2025",
    title: "Joined IIM Jammu",
    description:
      "Started the Integrated Programme in Management and discovered the intersection of business and technology.",
    icon: "compass" as JourneyIcon,
    visual: "campus" as JourneyVisual,
    status: "completed" as JourneyStatus,
  },
  {
    id: "analytics-path",
    checkpoint: "03",
    year: "Late 2025",
    title: "Chose the Data Analyst Path",
    description:
      "Focused on Python, SQL, Power BI, statistics and business analytics.",
    icon: "target" as JourneyIcon,
    visual: "skills" as JourneyVisual,
    status: "completed" as JourneyStatus,
  },
  {
    id: "projects",
    checkpoint: "04",
    year: "2025–2026",
    title: "Built Analytics Projects",
    description:
      "Created end-to-end analytics projects including Monte Carlo Simulation and Olist E-Commerce Analytics Dashboard.",
    icon: "briefcase" as JourneyIcon,
    visual: "projects" as JourneyVisual,
    status: "completed" as JourneyStatus,
  },
  {
    id: "future",
    checkpoint: "05",
    year: "Next Destination",
    title: "Future Business Data Analyst",
    description:
      "Preparing for internships, real-world consulting work and advanced analytics.",
    icon: "flag" as JourneyIcon,
    visual: "destination" as JourneyVisual,
    status: "upcoming" as JourneyStatus,
  },
] as const;

export const LEADERSHIP = {
  eyebrow: "Leadership",
  title: "Impact beyond the classroom",
  description:
    "As a member of the IIM Jammu Mess Committee, I led campus-wide initiatives that demanded operational rigor, financial accountability, and cross-functional coordination at scale.",
  metrics: [
    {
      value: 550,
      suffix: "+",
      label: "Participants Coordinated",
      description:
        "Managed logistics and engagement for large-scale campus events as part of Mess Committee operations",
    },
    {
      value: 10,
      prefix: "₹",
      suffix: " Lakhs",
      label: "Budget Oversight",
      description:
        "Directed financial planning and resource allocation for Mess Committee initiatives across the academic year",
    },
    {
      value: 0,
      display: "Cross-Functional",
      label: "Coordination",
      description:
        "Bridged Mess Committee, operations, marketing, and academic teams to deliver seamless campus experiences",
      isText: true,
    },
    {
      value: 0,
      display: "Mess Committee",
      label: "Leadership",
      description:
        "Served on the IIM Jammu Mess Committee — overseeing dining operations, vendor management, and student welfare",
      isText: true,
    },
  ],
} as const;

export const SKILLS = [
  {
    name: "Python",
    category: "Programming",
    description: "Pandas, NumPy, data wrangling, automation scripts",
    icon: "python" as const,
  },
  {
    name: "SQL",
    category: "Database",
    description: "Complex queries, joins, aggregations, window functions",
    icon: "database" as const,
  },
  {
    name: "Pandas",
    category: "Analysis",
    description: "Data manipulation, transformation, statistical summaries",
    icon: "table" as const,
  },
  {
    name: "Power BI",
    category: "Visualization",
    description: "DAX, interactive dashboards, executive reporting",
    icon: "chart" as const,
  },
  {
    name: "Tableau",
    category: "Visualization",
    description: "Storytelling with data, calculated fields, LOD expressions",
    icon: "layout" as const,
  },
  {
    name: "Business Analytics",
    category: "Strategy",
    description: "Hypothesis testing, forecasting, KPI frameworks",
    icon: "trending" as const,
  },
] as const;

export const PROJECTS_SECTION = {
  eyebrow: "Case Studies",
  title: "Featured Case Studies",
  description:
    "Business problems solved through analytics, visualization, and technology.",
} as const;

export type FeaturedProjectPreview = "tea-stall" | "olist";

export const PROJECTS = [
  {
    id: "tea-stall-monte-carlo",
    title: "Tea Stall Monte Carlo Simulation",
    category: "Business Simulation",
    description:
      "A Monte Carlo simulation model built to evaluate customer demand, business uncertainty, profitability scenarios, and business decision-making through probabilistic analysis.",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib", "Statistics"],
    preview: "tea-stall" as FeaturedProjectPreview,
    github: "https://github.com/shudhanshu097",
    demo: "https://github.com/shudhanshu097",
    caseStudy: "#tea-stall-monte-carlo",
    status: {
      label: "Simulation Complete",
      primary: "10,000 Monte Carlo Iterations",
      secondary: "Confidence Level: 95.2%",
    },
  },
  {
    id: "olist-ecommerce",
    title: "Olist E-Commerce Analytics Dashboard",
    category: "Business Analytics",
    description:
      "An interactive analytics dashboard built using the Olist Brazilian E-commerce dataset to analyze customer behavior, sales trends, delivery performance, and business insights.",
    tags: ["Power BI", "SQL", "Python", "Excel"],
    preview: "olist" as FeaturedProjectPreview,
    github: "https://github.com/shudhanshu097",
    demo: "https://github.com/shudhanshu097",
    caseStudy: "#olist-ecommerce",
    status: {
      label: "Dashboard Live",
      primary: "100K+ Orders Processed",
      secondary: "Data Quality: Excellent",
    },
  },
] as const;

export const ROADMAP = [
  {
    id: "foundation",
    title: "Foundation",
    status: "completed" as const,
    items: ["Python fundamentals", "SQL mastery", "Statistics & probability"],
  },
  {
    id: "analysis",
    title: "Analysis",
    status: "completed" as const,
    items: ["Pandas & data wrangling", "Exploratory data analysis", "Hypothesis testing"],
  },
  {
    id: "visualization",
    title: "Visualization",
    status: "in-progress" as const,
    items: ["Power BI dashboards", "Tableau stories", "Executive reporting"],
  },
  {
    id: "advanced",
    title: "Advanced",
    status: "locked" as const,
    items: ["Machine learning models", "A/B testing frameworks", "Cloud analytics (AWS/GCP)"],
  },
  {
    id: "career",
    title: "Career",
    status: "locked" as const,
    items: ["Data analyst internship", "Analytics case competitions", "Industry certification"],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: SITE.linkedin, icon: "linkedin" as const },
  { label: "GitHub", href: SITE.github, icon: "github" as const },
  { label: "Email", href: `mailto:${SITE.email}`, icon: "mail" as const },
] as const;
