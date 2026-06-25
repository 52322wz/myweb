import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageSwitch() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('zh') ? 'zh' : 'en'

  const toggle = () => {
    const next = currentLang === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(next)
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-colors"
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span>{currentLang === 'zh' ? 'EN' : '中文'}</span>
    </button>
  )
}
