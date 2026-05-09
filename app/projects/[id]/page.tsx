import { notFound } from 'next/navigation'
import { defaultPortfolioContent } from '@/lib/portfolio-content'
import ProjectDetailCard from '@/components/ProjectDetailCard'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface Props { params: { id: string } }

export default function ProjectPage({ params }: Props) {
  const project = defaultPortfolioContent.projects.find(p => p.id === params.id)
  if (!project) return notFound()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <Link href="/#work" className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 sm:mb-12 transition-colors text-sm sm:text-base font-medium">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
        
        <div className="mb-10 sm:mb-12 space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] break-words">{project.title}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-amber-300 leading-[1.8] max-w-3xl">{project.tagline}</p>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <ProjectDetailCard project={project} />
        </div>
      </div>
    </div>
  )
}
