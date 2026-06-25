import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const PHOTOS = [
  { src: '/images/photos/photo1.jpg', alt: '照片 1' },
  { src: '/images/photos/photo2.jpg', alt: '照片 2' },
  { src: '/images/photos/photo3.jpg', alt: '照片 3' },
]

export default function PhotoWall() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % PHOTOS.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + PHOTOS.length) % PHOTOS.length)
  }, [])

  // Auto-play
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 60 : -60, opacity: 0 }),
  }

  return (
    <div className="relative w-full overflow-hidden bg-gray-200 dark:bg-gray-900
                    h-[50vh] sm:h-[60vh] md:h-[70vh]"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}>

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          src={PHOTOS[current].src}
          alt={PHOTOS[current].alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

      {/* Controls — bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3
                      bg-black/30 backdrop-blur-md rounded-full px-4 py-2">
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex gap-1.5">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                setDirection(i > current ? 1 : -1)
                setCurrent(i)
              }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused) }}
          className="text-white/80 hover:text-white transition-colors"
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </div>
  )
}
