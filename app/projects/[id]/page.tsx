import { notFound } from 'next/navigation'
import { defaultPortfolioContent } from '@/lib/portfolio-content'
import ProjectDetailCard from '@/components/ProjectDetailCard'

interface Props { params: { id: string } }

export default function ProjectPage({ params }: Props) {
  const project = defaultPortfolioContent.projects.find(p => p.id === params.id)
  if (!project) return notFound()

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-6">{project.title}</h1>
        <p className="text-amber-300 mb-6">{project.tagline}</p>
        <ProjectDetailCard project={project} />
      </div>
    </div>
  )
}
