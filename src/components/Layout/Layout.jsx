import Navbar from './Navbar.jsx'
import ScrollToTop from '../common/ScrollToTop.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors">
      <ScrollToTop />
      <Navbar />
      <main className="pt-13">
        {children}
      </main>
    </div>
  )
}
