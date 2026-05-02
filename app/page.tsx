"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Menu, X } from "lucide-react"
import { sendContactEmail } from "./actions/contact"
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/portfolio-content"
import ProjectDetailCard from "@/components/ProjectDetailCard"

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [portfolioContent] = useState<PortfolioContent>(defaultPortfolioContent)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const { intro, sections, about, projects, achievements, contact } = portfolioContent

  const scrollToSection = (index: number) => {
    setCurrentSection(index)
  }

  const getSocialVisual = (label: string) => {
    const normalized = label.toLowerCase()
    if (normalized.includes("github")) {
      return { icon: Github, color: "from-slate-700 to-slate-900" }
    }
    if (normalized.includes("linkedin")) {
      return { icon: Linkedin, color: "from-teal-700 to-cyan-900" }
    }
    return { icon: ExternalLink, color: "from-amber-600 to-orange-800" }
  }

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        setSubmitStatus("success")
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Desktop Navigation Bar */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <motion.nav
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4"
        >
          <div className="flex flex-col space-y-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentSection === index
                    ? "bg-slate-800 border border-amber-500/30 text-amber-300"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <div className="text-sm font-medium">{section.subtitle}</div>
                <div className="text-xs text-gray-500">{section.id}</div>
              </button>
            ))}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed top-8 right-8 z-50 md:hidden">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg text-white hover:border-amber-500/50 transition-all duration-300"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-0 w-64 bg-slate-950/95 backdrop-blur-sm border border-slate-700 rounded-lg p-4 shadow-xl"
            >
              <div className="flex flex-col space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(index)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      currentSection === index
                        ? "bg-slate-800 border border-amber-500/30 text-amber-300"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="text-sm font-medium">{section.subtitle}</div>
                    <div className="text-xs text-gray-500">{section.id}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Floating Contact Me Button */}
      <div className="fixed left-8 bottom-8 z-50">
        <motion.button
          onClick={() => scrollToSection(4)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white text-sm font-medium transition-all duration-300 group border border-slate-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Contact Me
        </motion.button>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.section
            key="intro"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center relative"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-thin tracking-wider mb-4">
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {intro.greetingTop}
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-amber-300"
                  >
                    {intro.greetingMiddle}
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-slate-200"
                  >
                    {intro.greetingName}
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-xl md:text-2xl text-slate-300 font-light tracking-wide"
              >
                {intro.tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.button
                onClick={() => scrollToSection(1)}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown size={32} />
              </motion.button>
            </motion.div>
          </motion.section>
        )}

        {currentSection === 1 && (
          <motion.section
            key="about"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center px-8"
          >
            <div className="max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-5xl md:text-7xl font-thin mb-8 tracking-wider text-amber-300"
              >
                About Me
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="space-y-8"
              >
                <p className="text-2xl md:text-3xl text-slate-300 font-light leading-relaxed">
                  {about.headline}
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  {about.skills.map((skill, index) => (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      className="border border-slate-800 p-6 hover:border-amber-500/50 transition-all duration-300 bg-slate-900/40 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-light mb-2 text-slate-100">
                        {skill.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{skill.skills}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {currentSection === 2 && (
          <motion.section
            key="work"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center px-8"
          >
            <div className="max-w-4xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-5xl md:text-7xl font-thin mb-16 text-center tracking-wider text-amber-300"
              >
                Projects
              </motion.h2>

              <div className="space-y-8">
                {projects.map((project) => (
                  <ProjectDetailCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {currentSection === 3 && (
          <motion.section
            key="achievements"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center px-8"
          >
            <div className="max-w-6xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-5xl md:text-7xl font-thin mb-16 text-center tracking-wider text-amber-300"
              >
                Achievements
              </motion.h2>

              <div className="grid lg:grid-cols-2 gap-12">
                  {/* Project Highlights */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <h3 className="text-2xl font-light mb-8 text-amber-300">
                    ⚙️ Project Highlights & Participation
                  </h3>

                  <div className="space-y-6">
                    {achievements.competitions.map((competition, index) => (
                      <motion.div
                        key={competition.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 p-6 rounded-lg hover:border-amber-500/50 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{competition.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-medium text-white group-hover:text-yellow-300 transition-colors">
                                {competition.title}
                              </h4>
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  competition.type === "Winner"
                                    ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                                    : "bg-teal-500/10 border border-teal-500/30 text-teal-300"
                                }`}
                              >
                                {competition.type}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{competition.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{competition.event}</span>
                              <span>•</span>
                              <span>{competition.organization}</span>
                              <span>•</span>
                              <span>{competition.year}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <h3 className="text-2xl font-light mb-8 text-slate-100">
                    📜 Technical Certifications
                  </h3>

                  <div className="space-y-6">
                    {achievements.certifications.map((cert, index) => (
                      <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + index * 0.05, duration: 0.4 }}
                        className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 p-6 rounded-lg hover:border-teal-500/50 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-700">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors mb-2">
                              {cert.title}
                            </h4>
                            <p className="text-gray-400 text-sm mb-3">{cert.provider}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {cert.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs bg-slate-800 border border-teal-500/30 px-2 py-1 rounded-full text-teal-300"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>ID: {cert.credentialId}</span>
                              <span>•</span>
                              <span>{cert.year}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Achievement Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-center mt-16"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-amber-300 mb-2">
                      {contact.stats.competitionWins}
                    </div>
                    <p className="text-gray-400">Participations</p>
                  </div>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-teal-300 mb-2">
                      {contact.stats.certificationsCount}
                    </div>
                    <p className="text-gray-400">Technical Certifications</p>
                  </div>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-slate-100 mb-2">
                      {contact.stats.cgpa}
                    </div>
                    <p className="text-gray-400">CGPA</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
        {currentSection === 4 && (
          <motion.section
            key="contact"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center px-8"
          >
            <div className="max-w-6xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-5xl md:text-7xl font-thin mb-16 text-center tracking-wider text-amber-300"
              >
                Let's Connect
              </motion.h2>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-light mb-6 text-slate-100">
                      Get In Touch
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {contact.description}
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-6">
                    {/* Location */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="flex items-center gap-4 p-4 bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-teal-500/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Location</h4>
                        <p className="text-gray-400">{contact.location}</p>
                      </div>
                    </motion.div>

                    {/* WhatsApp */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="flex items-center gap-4 p-4 bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-teal-500/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">WhatsApp</h4>
                        <a
                          href={contact.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-green-400 transition-colors"
                        >
                          {contact.whatsappNumber}
                        </a>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="flex items-center gap-4 p-4 bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Email</h4>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    className="pt-8"
                  >
                    <h4 className="text-lg font-medium mb-4 text-gray-300">Connect With Me</h4>
                    <div className="flex gap-4">
                      {contact.socialLinks.map((social, index) => {
                        const visual = getSocialVisual(social.label)
                        const Icon = visual.icon

                        return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05, duration: 0.25 }}
                          className={`p-3 bg-gradient-to-r ${visual.color} rounded-full hover:scale-110 transition-all duration-300 group`}
                        >
                          <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </motion.a>
                        )
                      })}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg p-8"
                >
                  <h3 className="text-2xl font-light mb-6 text-slate-100">
                    Send Me a Message
                  </h3>

                  <form id="contact-form" action={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="Project Discussion"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or how I can help you..."
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          className={`w-full py-4 font-medium rounded-lg transition-all duration-300 shadow-lg ${
                        isSubmitting
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-slate-800 hover:bg-slate-700 border border-slate-700"
                      } text-white`}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>

                    {/* Status Messages */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300"
                      >
                        ✅ Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300"
                      >
                        ❌ Failed to send message. Please try again or contact me directly.
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </div>

              {/* Resume Download in Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-center mt-12"
              >
                <motion.a
                  href={contact.resumePath}
                  download={contact.resumeFileName}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white font-medium transition-all duration-300 group border border-slate-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                </motion.a>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
