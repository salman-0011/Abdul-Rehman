export type PortfolioSection = {
  id: string
  title: string
  subtitle: string
  description: string
}

export type ProjectDetailSection = {
  title: string
  content: string
  images?: string[]
  subsections?: {
    title: string
    content: string
  }[]
}

export type PortfolioProject = {
  id: string
  title: string
  tagline: string
  cardImage: string
  shortDescription: string
  category: string
  year: string
  overview: string
  sections: ProjectDetailSection[]
  achievements: string[]
  myRole: string
  tech: string[]
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

export type SkillCategory = {
  title: string
  items: string[]
}

export type PortfolioCertification = {
  title: string
  provider: string
  date: string
  mode: string
  description: string
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
    skills: SkillCategory[]
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
      title: "Skills & Certifications",
      subtitle: "Skills & Certifications",
      description: "Mechanical workshop skills, safety practices, and training certificates",
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
      "A highly motivated Mechanical Engineering student with a Diploma in Associate Engineering (Construction Machinery), possessing hands-on experience in electro-mechanical and hydraulic systems. Ranked among the Top 10 students at CTTI Islamabad and awarded the Punjab Education Authority Scholarship. Strong interest in Electric Vehicles, sustainable energy systems, and modern mechanical technologies. Seeking to pursue a Bachelor's degree.",
    skills: [
      {
        title: "Mechanical & Technical",
        skills:
          "Hydraulic system diagnostics and troubleshooting / Mechanical system assembly and disassembly / Preventive maintenance of workshop equipment / Basic understanding of heavy construction machinery",
      },
      {
        title: "Safety & Compliance",
        skills:
          "Health and safety management practices / Proper use of Personal Protective Equipment (PPE) / Risk assessment in workshop environments",
      },
      {
        title: "Digital & Administrative",
        skills:
          "Teamwork / Microsoft Office (Word, Excel, PowerPoint) / Basic project planning and documentation / Project time management",
      },
      {
        title: "Workshop Equipment & Tools",
        skills:
          "Workshop machines: lathe, drill, and milling machine / Reading manuals of machines and equipment / Vernier caliper, screw gauge, inside caliper, and outside caliper / Workshop equipment calibration",
      },
    ],
  },
  projects: [
    {
      id: "ev-project",
      title: "Electric Vehicle (EV) Development",
      tagline: "Budget-Friendly Eco-Friendly Electric Vehicle",
      cardImage: "/assets/project1/introduction/introduction.webp",
      shortDescription: "A high-performing, eco-friendly electric vehicle developed on a restricted $2,000 budget using strategic material selection and repurposed mechanical systems.",
      category: "Electro-Mechanical Systems",
      year: "2024",
      overview: "This project demonstrates the feasibility of developing a high-performing, eco-friendly electric vehicle on a restricted budget. By utilizing strategic material selection and repurposed mechanical systems, we created a blueprint for accessible, low-cost green mobility.",
      sections: [
        {
          title: "Introduction",
          content: "Project overview and goals: build a high-performing, eco-friendly electric vehicle on a restricted budget using repurposed mechanical systems and strategic material selection.",
          images: [
            "/assets/project1/introduction/introduction.webp"
          ]
        },
        {
          title: "Chassis & Structural Design",
          content: "Custom-fabricated framework using varied-gauge piping to balance structural rigidity with weight optimization. Includes mounting points for drivetrain, batteries, and suspension attachment.",
          images: [
            "/assets/project1/chassis/whatsapp-image-2026-05-02-at-11.38.16-am.webp",
            "/assets/project1/chassis/whatsapp-image-2026-05-02-at-11.38.17-am.webp",
            "/assets/project1/chassis/whatsapp-image-2026-05-02-at-11.38.17-am-1.webp",
            "/assets/project1/chassis/whatsapp-image-2026-05-02-at-11.38.18-am.webp",
            "/assets/project1/chassis/whatsapp-image-2026-05-02-at-11.38.18-am-1.webp"
          ]
        },
        {
          title: "Mechanical & Control Systems - Steering",
          content: "Rack and pinion steering system implementation and linkage design for precise directional control.",
          images: [
            "/assets/project1/mechanical-and-control-systems-steering/whatsapp-image-2026-05-02-at-11.39.20-am.webp",
            "/assets/project1/mechanical-and-control-systems-steering/whatsapp-image-2026-05-02-at-11.39.20-am-1.webp"
          ]
        },
        {
          title: "Suspension System",
          content: "Heavy-duty leaf spring suspension designed for high load-bearing capacity and stability.",
          images: [
            "/assets/project1/suspension-system/whatsapp-image-2026-05-02-at-11.39.33-am.webp"
          ]
        },
        {
          title: "Battery Management System (BMS)",
          content: "Integrated protection circuits to monitor battery health, cell balancing, and over-current protection.",
          images: [
            "/assets/project1/battery-management-system/whatsapp-image-2026-05-02-at-11.42.09-am.webp",
            "/assets/project1/battery-management-system/whatsapp-image-2026-05-02-at-11.43.39-am.webp"
          ]
        },
        {
          title: "Electrical & Electronic Integration",
          content: "Advanced systems for seamless power management and motor control including controllers, inverters, and wiring harnesses.",
          images: [
            "/assets/project1/electronic-and-electronic-integration-system/whatsapp-image-2026-05-02-at-11.53.38-am.webp"
          ]
        },
        {
          title: "Fabrication & Assembly",
          content: "Hands-on assembly and fabrication work: welding, mounting, and aligning drivetrain and body panels.",
          images: [
            "/assets/project1/fabrication/whatsapp-image-2026-05-02-at-11.55.38-am.webp",
            "/assets/project1/fabrication/whatsapp-image-2026-05-02-at-12.02.56-pm.webp",
            "/assets/project1/fabrication/whatsapp-image-2026-05-02-at-12.02.57-pm.webp"
          ]
        },
        {
          title: "Final Vehicle & Outcomes",
          content: "Final integration and testing results, demonstrating a working prototype with regenerative braking and energy-efficient systems.",
          images: [
            "/assets/project1/final-complete-vehicle/whatsapp-image-2026-05-02-at-12.02.55-pm.webp",
            "/assets/project1/final-complete-vehicle/whatsapp-image-2026-05-02-at-12.02.54-pm.webp"
          ]
        },
        {
          title: "Challenges",
          content: "Budget constraints, sourcing reliable components, and meeting safety and structural integrity requirements. Overcame these through careful sourcing, modular design, and rigorous testing.",
          images: [
            "/assets/project1/fabrication/whatsapp-image-2026-05-02-at-11.55.38-am.webp"
          ]
        }
      ],
      achievements: [
        "Successfully proved functional EVs are achievable through practical engineering on a limited budget",
        "Constructed robust vehicle body with high-strength steel for maximum safety",
        "Integrated regenerative braking system extending driving range",
        "Developed zero-emission transportation contributing to urban air quality improvement",
        "Demonstrated innovative design approach combining theoretical research with hands-on technical execution"
      ],
      myRole: "As a key contributor to the Electric Vehicle project, I spearheaded the comprehensive research phase and conducted detailed cost-benefit analysis to ensure the prototype remained budget-friendly without compromising performance. I was responsible for developing the project roadmap and managing the completion timeline, ensuring all milestones were met through efficient resource allocation. Beyond project management, I provided hands-on technical assistance in mechanical assembly and systems integration, bridging the gap between theoretical research and practical engineering to deliver a functional, eco-friendly transportation solution.",
      tech: ["SolidWorks", "CAD", "BLDC Motors", "Battery Management", "Motor Controllers", "Regenerative Braking", "Mechanical Assembly", "Cost Analysis"],
      impact: "Demonstrated that high-performance electric vehicles are achievable on restricted budgets through strategic engineering and innovation."
    }
  ],
  achievements: {
    skills: [
      {
        title: "Mechanical & Technical",
        items: [
          "Hydraulic system diagnostics and troubleshooting",
          "Mechanical system assembly and disassembly",
          "Preventive maintenance of workshop equipment",
          "Basic understanding of heavy construction machinery",
        ],
      },
      {
        title: "Safety & Compliance",
        items: [
          "Health and safety management practices",
          "Proper use of Personal Protective Equipment (PPE)",
          "Risk assessment in workshop environments",
        ],
      },
      {
        title: "Digital & Administrative",
        items: [
          "Teamwork",
          "Microsoft Office (Word, Excel, PowerPoint)",
          "Basic project planning and documentation",
          "Project time management",
        ],
      },
      {
        title: "Workshop Equipment & Tools Used",
        items: [
          "Workshop machines including lathe machine, drill machine and milling machine",
          "Reading manuals of machines and equipment",
          "Used workshop tools such as vernier caliper, screw gauge, inside caliper and outside caliper",
          "Workshop equipment calibration",
        ],
      },
    ],
    certifications: [
      {
        title: "Oil & Gas Drilling",
        provider: "National Technical Training Council (NTTC)",
        date: "02/11/2023",
        mode: "Online",
        description: "Learned drilling systems, tools, and operational procedures, and gained foundational knowledge of oil and gas industry practices.",
        skills: ["Drilling systems", "Tools and operational procedures", "Oil & gas industry basics"],
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
      competitionWins: "4",
      certificationsCount: "1",
      cgpa: "Hands-on",
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
      skills:
        Array.isArray(source.achievements?.skills) && source.achievements.skills.length
          ? source.achievements.skills
          : defaultPortfolioContent.achievements.skills,
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
