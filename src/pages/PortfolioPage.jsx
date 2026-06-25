import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ArrowLeft, ImageIcon, Upload } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getPhotos, savePhoto, removePhoto } from '../utils/storage.js'

/**
 * Resize image via canvas so base64 stays small enough for localStorage.
 * Max dimension 1200px, JPEG quality 0.75.
 */
function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const maxDim = 1200
        let { width, height } = img
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', 0.75),
          name: file.name,
        })
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function PortfolioPage() {
  const { isAuthenticated } = useAuth()
  const [photos, setPhotos] = useState([])
  const [selected, setSelected] = useState(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  // Load photos from storage on mount
  useEffect(() => {
    setPhotos(getPhotos())
  }, [])

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)

    for (const file of files) {
      const compressed = await compressImage(file)
      const photo = {
        id: Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        src: compressed.dataUrl,
        name: compressed.name,
        uploadedAt: new Date().toISOString(),
      }
      const ok = savePhoto(photo)
      if (ok) {
        setPhotos(prev => [...prev, photo])
      } else {
        alert('存储空间不足，请删除一些旧照片后重试')
        break
      }
    }

    setUploading(false)
    e.target.value = ''
  }

  const handleRemove = (id) => {
    removePhoto(id)
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 py-6
                      border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-black/40 dark:text-white/40
                       hover:text-black/70 dark:hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </Link>
          <h1 className="text-lg font-semibold text-black dark:text-white">
            作品集
          </h1>
        </div>
        <span className="text-xs text-black/30 dark:text-white/30">
          {photos.length} 张
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* --- Admin: Upload area --- */}
        {isAuthenticated && (
          <div className="mb-8">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="w-full py-12 rounded-2xl border-2 border-dashed
                         border-black/10 dark:border-white/10
                         hover:border-blue-400 dark:hover:border-blue-400
                         bg-white/50 dark:bg-[#1c1c1e]/50
                         hover:bg-blue-50/50 dark:hover:bg-blue-500/5
                         transition-all duration-200
                         flex flex-col items-center justify-center gap-3
                         cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10
                              flex items-center justify-center
                              group-hover:scale-105 transition-transform">
                {uploading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <Upload size={22} className="text-blue-500" />
                  </motion.div>
                ) : (
                  <Plus size={22} className="text-blue-500" />
                )}
              </div>
              <span className="text-sm font-medium text-black/50 dark:text-white/50">
                {uploading ? '正在上传…' : '上传照片'}
              </span>
              <span className="text-xs text-black/25 dark:text-white/25">
                JPG / PNG，自动压缩至合适尺寸
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
          </div>
        )}

        {/* --- Photo Grid --- */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl
                             bg-gray-200 dark:bg-gray-800 shadow-sm aspect-square"
                  onClick={() => setSelected(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.name}
                    className="w-full h-full object-cover transition-transform duration-700
                               group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5
                                  transition-colors duration-300" />

                  {/* Delete (admin only) */}
                  {isAuthenticated && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemove(photo.id) }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full
                                 bg-black/50 backdrop-blur-sm
                                 flex items-center justify-center
                                 opacity-0 group-hover:opacity-100
                                 transition-all duration-200
                                 hover:bg-red-500 hover:scale-110"
                    >
                      <X size={13} className="text-white" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5
                            flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={28} className="text-black/15 dark:text-white/15" />
            </div>
            <p className="text-sm text-black/30 dark:text-white/30">
              {isAuthenticated
                ? '点击上方按钮上传你的第一张作品照片'
                : '暂无作品照片'}
            </p>
          </div>
        )}
      </div>

      {/* --- Lightbox --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center
                       bg-black/95 backdrop-blur-xl p-6 md:p-10"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              src={selected.src}
              alt={selected.name}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/15
                         flex items-center justify-center text-white
                         hover:bg-white/25 transition-colors"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>
            {/* Photo name */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2
                          text-sm text-white/50 bg-black/30 backdrop-blur-sm
                          rounded-full px-4 py-1.5">
              {selected.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
