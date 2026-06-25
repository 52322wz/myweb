import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionTitle from '../common/SectionTitle.jsx'

const CATEGORIES = ['frontend', 'backend', 'tools', 'other']

export default function Skills() {
  const { t } = useTranslation()
  const allItems = t('skills.items', { returnObjects: true })

  // Split items roughly by category
  const itemsPerCat = Math.ceil(allItems.length / CATEGORIES.length)
  const categorized = CATEGORIES.map((cat, i) => ({
    key: cat,
    items: allItems.slice(i * itemsPerCat, (i + 1) * itemsPerCat),
  }))

  return (
    <section id="skills" className="section-padding transition-colors">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorized.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800
                         hover:shadow-lg hover:shadow-primary-500/5 dark:hover:shadow-primary-500/10
                         hover:border-primary-200 dark:hover:border-primary-800 transition-all"
            >
              <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-4">
                {t(`skills.categories.${cat.key}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, si) => (
                  <span
                    key={si}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                               rounded-lg text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30
                               hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
