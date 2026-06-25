import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Code, Briefcase, AtSign, Send } from 'lucide-react'
import SectionTitle from '../common/SectionTitle.jsx'

const contactInfo = [
  { icon: Mail, key: 'email', valueKey: 'emailValue', href: 'mailto:' },
  { icon: Phone, key: 'phone', valueKey: 'phoneValue', href: 'tel:' },
  { icon: MapPin, key: 'location', valueKey: 'locationValue' },
]

const socialLinks = [
  { icon: Code, key: 'github', href: 'https://github.com' },
  { icon: Briefcase, key: 'linkedin', href: 'https://linkedin.com' },
  { icon: AtSign, key: 'twitter', href: 'https://twitter.com' },
]

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder - in real project, send to API
    console.log('Form submitted:', form)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="section-padding bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            {contactInfo.map(({ icon: Icon, key, valueKey, href }) => (
              <div key={key} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-0.5">{t(`contact.${key}`)}</p>
                  {href ? (
                    <a href={`${href}${t(`contact.${valueKey}`)}`} className="text-gray-900 dark:text-white font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {t(`contact.${valueKey}`)}
                    </a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{t(`contact.${valueKey}`)}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map(({ icon: Icon, key, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center
                             text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/40
                             hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={t(`contact.${key}`)}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={t('contact.form.placeholderName')}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
                           rounded-xl text-gray-900 dark:text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                           transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={t('contact.form.placeholderEmail')}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
                           rounded-xl text-gray-900 dark:text-white placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                           transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t('contact.form.message')}
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder={t('contact.form.placeholderMessage')}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
                           rounded-xl text-gray-900 dark:text-white placeholder-gray-400 resize-none
                           focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                           transition-colors"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700
                         text-white font-medium rounded-xl transition-all shadow-lg shadow-primary-500/25
                         hover:shadow-xl hover:shadow-primary-500/30 active:scale-95 disabled:opacity-50"
            >
              <Send size={18} />
              {sent ? '✓ Sent!' : t('contact.form.send')}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
