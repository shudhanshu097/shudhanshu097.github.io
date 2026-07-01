export const site = {
  name: 'Shudhanshu Jaiswal',
  initials: 'SJ',
  tagline: 'Business Analytics • Data Analytics',
  badge: 'Business × Data × Technology',
  intro:
    'IPM student at IIM Jammu turning complex data into clear, actionable business decisions.',
  rotatingPhrases: [
    'actionable insights',
    'strategic clarity',
    'data-driven decisions',
    'business impact',
  ],
  email: 'shudhanshujaiswal097@gmail.com',
  collegeEmail: 'ipm25125@iimj.ac.in',
  location: 'Jammu, India',
  year: new Date().getFullYear(),
} as const

export const links = {
  resume: '/resume.pdf',
  github: 'https://github.com/shudhanshu097',
  linkedin: 'https://www.linkedin.com/in/shudhanshujaiswal/',
} as const

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const

export const heroStats = [
  { label: 'Projects', value: '2+' },
  { label: 'Certifications', value: '3' },
  { label: 'Focus', value: 'Analytics' },
] as const

export const about = {
  whoIAm: `I'm an Integrated Programme in Management (IPM) student at IIM Jammu with a focus on business and data analytics. I work at the intersection of quantitative analysis and strategic thinking — finding patterns in data and translating them into decisions that matter.`,
  whyAnalytics: `I chose Business Analytics because it sits exactly where I'm most energized: rigorous analysis meeting real commercial problems. Numbers without context are noise; strategy without data is guesswork. Analytics is the bridge.`,
  careerObjective: `I'm building toward a career in business analytics and data-driven strategy — roles where I can combine analytical rigor with business context to solve real problems.`,
  pullQuote: 'Data tells a story. Strategy decides what to do with it.',
  highlights: [
    { label: 'Programme', value: 'IPM — IIM Jammu' },
    { label: 'Focus', value: 'Data Analytics' },
    { label: 'Approach', value: 'Data-informed strategy' },
  ],
} as const

export const education = {
  institution: 'Indian Institute of Management Jammu',
  programme: 'Integrated Programme in Management (IPM)',
  coursework: [
    'Statistics',
    'Econometrics',
    'Financial Accounting',
    'Marketing Management',
    'Operations Research',
    'Business Communication',
    'Microeconomics',
    'Macroeconomics',
    'Data Structures',
    'Python Programming',
  ],
} as const

export const skills = [
  {
    category: 'Programming',
    title: 'Python',
    description: 'Pandas, NumPy, data wrangling, automation scripts',
    icon: 'code',
  },
  {
    category: 'Database',
    title: 'SQL',
    description: 'Complex queries, joins, aggregations, window functions',
    icon: 'database',
  },
  {
    category: 'Analysis',
    title: 'Pandas',
    description: 'Data manipulation, transformation, statistical summaries',
    icon: 'chart',
  },
  {
    category: 'Visualization',
    title: 'Power BI',
    description: 'DAX, interactive dashboards, executive reporting',
    icon: 'dashboard',
  },
  {
    category: 'Visualization',
    title: 'Tableau',
    description: 'Storytelling with data, calculated fields, LOD expressions',
    icon: 'layers',
  },
  {
    category: 'Business',
    title: 'Excel',
    description: 'Financial modeling, pivot tables, scenario analysis',
    icon: 'grid',
  },
  {
    category: 'Analytics',
    title: 'Git & GitHub',
    description: 'Version control, collaboration, reproducible workflows',
    icon: 'git',
  },
] as const

export const projects = {
  featured: [
    {
      id: 'olist',
      number: '01',
      title: 'Olist E-Commerce Analysis',
      subtitle: 'Brazilian marketplace analytics',
      description:
        'End-to-end analysis of Brazilian e-commerce data — customer behavior, delivery performance, and revenue drivers.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'SQL'],
      href: 'https://github.com/shudhanshu097',
      accent: '#38bdf8',
      stats: [
        { label: 'Orders', value: '100K+' },
        { label: 'Sellers', value: '3K+' },
        { label: 'States', value: '27' },
      ],
      sections: [
        {
          title: 'Business Problem',
          content:
            'Olist needed to understand customer satisfaction drivers, delivery bottlenecks, and revenue concentration across regions to optimize operations and marketing spend.',
        },
        {
          title: 'Dataset & Cleaning',
          content:
            'Merged 9 relational tables (orders, customers, products, reviews). Handled missing values, standardized timestamps, and resolved duplicate order entries.',
        },
        {
          title: 'EDA & Insights',
          content:
            'Identified peak order seasons, delivery delay patterns by state, and correlation between review scores and delivery time. Top categories by revenue mapped to geographic clusters.',
        },
        {
          title: 'Recommendations',
          content:
            'Prioritize logistics partners in high-delay regions, target retention campaigns at the 90-day post-purchase window, and reallocate marketing budget toward top-performing product categories.',
        },
      ],
      pipeline: ['Extract', 'Transform', 'Analyze', 'Visualize'],
    },
    {
      id: 'tea-stall',
      number: '02',
      title: 'Tea Stall Monte Carlo Simulation',
      subtitle: 'Probabilistic business modeling',
      description:
        'Monte Carlo simulation modeling daily revenue uncertainty for a small business — risk analysis through probabilistic methods.',
      tech: ['Python', 'NumPy', 'Matplotlib', 'Statistics'],
      href: 'https://github.com/shudhanshu097',
      accent: '#34d399',
      stats: [
        { label: 'Simulations', value: '10K' },
        { label: 'Variables', value: '5' },
        { label: 'Confidence', value: '95%' },
      ],
      sections: [
        {
          title: 'Problem',
          content:
            'A tea stall owner needed to understand revenue variability under uncertain foot traffic, pricing, and weather conditions before committing to a new location lease.',
        },
        {
          title: 'Assumptions',
          content:
            'Modeled daily customers as a normal distribution, cup price with seasonal variance, and weather impact as a multiplicative factor on foot traffic.',
        },
        {
          title: 'Simulation & Risk',
          content:
            'Ran 10,000 Monte Carlo iterations. Identified 5th-percentile daily revenue floor and probability of monthly loss under different rent scenarios.',
        },
        {
          title: 'Recommendation',
          content:
            'Recommended proceeding only if monthly rent stays below the 20th-percentile break-even threshold, with a contingency buffer for monsoon season dips.',
        },
      ],
      pipeline: ['Model', 'Simulate', 'Analyze', 'Decide'],
    },
  ],
} as const

export const experience = [
  {
    org: 'Entrepreneurial Development Cell (EDC)',
    role: 'Member',
    period: '2025 — Present',
    description:
      'Supporting startup initiatives, organizing entrepreneurship events, and fostering an innovation culture on campus.',
  },
  {
    org: 'Alumni Relations Committee',
    role: 'Member',
    period: '2025 — Present',
    description:
      'Coordinating alumni engagement programs and strengthening the institute–alumni network.',
  },
  {
    org: 'Matrix — AI & Business Analytics Club',
    role: 'Member',
    period: '2025 — Present',
    description:
      'Participating in analytics workshops, case discussions, and projects at the intersection of AI and business strategy.',
  },
] as const

export const certifications = [
  { name: 'Kaggle: Python', href: 'https://www.kaggle.com/learn/certification' },
  { name: 'Kaggle: Pandas', href: 'https://www.kaggle.com/learn/certification' },
  { name: 'Kaggle: SQL', href: 'https://www.kaggle.com/learn/certification' },
] as const

export const learningRoadmap = [
  {
    phase: 'Foundation',
    status: 'completed' as const,
    items: ['Python fundamentals', 'SQL mastery', 'Statistics & probability'],
  },
  {
    phase: 'Analysis',
    status: 'completed' as const,
    items: ['Pandas & data wrangling', 'Exploratory data analysis', 'Hypothesis testing'],
  },
  {
    phase: 'Visualization',
    status: 'in-progress' as const,
    items: ['Power BI dashboards', 'Tableau stories', 'Executive reporting'],
  },
  {
    phase: 'Advanced',
    status: 'upcoming' as const,
    items: ['Machine learning models', 'A/B testing frameworks', 'Microsoft Fabric'],
  },
] as const
