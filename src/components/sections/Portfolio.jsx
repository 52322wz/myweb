import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'

export default function Portfolio() {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(null)
  const inputRef = useRef(null)

  const handleUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          src: ev.target.result,
          name: file.name,
        }])
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  return (
    <section className="px-6 md:px-10 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-black/30 dark:text-white/30">
          作品集
        </h2>
        {images.length > 0 && (
          <span className="text-xs text-black/30 dark:text-white/30">
            {images.length} 张
          </span>
        )}
      </div>

      {/* Upload area */}
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full py-10 rounded-2xl border-2 border-dashed
                   border-black/10 dark:border-white/10
                   hover:border-black/20 dark:hover:border-white/20
                   bg-white/50 dark:bg-[#1c1c1e]/50
                   hover:bg-white dark:hover:bg-[#1c1c1e]
                   transition-all duration-200
                   flex flex-col items-center justify-center gap-2
                   cursor-pointer mb-4"
      >
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Plus size={20} className="text-blue-500" />
        </div>
        <span className="text-sm font-medium text-black/50 dark:text-white/50">
          上传照片
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        <AnimatePresence>
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl
                         bg-gray-200 dark:bg-gray-800 shadow-sm aspect-square"
              onClick={() => setSelected(img)}
            >
              <img
                src={img.src}
                alt={img.name}
                className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-105"
              />
              {/* Delete button */}
              <button
                onClick={(e) => { e.stopPropagation(); removeImage(img.id) }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50
                           flex items-center justify-center opacity-0 group-hover:opacity-100
                           transition-opacity hover:bg-red-500"
              >
                <X size={13} className="text-white" />
              </button>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {images.length === 0 && (
        <p className="text-center text-sm text-black/25 dark:text-white/25 py-12">
          点击上方按钮上传你的作品照片
        </p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center
                       bg-black/90 backdrop-blur-xl p-6 md:p-10"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selected.src}
              alt={selected.name}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20
                         flex items-center justify-center text-white text-lg
                         hover:bg-white/30 transition-colors"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
