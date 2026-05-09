"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Menu, X } from "lucide-react"
import Image from "next/image"
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
      <div className="fixed right-4 sm:right-6 md:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <motion.nav
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 md:p-4"
        >
          <div className="flex flex-col space-y-2 md:space-y-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`text-left px-3 md:px-4 py-2 md:py-2 rounded-lg transition-all duration-300 text-xs md:text-sm ${
                  currentSection === index
                    ? "bg-slate-800 border border-amber-500/30 text-amber-300"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <div className="text-xs md:text-sm font-medium">{section.subtitle}</div>
                <div className="text-xs text-gray-500">{section.id}</div>
              </button>
            ))}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 md:hidden">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 sm:p-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg text-white hover:border-amber-500/50 transition-all duration-300"
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
              className="absolute top-14 right-0 w-56 sm:w-64 bg-slate-950/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 sm:p-4 shadow-xl mt-2"
            >
              <div className="flex flex-col space-y-1.5 sm:space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(index)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                      currentSection === index
                        ? "bg-slate-800 border border-amber-500/30 text-amber-300"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-medium">{section.subtitle}</div>
                    <div className="text-xs text-gray-500">{section.id}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Floating Contact Me Button */}
      <div className="fixed left-4 sm:left-6 bottom-6 sm:bottom-8 z-40">
        <motion.button
          onClick={() => scrollToSection(4)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white text-xs sm:text-sm font-medium transition-all duration-300 group border border-slate-700 whitespace-nowrap"
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
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/60 shadow-2xl mb-8 sm:mb-10"
              >
                <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
                  {intro.bannerImage ? (
                    <Image
                      src={intro.bannerImage}
                      alt="Banner background"
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-teal-400 to-blue-500" />


                  <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex items-end gap-4 sm:gap-6 px-4 sm:px-6">
                    <div className="relative h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32 overflow-hidden rounded-full border-4 border-slate-950 bg-slate-800 shadow-xl shrink-0">
                      <Image
                        src={intro.profileImage}
                        alt="Abdul Rehman profile photo"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="max-w-3xl pb-1 sm:pb-2">

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        {intro.greetingName}
                      </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-amber-300 font-semibold mt-1">
                          Associate Mechanical Engineer
                        </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="mb-6 sm:mb-8"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.2]">
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
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 font-light tracking-wide leading-[1.8]"
                >
                  {intro.tagline}
                </motion.p>
              </div>
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
            <div className="max-w-5xl text-center px-4 sm:px-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 tracking-tight text-amber-300"
              >
                About Me
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="space-y-6 sm:space-y-8 mx-auto"
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 leading-[1.9] max-w-4xl mx-auto">
                  My practical interests focus on mechanical and engineering systems, hydraulic and construction machinery, workshop practice, engineering drawing, thermodynamics, safety compliance, problem solving, and digital support tools.
                </p>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 leading-[1.9] max-w-4xl mx-auto">
                  Through DAE coursework, workshop practice, and project-based learning, I have built a strong foundation in technical analysis, hands-on fabrication, and reliable engineering execution.
                </p>
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
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-4xl w-full lg:pr-40 xl:pr-48">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-14 lg:mb-18 text-center tracking-tight text-amber-300"
              >
                Projects
              </motion.h2>

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
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
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-6xl w-full lg:pr-40 xl:pr-48">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-14 lg:mb-18 text-center tracking-tight text-amber-300"
              >
                Technical Skills & Expertise
              </motion.h2>

              <p className="text-center max-w-4xl mx-auto text-slate-300 text-base sm:text-lg md:text-xl leading-[1.9] mb-10 sm:mb-12 lg:mb-16">
                A refined overview of the mechanical, practical, and supporting engineering abilities I have built through coursework, workshop practice, and project work.
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
                >
                  {achievements.skills.map((skillGroup, index) => {
                    const cardStyles = [
                      "from-amber-500/20 via-slate-900/80 to-slate-900 border-amber-500/30",
                      "from-teal-500/20 via-slate-900/80 to-slate-900 border-teal-500/30",
                      "from-blue-500/20 via-slate-900/80 to-slate-900 border-blue-500/30",
                      "from-purple-500/20 via-slate-900/80 to-slate-900 border-purple-500/30",
                      "from-emerald-500/20 via-slate-900/80 to-slate-900 border-emerald-500/30",
                      "from-rose-500/20 via-slate-900/80 to-slate-900 border-rose-500/30",
                      "from-cyan-500/20 via-slate-900/80 to-slate-900 border-cyan-500/30",
                      "from-orange-500/20 via-slate-900/80 to-slate-900 border-orange-500/30",
                    ]
                    const style = cardStyles[index % cardStyles.length]

                    return (
                      <motion.div
                        key={skillGroup.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + index * 0.06, duration: 0.4 }}
                        className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${style} shadow-xl`}
                      >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
                        <div className="p-5 sm:p-6 lg:p-7">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-slate-400 mb-2">
                                Skill Domain {String(index + 1).padStart(2, "0")}
                              </p>
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                                {skillGroup.title}
                              </h3>
                            </div>
                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-amber-300 font-bold text-sm sm:text-base">
                              {index + 1}
                            </div>
                          </div>

                          <ul className="space-y-3">
                            {skillGroup.items.map((item) => (
                              <li key={item} className="flex gap-3 text-slate-200 text-sm sm:text-base leading-[1.85]">
                                <span className="mt-1 h-2 w-2 rounded-full bg-amber-300 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-5 pt-4 border-t border-white/10">
                            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-slate-400 mb-2">
                              How I Learned
                            </p>
                            <p className="text-slate-300 text-sm sm:text-base leading-[1.8]">
                              {skillGroup.howLearned}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>

                <div className="space-y-6 sm:space-y-7 xl:sticky xl:top-24">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-slate-900/80 to-slate-950 p-5 sm:p-6 lg:p-7 shadow-2xl"
                  >
                    <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-200 mb-3">
                      Core Strengths
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                      What defines my engineering approach
                    </h3>
                    <ul className="space-y-3">
                      {achievements.keyStrengths.map((strength) => (
                        <li key={strength} className="flex gap-3 text-slate-200 text-sm sm:text-base leading-[1.8]">
                          <span className="text-amber-300 font-bold flex-shrink-0">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="rounded-3xl border border-slate-700 bg-slate-900/50 p-5 sm:p-6 lg:p-7 shadow-xl"
                  >
                    <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-400 mb-3">
                      Certification
                    </p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-300 mb-2">
                      {achievements.certifications[0]?.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-[1.8] mb-3">
                      {achievements.certifications[0]?.provider}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-400 mb-4">
                      <span>Issued: {achievements.certifications[0]?.date}</span>
                      <span>•</span>
                      <span>{achievements.certifications[0]?.mode}</span>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-[1.8]">
                      {achievements.certifications[0]?.description}
                    </p>
                  </motion.div>
                </div>
              </div>

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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-14 lg:mb-18 text-center tracking-tight text-amber-300"
              >
                Let's Connect
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-4 sm:space-y-6 lg:space-y-8"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-slate-100">
                      Get In Touch
                    </h3>
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-[1.9] mb-8 sm:mb-10">
                      {contact.description}
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                    {/* Location */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-teal-500/50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div className="min-w-0">
                        <h4 className="text-white font-semibold text-base sm:text-lg">Location</h4>
                        <p className="text-gray-400 text-sm sm:text-base truncate">{contact.location}</p>
                      </div>
                    </motion.div>

                    {/* WhatsApp */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-teal-500/50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-semibold text-base sm:text-lg">WhatsApp</h4>
                        <a
                          href={contact.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-green-400 transition-colors text-sm sm:text-base truncate"
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
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 flex-shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-semibold text-base sm:text-lg">Email</h4>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-gray-400 hover:text-purple-400 transition-colors text-sm sm:text-base truncate break-all"
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
                    className="pt-4 sm:pt-6 lg:pt-8"
                  >
                    <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-300">Connect With Me</h4>
                    <div className="flex gap-3 sm:gap-4">
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
                          className={`p-2.5 sm:p-3 bg-gradient-to-r ${visual.color} rounded-full hover:scale-110 transition-all duration-300 group flex-shrink-0`}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
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
                  className="bg-slate-900/40 backdrop-blur-sm border border-slate-700 rounded-lg p-4 sm:p-6 lg:p-8"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-6 text-slate-100">
                    Send Me a Message
                  </h3>

                  <form id="contact-form" action={handleFormSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300 text-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300 text-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300 text-sm"
                        placeholder="Project Discussion"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300 resize-none text-sm"
                        placeholder="Tell me about your project or how I can help you..."
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full py-2.5 sm:py-3 lg:py-4 font-medium rounded-lg transition-all duration-300 shadow-lg text-sm sm:text-base ${
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
                        className="text-center p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm"
                      >
                        ✅ Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
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
                className="text-center mt-8 sm:mt-12"
              >
                <motion.a
                  href={contact.resumePath}
                  download={contact.resumeFileName}
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white font-medium transition-all duration-300 group border border-slate-700 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
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
