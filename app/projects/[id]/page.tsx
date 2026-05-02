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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link href="/#work" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Projects</span>
        </Link>
        
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4 break-words">{project.title}</h1>
          <p className="text-sm sm:text-base text-amber-300">{project.tagline}</p>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <ProjectDetailCard project={project} />
        </div>
      </div>
    </div>
  )
}
