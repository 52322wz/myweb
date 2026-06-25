import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import SectionTitle from '../common/SectionTitle.jsx'

export default function Blog() {
  const { t } = useTranslation()
  const posts = t('blog.posts', { returnObjects: true })

  return (
    <section id="blog" className="section-padding transition-colors">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title={t('blog.title')} subtitle={t('blog.subtitle')} />

        <div className="space-y-6">
          {Array.isArray(posts) && posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200
                           dark:border-gray-800 hover:shadow-lg hover:shadow-primary-500/5
                           dark:hover:shadow-primary-500/10 hover:border-primary-200
                           dark:hover:border-primary-800 transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3">
                  <Calendar size={14} />
                  <span>{t('blog.publishedOn')} {post.date}</span>
                  <div className="flex gap-1.5 ml-auto">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                  {t('blog.readMore')}
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
