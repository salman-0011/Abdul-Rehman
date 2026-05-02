"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Calendar, Zap, Users, X } from "lucide-react"
import Image from "next/image"
import type { PortfolioProject } from "@/lib/portfolio-content"
import Carousel from "@/components/Carousel"

interface ProjectDetailCardProps {
  project: PortfolioProject
}

export default function ProjectDetailCard({ project }: ProjectDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <motion.div
      layout
      className="border border-amber-500/30 rounded-lg bg-slate-900/40 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Card Header - Always Visible */}
      <div className="w-full text-left">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setLightboxSrc(project.cardImage)
          }}
          className="relative block w-full bg-slate-800 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-zoom-in"
          style={{ aspectRatio: "16 / 9" }}
          aria-label={`Expand image for ${project.title}`}
        >
          <Image
            src={project.cardImage}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 py-1 bg-amber-300/90 text-slate-900 text-xs font-semibold rounded">
            {project.category}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 sm:p-4 md:p-5 flex items-start justify-between gap-2 sm:gap-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-expanded={isExpanded}
          aria-label={`Toggle details for ${project.title}`}
        >
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-100 mb-1 truncate">{project.title}</h3>
            <p className="text-amber-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-1">{project.tagline}</p>
            <p className="text-slate-300 text-xs sm:text-sm line-clamp-2">{project.shortDescription}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2 flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
          </motion.div>
        </button>

        <div className="px-3 sm:px-4 md:px-5 pb-2 sm:pb-3 md:pb-4">
          <a href={`/projects/${project.id}`} className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors">Open full page →</a>
        </div>
      </div>

      {/* Expandable Detail Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-amber-500/20"
          >
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Overview */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-2 sm:mb-3">Overview</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{project.overview}</p>
              </div>

              {/* Detailed Sections */}
              {project.sections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-2 sm:mb-3">{section.title}</h4>

                  {section.images && section.images.length > 0 && (
                    <div className="mb-4">
                      {section.images.length > 4 ? (
                        <div className="relative mb-4 w-full">
                          <Carousel images={section.images} onOpen={setLightboxSrc} />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 mb-4 w-full">
                          {section.images.map((img) => (
                            <button
                              type="button"
                              key={img}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setLightboxSrc(img)
                              }}
                              className="relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-800 hover:opacity-80 transition-opacity"
                            >
                              <Image src={img} alt={section.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 whitespace-pre-line">
                    {section.content}
                  </p>

                  {/* Subsections */}
                  {section.subsections && (
                    <div className="space-y-3 ml-3 sm:ml-4 border-l border-teal-300/30 pl-3 sm:pl-4">
                      {section.subsections.map((subsection, sidx) => (
                        <div key={sidx}>
                          <h5 className="text-teal-300 text-sm sm:text-base font-semibold mb-1">
                            {subsection.title}
                          </h5>
                          <p className="text-slate-400 text-xs sm:text-sm">{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Key Achievements */}
              {project.achievements.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base">
                        <span className="text-teal-300 font-bold flex-shrink-0 mt-0.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* My Role */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-2 sm:mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  My Role & Contribution
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{project.myRole}</p>
              </div>

              {/* Tech Stack */}
              {project.tech.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-2 sm:mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 sm:px-3 py-1 bg-teal-300/20 border border-teal-300/50 text-teal-300 text-xs sm:text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-amber-500/20">
                <div>
                  <p className="text-slate-400 text-xs sm:text-sm">Project Year</p>
                  <p className="text-amber-300 font-semibold text-sm sm:text-base flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {project.year}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs sm:text-sm">Impact</p>
                  <p className="text-teal-300 font-semibold text-sm sm:text-base mt-1">{project.impact}</p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setIsExpanded(false)}
                className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 border border-amber-500/30 text-slate-200 rounded-lg font-medium transition-colors"
              >
                Collapse
              </button>
            </div>
            {/* Lightbox */}
            <AnimatePresence>
              {lightboxSrc && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4"
                  onClick={() => setLightboxSrc(null)}
                  role="presentation"
                >
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0.9 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative w-full max-w-2xl max-h-[90vh] flex flex-col items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxSrc(null)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                      aria-label="Close image"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <div className="w-full h-full overflow-auto bg-slate-900/50 rounded-lg flex items-center justify-center">
                      <Image
                        src={lightboxSrc}
                        alt="Full size preview"
                        width={1200}
                        height={800}
                        className="w-auto h-auto max-w-full max-h-full object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
