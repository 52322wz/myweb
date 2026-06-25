import PhotoWall from '../components/sections/PhotoWall.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import PortfolioPreview from '../components/sections/PortfolioPreview.jsx'

export default function Home() {
  return (
    <div>
      {/* Full-width auto-playing carousel at top */}
      <PhotoWall />

      {/* Two-column content below */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:w-[40%] lg:min-w-[340px] lg:max-w-[440px]
                          lg:border-r lg:border-black/5 dark:lg:border-white/10">
            <ContactSection />
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex-1">
            <PortfolioPreview />
          </div>
        </div>
      </div>
    </div>
  )
}
