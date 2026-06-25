import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ExternalLink, Code } from 'lucide-react'
import SectionTitle from '../common/SectionTitle.jsx'

export default function Projects() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true })

  return (
    <section id="projects" className="section-padding bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <div className="grid md:grid-cols-2 gap-8">
          {Array.isArray(projects) && projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200
                         dark:border-gray-800 hover:shadow-xl hover:shadow-primary-500/5
                         dark:hover:shadow-primary-500/10 hover:border-primary-200 dark:hover:border-primary-800
                         transition-all"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 gap-2">
                  <a
                    href="#"
                    className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                    title={t('projects.viewProject')}
                  >
                    <ExternalLink size={18} className="text-gray-800" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                    title={t('projects.viewCode')}
                  >
                    <Code size={18} className="text-gray-800" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-950/50 text-primary-700
                                 dark:text-primary-300 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
