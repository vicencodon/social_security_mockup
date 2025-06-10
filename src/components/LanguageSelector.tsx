import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Language } from '../types/language'

interface LanguageSelectorProps {
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'pl' as Language, name: 'Polski', flag: '🇵🇱' }
  ]

  return (
    <div className={`flex items-center bg-white rounded-lg shadow-sm p-1 ${className}`}>
      <Globe className="w-4 h-4 text-gray-500 mr-2 ml-2" />
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors ${
            language === lang.code 
              ? 'bg-primary-500 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.name}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector