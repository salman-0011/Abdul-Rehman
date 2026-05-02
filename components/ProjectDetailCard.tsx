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
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <div className="relative h-40 w-full overflow-hidden bg-slate-800">
          <Image
            src={project.cardImage}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 px-2 py-1 bg-amber-300/90 text-slate-900 text-xs font-semibold rounded">
            {project.category}
          </div>
        </div>

        <div className="p-5 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-100 mb-1">{project.title}</h3>
            <p className="text-amber-300 text-sm font-medium mb-2">{project.tagline}</p>
            <p className="text-slate-300 text-sm line-clamp-2">{project.shortDescription}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-amber-300" />
          </motion.div>
        </div>
        <div className="px-5 pb-4">
          <a href={`/projects/${project.id}`} className="text-sm text-slate-400 hover:text-white">Open full page</a>
        </div>
      </button>

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
            <div className="p-6 space-y-8">
              {/* Overview */}
              <div>
                <h4 className="text-lg font-bold text-amber-300 mb-3">Overview</h4>
                <p className="text-slate-300 leading-relaxed">{project.overview}</p>
              </div>

              {/* Detailed Sections */}
              {project.sections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-bold text-amber-300 mb-3">{section.title}</h4>

                  {section.images && section.images.length > 0 && (
                    <div>
                      {section.images.length > 4 ? (
                        <div className="relative mb-4">
                          <Carousel images={section.images} onOpen={setLightboxSrc} />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                          {section.images.map((img) => (
                            <button
                              key={img}
                              onClick={() => setLightboxSrc(img)}
                              className="relative h-32 w-full rounded-lg overflow-hidden focus:outline-none"
                            >
                              <Image src={img} alt={section.title} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
                    {section.content}
                  </p>

                  {/* Subsections */}
                  {section.subsections && (
                    <div className="space-y-3 ml-4 border-l border-teal-300/30 pl-4">
                      {section.subsections.map((subsection, sidx) => (
                        <div key={sidx}>
                          <h5 className="text-teal-300 font-semibold mb-1">
                            {subsection.title}
                          </h5>
                          <p className="text-slate-400 text-sm">{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Key Achievements */}
              {project.achievements.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-300">
                        <span className="text-teal-300 font-bold mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* My Role */}
              <div>
                <h4 className="text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  My Role & Contribution
                </h4>
                <p className="text-slate-300 leading-relaxed">{project.myRole}</p>
              </div>

              {/* Tech Stack */}
              {project.tech.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-amber-300 mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-teal-300/20 border border-teal-300/50 text-teal-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-500/20">
                <div>
                  <p className="text-slate-400 text-sm">Project Year</p>
                  <p className="text-amber-300 font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Impact</p>
                  <p className="text-teal-300 font-semibold">{project.impact}</p>
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
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
                >
                  <div className="relative max-w-4xl w-full h-full md:h-auto">
                    <button
                      onClick={() => setLightboxSrc(null)}
                      className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/50 text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="w-full h-full rounded">
                      <Image src={lightboxSrc} alt="preview" fill className="object-contain" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
