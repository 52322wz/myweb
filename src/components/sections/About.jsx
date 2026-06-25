import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import SectionTitle from '../common/SectionTitle.jsx'

function TimelineItem({ icon: Icon, title, subtitle, period, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[15px] top-2 bottom-0 w-px bg-gray-200 dark:bg-gray-700 last:hidden" />
      {/* Icon */}
      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
        <Icon size={16} className="text-primary-600 dark:text-primary-400" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">{subtitle}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-2">{period}</p>
        {desc && <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>}
      </div>
    </motion.div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const jobs = t('about.jobs', { returnObjects: true })
  const schools = t('about.schools', { returnObjects: true })

  return (
    <section id="about" className="section-padding bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title={t('about.title')} subtitle={t('about.subtitle')} />

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-16"
        >
          {t('about.bio')}
        </motion.p>

        {/* Experience & Education columns */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Experience */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
              <Briefcase size={22} className="text-primary-500" />
              {t('about.experience')}
            </h3>
            {Array.isArray(jobs) && jobs.map((job, i) => (
              <TimelineItem
                key={i}
                icon={Briefcase}
                title={job.role}
                subtitle={job.company}
                period={job.period}
                desc={job.desc}
                index={i}
              />
            ))}
          </div>

          {/* Education */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
              <GraduationCap size={22} className="text-primary-500" />
              {t('about.education')}
            </h3>
            {Array.isArray(schools) && schools.map((school, i) => (
              <TimelineItem
                key={i}
                icon={GraduationCap}
                title={school.degree}
                subtitle={school.school}
                period={school.period}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
