import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'
import {
  getResumeData, saveResumeEntry, deleteResumeEntry,
  getProjects, saveProject, deleteProject,
  getDocuments, saveDocument, deleteDocument,
} from '../utils/supabase.js'

const TABS = [
  { key: 'resume', label: '简历数据' },
  { key: 'projects', label: '项目管理' },
  { key: 'docs', label: '技术文档' },
]

const CATEGORIES = ['education', 'skills', 'experience', 'about']

function ResumeEditor() {
  const [items, setItems] = useState([])
  const [edit, setEdit] = useState(null)

  useEffect(() => { getResumeData().then(setItems) }, [])

  const handleSave = async () => {
    if (!edit) return
    await saveResumeEntry(edit)
    setEdit(null)
    getResumeData().then(setItems)
  }

  return (
    <div>
      <button
        onClick={() => setEdit({ category: 'skills', title: '', content: '', order_num: items.length })}
        className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 mb-4"
      >
        <Plus size={16} /> 添加
      </button>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-black/30 uppercase">{item.category}</span>
              <div className="flex gap-2">
                <button onClick={() => setEdit(item)} className="text-xs text-blue-500">编辑</button>
                <button onClick={async () => { await deleteResumeEntry(item.id); getResumeData().then(setItems) }}
                        className="text-xs text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <h4 className="font-medium text-sm text-black dark:text-white">{item.title}</h4>
            <p className="text-xs text-black/40 dark:text-white/40 mt-1 line-clamp-2">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {edit && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center p-6"
             onClick={() => setEdit(null)}>
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
               onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold mb-4 text-black dark:text-white">编辑</h3>
            <select value={edit.category} onChange={e => setEdit({ ...edit, category: e.target.value })}
                    className="w-full mb-3 p-2 rounded-xl border text-sm">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={edit.title} onChange={e => setEdit({ ...edit, title: e.target.value })}
                   placeholder="标题" className="w-full mb-3 p-2 rounded-xl border text-sm" />
            <textarea value={edit.content} onChange={e => setEdit({ ...edit, content: e.target.value })}
                      placeholder="内容" rows={6}
                      className="w-full mb-4 p-2 rounded-xl border text-sm" />
            <button onClick={handleSave}
                    className="w-full py-2 bg-blue-500 text-white rounded-xl text-sm font-medium">
              <Save size={14} className="inline mr-1" /> 保存
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectsEditor() {
  const [items, setItems] = useState([])
  const [edit, setEdit] = useState(null)

  useEffect(() => { getProjects().then(setItems) }, [])

  const handleSave = async () => {
    if (!edit) return
    await saveProject(edit)
    setEdit(null)
    getProjects().then(setItems)
  }

  return (
    <div>
      <button
        onClick={() => setEdit({ name: '', description: '', tech_stack: '', link: '' })}
        className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 mb-4"
      >
        <Plus size={16} /> 添加项目
      </button>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm text-black dark:text-white">{item.name}</h4>
              <div className="flex gap-2">
                <button onClick={() => setEdit(item)} className="text-xs text-blue-500">编辑</button>
                <button onClick={async () => { await deleteProject(item.id); getProjects().then(setItems) }}
                        className="text-xs text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-black/40 dark:text-white/40 line-clamp-2">{item.description}</p>
            {item.tech_stack && <p className="text-xs text-blue-500 mt-1">{item.tech_stack}</p>}
          </div>
        ))}
      </div>

      {edit && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center p-6"
             onClick={() => setEdit(null)}>
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 w-full max-w-lg"
               onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold mb-4 text-black dark:text-white">编辑项目</h3>
            <input value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })}
                   placeholder="项目名称" className="w-full mb-3 p-2 rounded-xl border text-sm" />
            <textarea value={edit.description} onChange={e => setEdit({ ...edit, description: e.target.value })}
                      placeholder="项目描述" rows={4}
                      className="w-full mb-3 p-2 rounded-xl border text-sm" />
            <input value={edit.tech_stack} onChange={e => setEdit({ ...edit, tech_stack: e.target.value })}
                   placeholder="技术栈 (如 React, Supabase, Tailwind)" className="w-full mb-3 p-2 rounded-xl border text-sm" />
            <input value={edit.link} onChange={e => setEdit({ ...edit, link: e.target.value })}
                   placeholder="链接" className="w-full mb-4 p-2 rounded-xl border text-sm" />
            <button onClick={handleSave}
                    className="w-full py-2 bg-blue-500 text-white rounded-xl text-sm font-medium">
              <Save size={14} className="inline mr-1" /> 保存
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function DocsManager() {
  const [items, setItems] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => { getDocuments().then(setItems) }, [])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const text = await file.text()
    await saveDocument({
      title: file.name.replace(/\.(txt|md)$/, ''),
      content: text,
    })
    e.target.value = ''
    setUploading(false)
    getDocuments().then(setItems)
  }

  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 mb-4 cursor-pointer">
        <Plus size={16} />
        {uploading ? '上传中…' : '上传文档 (.txt / .md)'}
        <input type="file" accept=".txt,.md" onChange={handleUpload} className="hidden" />
      </label>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="p-4 rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-black dark:text-white">{item.title}</h4>
              <button onClick={async () => { await deleteDocument(item.id); getDocuments().then(setItems) }}
                      className="text-xs text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-xs text-black/30 dark:text-white/30 mt-1">
              {new Date(item.created_at).toLocaleDateString('zh-CN')} · {item.content.length} 字
            </p>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-black/25 dark:text-white/25 text-center py-8">暂无文档</p>
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  const { isAuthenticated } = useAuth()
  const [tab, setTab] = useState('resume')

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-black dark:text-white mb-2">需要登录</p>
          <Link to="/login" className="text-sm text-blue-500 hover:text-blue-600">去登录 →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="flex items-center gap-4 px-6 md:px-10 py-6 border-b border-black/5 dark:border-white/10">
        <Link to="/" className="text-sm text-black/40 dark:text-white/40 hover:text-black/70">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-lg font-semibold text-black dark:text-white">数据管理</h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-black/5 dark:bg-white/5 rounded-xl p-1 mb-6">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
                          ${tab === t.key
                            ? 'bg-white dark:bg-[#2c2c2e] text-black dark:text-white shadow-sm'
                            : 'text-black/40 dark:text-white/40'
                          }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'resume' && <ResumeEditor />}
          {tab === 'projects' && <ProjectsEditor />}
          {tab === 'docs' && <DocsManager />}
        </motion.div>
      </div>
    </div>
  )
}
