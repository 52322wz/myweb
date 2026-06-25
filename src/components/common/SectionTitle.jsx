import { useTranslation } from 'react-i18next'

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
