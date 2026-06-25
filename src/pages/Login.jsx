import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext.jsx'
import { ArrowLeft, Lock } from 'lucide-react'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Small delay so the user sees the loading state
    setTimeout(() => {
      const ok = login(password)
      setLoading(false)
      if (ok) {
        navigate('/portfolio')
      } else {
        setError('密码错误')
      }
    }, 400)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-sm"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 dark:text-white/40
                     hover:text-black/70 dark:hover:text-white/70 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-8
                        border border-black/5 dark:border-white/10
                        shadow-sm">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10
                          flex items-center justify-center mb-6">
            <Lock size={24} className="text-blue-500" />
          </div>

          <h1 className="text-2xl font-bold text-black dark:text-white mb-1.5">
            登录
          </h1>
          <p className="text-sm text-black/40 dark:text-white/40 mb-6">
            请输入密码以管理作品集
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="输入密码"
              autoFocus
              className="w-full h-12 px-4 rounded-xl
                         bg-[#f5f5f7] dark:bg-[#2c2c2e]
                         border border-black/5 dark:border-white/10
                         text-black dark:text-white
                         placeholder:text-black/25 dark:placeholder:text-white/25
                         focus:outline-none focus:ring-2 focus:ring-blue-500/30
                         transition-all text-sm mb-4"
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mb-4"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full h-12 rounded-xl bg-blue-500
                         hover:bg-blue-600 active:scale-[0.98]
                         disabled:opacity-40 disabled:pointer-events-none
                         text-white font-medium text-sm
                         transition-all duration-200"
            >
              {loading ? '验证中…' : '登录'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
