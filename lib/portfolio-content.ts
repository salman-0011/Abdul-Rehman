export type PortfolioSection = {
  id: string
  title: string
  subtitle: string
  description: string
}

export type PortfolioProject = {
  title: string
  description: string
  tech: string[]
  link?: string
  github?: string
  category: string
  impact?: string
}

export type PortfolioCompetition = {
  title: string
  event: string
  organization: string
  year: string
  type: string
  description: string
  icon: string
}

export type PortfolioCertification = {
  title: string
  provider: string
  credentialId: string
  year: string
  skills: string[]
}

export type PortfolioTestimonial = {
  name: string
  role: string
  content: string
  rating: number
  project: string
  logo?: string
  website?: string
}

export type AboutSkill = {
  title: string
  skills: string
}

export type SocialLink = {
  label: string
  href: string
}

export type PortfolioContent = {
  intro: {
    greetingTop: string
    greetingMiddle: string
    greetingName: string
    tagline: string
  }
  sections: PortfolioSection[]
  about: {
    headline: string
    skills: AboutSkill[]
  }
  projects: PortfolioProject[]
  achievements: {
    competitions: PortfolioCompetition[]
    certifications: PortfolioCertification[]
  }
  testimonials: PortfolioTestimonial[]
  contact: {
    description: string
    location: string
    whatsappNumber: string
    whatsappLink: string
    email: string
    socialLinks: SocialLink[]
    stats: {
      competitionWins: string
      certificationsCount: string
      cgpa: string
    }
    resumePath: string
    resumeFileName: string
  }
}

export const defaultPortfolioContent: PortfolioContent = {
  intro: {
    greetingTop: "Hello,",
    greetingMiddle: "I'm",
    greetingName: "Abdul Rehman",
    tagline: "Designing Practical Mechanical Solutions",
  },
  sections: [
    {
      id: "intro",
      title: "Hello, I'm",
      subtitle: "Abdul Rehman",
      description: "Mechanical Engineering Student",
    },
    {
      id: "about",
      title: "About Me",
      subtitle: "Mechanical Engineer Student",
      description: "Learning design, analysis, and manufacturing",
    },
    {
      id: "work",
      title: "Projects",
      subtitle: "Design & Analysis Work",
      description: "Mechanical systems, CAD, and simulation",
    },
    {
      id: "achievements",
      title: "Achievements",
      subtitle: "Skills & Certifications",
      description: "Progress in design, simulation, and technical learning",
    },
    {
      id: "contact",
      title: "Let's Connect",
      subtitle: "Get In Touch",
      description: "Open to internships, projects, and collaboration",
    },
  ],
  about: {
    headline:
      "I'm Abdul Rehman, a Mechanical Engineering student focused on CAD, machine design, thermodynamics, and practical problem solving.",
    skills: [
      { title: "CAD & Design", skills: "AutoCAD, SolidWorks, 3D Modeling" },
      { title: "Analysis & Simulation", skills: "ANSYS, FEA, Stress Analysis" },
      { title: "Core Engineering", skills: "Thermodynamics, Strength of Materials, Machine Design" },
    ],
  },
  projects: [
    {
      title: "CAD of Mechanical Shaft Assembly",
      description: "Modeled a shaft assembly with bearings, keyway, and dimensions for manufacturing readiness.",
      tech: ["SolidWorks", "Assembly Modeling", "Technical Drawing"],
      category: "CAD",
      impact: "Improved drafting accuracy and part compatibility",
    },
    {
      title: "Stress Analysis of Bracket",
      description: "Performed static structural analysis to identify stress concentration and improve design reliability.",
      tech: ["ANSYS", "FEA", "Solid Mechanics"],
      category: "Simulation",
      impact: "Reduced failure risk through design optimization",
    },
    {
      title: "Heat Exchanger Design Study",
      description: "Prepared a conceptual thermal design study focused on heat transfer and efficiency improvement.",
      tech: ["Thermodynamics", "Heat Transfer", "Engineering Calculations"],
      category: "Thermal Engineering",
      impact: "Strengthened practical understanding of energy systems",
    },
    {
      title: "Material Selection for Machine Components",
      description: "Compared common engineering materials for strength, weight, cost, and manufacturability.",
      tech: ["Materials Science", "Design Criteria", "Engineering Decision Making"],
      category: "Mechanical Design",
      impact: "Improved component selection for real-world use",
    },
    {
      title: "Manufacturing Process Overview",
      description: "Studied machining, casting, welding, and forming processes used in mechanical production.",
      tech: ["Manufacturing", "Machining", "Workshop Practices"],
      category: "Manufacturing",
      impact: "Built understanding of practical production workflows",
    },
    {
      title: "Solar Dryer Concept",
      description: "Designed a low-cost solar drying concept for efficient drying of agricultural materials.",
      tech: ["Renewable Energy", "Thermal Design", "Concept Development"],
      category: "Energy Systems",
      impact: "Explored sustainable engineering solutions",
    },
  ],
  achievements: {
    competitions: [
      {
        title: "Mechanical Design Project Presentation",
        event: "Department Technical Showcase",
        organization: "Engineering Department",
        year: "2024",
        type: "Participant",
        description: "Presented a mechanical design project with CAD and analysis work",
        icon: "⚙️",
      },
      {
        title: "Engineering Workshop Challenge",
        event: "Hands-on Fabrication Task",
        organization: "College Workshop",
        year: "2024",
        type: "Participant",
        description: "Worked on practical fabrication and measurement exercises",
        icon: "🛠️",
      },
      {
        title: "Thermodynamics Problem Solving",
        event: "Classroom Technical Contest",
        organization: "Mechanical Engineering Faculty",
        year: "2024",
        type: "Participant",
        description: "Solved engineering problems under time constraints",
        icon: "📐",
      },
    ],
    certifications: [
      {
        title: "SolidWorks Basics",
        provider: "CAD Learning Platform",
        credentialId: "MECH-SW-001",
        year: "2024",
        skills: ["3D Modeling", "Assembly", "Drafting"],
      },
      {
        title: "AutoCAD Fundamentals",
        provider: "Technical Training Program",
        credentialId: "MECH-AC-002",
        year: "2024",
        skills: ["2D Drafting", "Dimensioning", "Technical Drawing"],
      },
      {
        title: "ANSYS Introduction",
        provider: "Engineering Simulation Course",
        credentialId: "MECH-AN-003",
        year: "2024",
        skills: ["FEA", "Stress Analysis", "Simulation"],
      },
      {
        title: "Manufacturing Processes",
        provider: "Workshop Training",
        credentialId: "MECH-MP-004",
        year: "2024",
        skills: ["Machining", "Welding", "Casting"],
      },
      {
        title: "Thermodynamics Essentials",
        provider: "Mechanical Engineering Course",
        credentialId: "MECH-TH-005",
        year: "2024",
        skills: ["Heat Transfer", "Energy Systems", "Cycles"],
      },
      {
        title: "Strength of Materials",
        provider: "Mechanical Engineering Course",
        credentialId: "MECH-SM-006",
        year: "2024",
        skills: ["Stress", "Strain", "Load Analysis"],
      },
    ],
  },
  testimonials: [],
  contact: {
    description:
      "Open to internships, academic projects, and mechanical engineering collaboration opportunities.",
    location: "Islamabad,Pakistan",
    whatsappNumber: "+92-318-4551051",
    whatsappLink: "https://wa.me/923184551051",
    email: "abdulrehman5596@gmail.com",
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Portfolio", href: "https://example.com" },
    ],
    stats: {
      competitionWins: "3",
      certificationsCount: "6",
      cgpa: "90%",
    },
    resumePath: "/resume.pdf",
    resumeFileName: "Abdul_Rehman_Resume.pdf",
  },
}

export function normalizePortfolioContent(raw: unknown): PortfolioContent {
  if (!raw || typeof raw !== "object") return defaultPortfolioContent

  const source = raw as Partial<PortfolioContent>

  return {
    intro: {
      ...defaultPortfolioContent.intro,
      ...(source.intro ?? {}),
    },
    sections: Array.isArray(source.sections) && source.sections.length ? source.sections : defaultPortfolioContent.sections,
    about: {
      ...defaultPortfolioContent.about,
      ...(source.about ?? {}),
      skills:
        Array.isArray(source.about?.skills) && source.about.skills.length
          ? source.about.skills
          : defaultPortfolioContent.about.skills,
    },
    projects: Array.isArray(source.projects) && source.projects.length ? source.projects : defaultPortfolioContent.projects,
    achievements: {
      competitions:
        Array.isArray(source.achievements?.competitions) && source.achievements.competitions.length
          ? source.achievements.competitions
          : defaultPortfolioContent.achievements.competitions,
      certifications:
        Array.isArray(source.achievements?.certifications) && source.achievements.certifications.length
          ? source.achievements.certifications
          : defaultPortfolioContent.achievements.certifications,
    },
    testimonials: Array.isArray(source.testimonials) ? source.testimonials : [],
    contact: {
      ...defaultPortfolioContent.contact,
      ...(source.contact ?? {}),
      socialLinks:
        Array.isArray(source.contact?.socialLinks) && source.contact.socialLinks.length
          ? source.contact.socialLinks
          : defaultPortfolioContent.contact.socialLinks,
      stats: {
        ...defaultPortfolioContent.contact.stats,
        ...(source.contact?.stats ?? {}),
      },
    },
  }
}
