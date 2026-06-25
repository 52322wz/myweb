import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const posts = t('blog.posts', { returnObjects: true })
  const post = Array.isArray(posts) ? posts.find(p => p.slug === slug) : null

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {t('notFound.desc')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700
                       text-white font-medium rounded-xl transition-colors"
          >
            <ArrowLeft size={18} />
            {t('notFound.back')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                     hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          {t('nav.blog')}
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={14} />
              {post.tags?.join(', ')}
            </span>
          </div>
        </header>

        {/* Content placeholder */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-8 p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl text-center text-gray-400 dark:text-gray-500">
            <p className="text-lg">📝</p>
            <p>Full article content would be rendered here from Markdown or CMS.</p>
            <p className="text-sm mt-2">（完整文章内容将从 Markdown 或 CMS 中渲染）</p>
          </div>
        </div>
      </article>
    </div>
  )
}
