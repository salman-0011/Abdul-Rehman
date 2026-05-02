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

  return (
    <div className="relative">
      <div className="relative h-64 w-full rounded overflow-hidden">
        <button onClick={() => onOpen?.(images[index])} className="absolute inset-0 focus:outline-none">
          <Image src={images[index]} alt={`slide-${index}`} fill className="object-cover" />
        </button>
      </div>

      <button onClick={prev} className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-black/40 rounded text-white">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-black/40 rounded text-white">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full ${i === index ? "bg-amber-300" : "bg-slate-700"}`}
          />
        ))}
      </div>
    </div>
  )
}
