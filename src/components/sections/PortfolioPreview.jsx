import { Link } from 'react-router-dom'
import { Images } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPhotos } from '../../utils/storage.js'

export default function PortfolioPreview() {
  const [photos, setPhotos] = useState([])

  const load = () => setPhotos(getPhotos())

  useEffect(() => {
    load()
    window.addEventListener('focus', load)
    return () => window.removeEventListener('focus', load)
  }, [])

  const latest = photos.length > 0 ? photos[photos.length - 1] : null

  return (
    <section className="px-6 md:px-10 py-10">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-black/30 dark:text-white/30 mb-4">
        作品集
      </h2>

      <Link
        to="/portfolio"
        className="block rounded-3xl bg-white dark:bg-[#1c1c1e]
                   border border-black/5 dark:border-white/10
                   shadow-sm hover:shadow-md
                   transition-all duration-300 group overflow-hidden"
      >
        {/* Preview area */}
        <div className="relative aspect-[16/10] overflow-hidden
                        bg-gradient-to-br from-gray-50 to-gray-100
                        dark:from-[#1c1c1e] dark:to-[#2c2c2e]">
          {/* Latest photo as background */}
          {latest && (
            <img
              src={latest.src}
              alt={latest.name}
              className="absolute inset-0 w-full h-full object-cover
                         group-hover:scale-105 transition-transform duration-700"
            />
          )}
          {/* Overlay */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3
                           transition-all duration-500
                           ${latest
                             ? 'bg-black/30 group-hover:bg-black/25'
                             : 'group-hover:from-blue-50/50 group-hover:to-purple-50/50'
                           }`}>
            <div className={`w-16 h-16 rounded-2xl
                            flex items-center justify-center
                            shadow-sm
                            group-hover:scale-105 transition-transform duration-500
                            ${latest
                              ? 'bg-white/20 backdrop-blur-sm'
                              : 'bg-white dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10'
                            }`}>
              <Images size={28} className={latest ? 'text-white' : 'text-blue-400 dark:text-blue-300'} />
            </div>
            <div className="text-center">
              <p className={`text-base font-semibold ${latest ? 'text-white' : 'text-black dark:text-white'}`}>
                我的作品
              </p>
              <p className={`text-sm mt-0.5 ${latest ? 'text-white/70' : 'text-black/35 dark:text-white/35'}`}>
                {photos.length > 0 ? `${photos.length} 张照片` : '点击查看'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-5 py-3
                        border-t border-black/5 dark:border-white/10
                        bg-white/50 dark:bg-[#1c1c1e]/50">
          <span className="text-xs text-black/30 dark:text-white/30">
            {photos.length > 0 ? '点击浏览全部作品' : '暂无内容'}
          </span>
          <span className="text-xs text-blue-500 font-medium
                           group-hover:translate-x-0.5 transition-transform">
            进入 →
          </span>
        </div>
      </Link>
    </section>
  )
}
