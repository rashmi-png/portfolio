/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — single source of truth.
 * All text on the site comes from this file. To update the site, edit here.
 * Content is transcribed from Rashmi's resume; nothing is invented.
 * ---------------------------------------------------------------------------
 */

/** Social profile URLs. Leave empty ("") until the real profiles exist. */
export const socialLinks = {
  github: "", // e.g. "https://github.com/your-username"
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-profile"
};

export const profile = {
  name: "Rashmi",
  fullName: "Rashmi",
  headline: "AI/ML Enthusiast | Data Analyst | Full Stack Developer",
  tagline: "AI/ML Enthusiast · Data Analyst · Full Stack Developer",
  location: "Kundapura, Karnataka, India",
  email: "rashmishriyann@gmail.com",
  resumeUrl: "resume/Rashmi_Resume.pdf",
  introShort:
    "I'm a Computer Science and Engineering student specialising in Artificial Intelligence and Machine Learning, with hands-on internship experience across full-stack development, data analytics, and AI workflows. I enjoy solving real problems with intelligent systems, clean data, and well-built software.",
  seeking:
    "Seeking an entry-level opportunity in data analytics, machine learning, or full-stack development.",
};

export const about = {
  paragraphs: [
    "I'm Rashmi, a Computer Science and Engineering student specialising in Artificial Intelligence and Machine Learning at AJ Institute of Engineering and Technology, expected to graduate in 2028. I'm most excited by work that sits at the intersection of AI, data, and software — where a model, a dataset, or a well-engineered feature can genuinely improve how people make decisions.",
    "Through internships at Workora, Thiranex, and Rabtech Academy, I've worked on the full picture: cleaning and analysing datasets, framing business needs as machine learning problems, applying and evaluating models, and shipping full-stack features with REST APIs, databases, and responsive interfaces.",
  ],
  focus: ["AI & Machine Learning", "Data Analytics", "Full Stack Development"],
  facts: [
    { label: "Currently", value: "B.E. Computer Science (AI & ML)" },
    { label: "Institute", value: "AJ Institute of Engineering and Technology" },
    { label: "Expected graduation", value: "2028" },
    { label: "Location", value: "Kundapura, Karnataka, India" },
  ],
};

export const skillCategories = [
  {
    title: "Programming & Data",
    icon: "chart",
    description: "Languages and tools I use to work with data.",
    skills: ["Python", "SQL", "Excel", "Data Analysis"],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    description: "Core ML capabilities from framing problems to responsible delivery.",
    skills: ["Machine Learning", "Customer Segmentation", "ML Problem Framing", "Responsible AI"],
  },
  {
    title: "Web Development",
    icon: "code",
    description: "Building complete, responsive web applications.",
    skills: ["HTML", "CSS", "JavaScript", "Full Stack Development"],
  },
  {
    title: "Professional Skills",
    icon: "users",
    description: "How I collaborate and contribute on a team.",
    skills: ["Communication", "Teamwork", "Leadership", "Problem Solving"],
  },
];

export const internships = [
  {
    role: "Full Stack Development Intern",
    company: "Workora",
    period: "October 2026 – Present",
    current: true,
    bullets: [
      "Developed full-stack features including a Live Query Filter System, JWT-based authentication, and a Team Availability Tracker.",
      "Built RESTful APIs, integrated databases, and created responsive UI components for production-ready applications.",
      "Collaborated in an agile environment to deliver features, debug issues, and improve application performance.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Thiranex",
    period: "12 August 2026 – 11 September 2026",
    current: false,
    bullets: [
      "Cleaned, explored, and analysed datasets to identify patterns, trends, and actionable insights.",
      "Communicated findings clearly to stakeholders to support data-driven decision-making.",
    ],
  },
  {
    role: "Artificial Intelligence Intern",
    company: "Rabtech Academy",
    period: "5 September 2026 – 5 October 2026",
    current: false,
    bullets: [
      "Developed practical understanding of AI and machine learning workflows through guided, hands-on projects.",
      "Applied machine learning techniques to real-world problem statements and evaluated model performance.",
    ],
  },
];

export const projects = [
  {
    name: "Live Query Filter System",
    description:
      "A real-time query and filtering system that enables dynamic search and data retrieval across large datasets with low latency.",
    tags: ["JavaScript", "REST API", "Databases", "Real-time Search"],
    github: "", // add the repository URL when available
    demo: "", // add the live demo URL when available
  },
  {
    name: "User Authentication & JWT",
    description:
      "Secure authentication using JWT, including login, token refresh, protected routes, and session management.",
    tags: ["JWT", "Authentication", "Session Management", "Protected Routes"],
    github: "", // add the repository URL when available
    demo: "", // add the live demo URL when available
  },
  {
    name: "Team Availability Tracker",
    description:
      "A full-stack tracker to monitor team member availability, schedules, and resource allocation in real time.",
    tags: ["Full Stack", "Real-time", "Scheduling", "Responsive UI"],
    github: "", // add the repository URL when available
    demo: "", // add the live demo URL when available
  },
  {
    name: "Customer Segmentation & ML Problem Framing",
    description:
      "Segmented customers by behaviour for targeted decisions and framed business needs as well-defined ML problems with clear evaluation criteria.",
    tags: ["Machine Learning", "Customer Segmentation", "ML Problem Framing", "Evaluation"],
    github: "", // add the repository URL when available
    demo: "", // add the live demo URL when available
  },
];

export const education = [
  {
    institution: "AJ Institute of Engineering and Technology",
    credential: "Bachelor of Engineering, Computer Science and Engineering (AI & ML)",
    period: "Expected 2028",
    current: true,
  },
  {
    institution: "R N Shetty PU College",
    credential: "Pre-University Course (PUC)",
    period: "2023 – 2024",
    current: false,
  },
  {
    institution: "Government High School, Heskuthur",
    credential: "Secondary School Leaving Certificate (SSLC)",
    period: "2021 – 2022",
    current: false,
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
