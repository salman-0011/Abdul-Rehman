"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  images: string[]
  onOpen?: (src: string) => void
}

export default function Carousel({ images, onOpen }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onOpen?.(images[index])
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full bg-slate-800 rounded overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
        <button 
          onClick={handleImageClick}
          className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full h-full cursor-zoom-in"
        >
          <Image 
            src={images[index]} 
            alt={`slide-${index}`} 
            fill 
            className="object-contain" 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          />
        </button>
      </div>

      <button 
        onClick={(e) => { e.preventDefault(); prev() }}
        className="absolute top-1/2 left-1 sm:left-2 -translate-y-1/2 p-1 sm:p-2 bg-black/60 hover:bg-black/80 rounded text-white transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); next() }}
        className="absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 p-1 sm:p-2 bg-black/60 hover:bg-black/80 rounded text-white transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="flex justify-center gap-1 sm:gap-2 mt-3 flex-wrap px-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); setIndex(i) }}
            className={`h-2 transition-all rounded-full ${
              i === index 
                ? 'w-6 sm:w-8 bg-amber-300' 
                : 'w-3 sm:w-5 bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
