import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, FileText, Search, BookOpen, Loader2 } from 'lucide-react'
import { aiChat } from '../../utils/supabase.js'

const MODES = [
  {
    key: 'resume',
    title: 'AI 简历问答',
    desc: '基于我的真实经历，AI 回答任何关于我的问题',
    icon: FileText,
    placeholder: '比如：你是什么专业的？有什么技能？',
  },
  {
    key: 'projects',
    title: 'AI 项目搜索',
    desc: '用自然语言搜索我的项目，"那个用 Supabase 的项目"',
    icon: Search,
    placeholder: '比如：找找跟 AI 相关的项目',
  },
  {
    key: 'docs',
    title: 'AI 文档助手',
    desc: '上传技术笔记后，用自然语言搜索文档内容',
    icon: BookOpen,
    placeholder: '比如：React 的 useEffect 怎么用？',
  },
]

export default function AISection() {
  const [mode, setMode] = useState('resume')
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const q = query.trim()
    if (!q || loading) return
    setLoading(true)
    setError('')
    setAnswer('')
    try {
      const res = await aiChat({ mode, query: q, history: [] })
      setAnswer(res.answer)
    } catch (err) {
      setError(err.message || '请求失败')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <section className="py-16 md:py-20 border-t border-black/5 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-blue-500/10 text-blue-600 dark:text-blue-400
                          text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} />
            POWERED BY DEEPSEEK
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">
            和我聊聊吧
          </h2>
          <p className="text-sm text-black/40 dark:text-white/40 max-w-md mx-auto">
            AI 助手了解我的简历、项目和笔记，用自然语言和我对话
          </p>
        </div>

        {/* Mode cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {MODES.map(m => {
            const Icon = m.icon
            const active = mode === m.key
            return (
              <button
                key={m.key}
                onClick={() => { setMode(m.key); setAnswer(''); setError('') }}
                className={`text-left p-5 rounded-2xl border transition-all duration-300
                            ${active
                              ? 'bg-white dark:bg-[#1c1c1e] border-blue-500/30 shadow-md shadow-blue-500/5'
                              : 'bg-white/50 dark:bg-[#1c1c1e]/50 border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20'
                            }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3
                                ${active ? 'bg-blue-500/10' : 'bg-black/5 dark:bg-white/5'}`}>
                  <Icon size={20} className={active ? 'text-blue-500' : 'text-black/30 dark:text-white/30'} />
                </div>
                <h3 className={`text-sm font-semibold mb-1 ${active ? 'text-black dark:text-white' : 'text-black/60 dark:text-white/60'}`}>
                  {m.title}
                </h3>
                <p className="text-xs text-black/30 dark:text-white/30 leading-relaxed">
                  {m.desc}
                </p>
              </button>
            )
          })}
        </div>

        {/* Search bar */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-black/5 dark:border-white/10
                        shadow-sm p-4 flex gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder={MODES.find(m => m.key === mode)?.placeholder || '输入你的问题…'}
            className="flex-1 bg-transparent text-sm text-black dark:text-white
                       placeholder:text-black/25 dark:placeholder:text-white/25
                       focus:outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={!query.trim() || loading}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500
                       hover:bg-blue-600 active:scale-95
                       disabled:opacity-30 disabled:pointer-events-none
                       flex items-center justify-center transition-all"
          >
            {loading ? (
              <Loader2 size={16} className="text-white animate-spin" />
            ) : (
              <Send size={15} className="text-white" />
            )}
          </button>
        </div>

        {/* Answer area */}
        {(loading || answer || error) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-white dark:bg-[#1c1c1e]
                       border border-black/5 dark:border-white/10 shadow-sm"
          >
            {loading && (
              <div className="flex items-center gap-3 text-sm text-black/40 dark:text-white/40">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500/40 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
                AI 正在思考…
              </div>
            )}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {answer && (
              <div className="text-sm text-black dark:text-white leading-relaxed whitespace-pre-wrap">
                {answer}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
