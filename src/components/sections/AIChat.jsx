import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, FileText, Search, BookOpen } from 'lucide-react'
import { aiChat } from '../../utils/supabase.js'

const TABS = [
  { key: 'resume', label: '简历问答', icon: FileText },
  { key: 'projects', label: '项目搜索', icon: Search },
  { key: 'docs', label: '文档助手', icon: BookOpen },
]

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('resume')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const res = await aiChat({ mode: tab, query: text, history })
      setMessages(prev => [...prev, { role: 'assistant', content: res.answer }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，出了点问题：' + err.message }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full
                    bg-white dark:bg-[#1c1c1e]
                    border border-black/5 dark:border-white/10
                    shadow-lg hover:shadow-xl
                    flex items-center justify-center
                    transition-all duration-300 hover:scale-105 active:scale-95
                    ${open ? 'opacity-0 pointer-events-none' : ''}`}
      >
        <Sparkles size={22} className="text-blue-500" />
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-6 right-6 z-[90] w-[380px] max-w-[calc(100vw-3rem)]
                       h-[560px] max-h-[calc(100vh-6rem)]
                       bg-white dark:bg-[#1c1c1e]
                       border border-black/10 dark:border-white/10
                       rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-5 py-4 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Sparkles size={15} className="text-blue-500" />
                  </div>
                  <span className="font-semibold text-sm text-black dark:text-white">AI 助手</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-black/5 dark:hover:bg-white/10
                             flex items-center justify-center transition-colors"
                >
                  <X size={15} className="text-black/40 dark:text-white/40" />
                </button>
              </div>
              {/* Tabs */}
              <div className="flex gap-1 bg-black/5 dark:bg-white/5 rounded-xl p-1">
                {TABS.map(t => {
                  const Icon = t.icon
                  const active = tab === t.key
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5
                                  rounded-lg text-xs font-medium transition-all duration-200
                                  ${active
                                    ? 'bg-white dark:bg-[#2c2c2e] text-black dark:text-white shadow-sm'
                                    : 'text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60'
                                  }`}
                    >
                      <Icon size={13} />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-black/25 dark:text-white/25 py-12">
                  <Sparkles size={32} className="mx-auto mb-3 opacity-30" />
                  <p>问我关于简历、项目或技术笔记的问题</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                                  ${msg.role === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-md'
                                    : 'bg-[#f5f5f7] dark:bg-[#2c2c2e] text-black dark:text-white rounded-bl-md'
                                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-black/5 dark:border-white/10">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="输入问题…"
                  className="flex-1 h-10 px-4 rounded-xl bg-[#f5f5f7] dark:bg-[#2c2c2e]
                             border border-black/5 dark:border-white/10
                             text-sm text-black dark:text-white
                             placeholder:text-black/25 dark:placeholder:text-white/25
                             focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-blue-500
                             hover:bg-blue-600 active:scale-95
                             disabled:opacity-30 disabled:pointer-events-none
                             flex items-center justify-center transition-all"
                >
                  <Send size={15} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
