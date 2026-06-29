import { Link } from 'react-router-dom'
import { Moon, Sun, LogIn, LogOut, Image, Settings } from 'lucide-react'
import { useTheme } from '../common/ThemeProvider.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-13
                    bg-white/70 dark:bg-black/70 backdrop-blur-xl
                    border-b border-black/5 dark:border-white/10">
      <div className="h-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight
                                text-black dark:text-white no-underline
                                hover:opacity-70 transition-opacity">
          自由的小王
        </Link>

        <div className="flex items-center gap-1">
          {/* Portfolio */}
          <Link
            to="/portfolio"
            className="w-9 h-9 flex items-center justify-center rounded-full
                       text-black/50 dark:text-white/50
                       hover:bg-black/5 dark:hover:bg-white/10
                       transition-colors"
            aria-label="作品集"
          >
            <Image size={17} />
          </Link>

          {/* Admin (only when logged in) */}
          {isAuthenticated && (
            <Link
              to="/admin"
              className="w-9 h-9 flex items-center justify-center rounded-full
                         text-black/50 dark:text-white/50
                         hover:bg-black/5 dark:hover:bg-white/10
                         transition-colors"
              aria-label="数据管理"
            >
              <Settings size={17} />
            </Link>
          )}

          {/* Login / Logout */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-9 h-9 flex items-center justify-center rounded-full
                         text-black/50 dark:text-white/50
                         hover:bg-black/5 dark:hover:bg-white/10
                         transition-colors"
              aria-label="退出登录"
            >
              <LogOut size={17} />
            </button>
          ) : (
            <Link
              to="/login"
              className="w-9 h-9 flex items-center justify-center rounded-full
                         text-black/50 dark:text-white/50
                         hover:bg-black/5 dark:hover:bg-white/10
                         transition-colors"
              aria-label="登录"
            >
              <LogIn size={17} />
            </Link>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-full
                       text-black/60 dark:text-white/60
                       hover:bg-black/5 dark:hover:bg-white/10
                       transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
