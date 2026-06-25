import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, Briefcase } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-to-br from-white via-primary-50/30 to-white
                 dark:from-gray-950 dark:via-primary-950/20 dark:to-gray-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Avatar */}
          <div className="mb-8">
            <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-purple-500 p-1 shadow-xl shadow-primary-500/20">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                <span className="bg-gradient-to-br from-primary-500 to-purple-600 w-full h-full flex items-center justify-center">
                  {t('hero.name').charAt(0)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-primary-600 dark:text-primary-400 font-medium mb-3 text-lg">
            {t('hero.greeting')}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            {t('hero.name')}
          </h1>

          <div className="inline-block mb-6 px-4 py-1.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            {t('hero.title')}
          </div>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700
                         text-white font-medium rounded-xl transition-all shadow-lg shadow-primary-500/25
                         hover:shadow-xl hover:shadow-primary-500/30 active:scale-95"
            >
              <Briefcase size={18} />
              {t('hero.cta.projects')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600
                         text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all
                         hover:border-primary-400 dark:hover:border-primary-500
                         hover:text-primary-600 dark:hover:text-primary-400 active:scale-95"
            >
              <Mail size={18} />
              {t('hero.cta.contact')}
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollTo('about')}
            className="animate-bounce text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
