import React, { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Language } from '../types/language'

interface LanguageSelectorProps {
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'pl' as Language, name: 'Polski', flag: '🇵🇱' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 text-gray-500 mr-2" />
        <span className="mr-1">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-10 md:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors min-h-[44px] ${
                    language === lang.code 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{lang.flag}</span>
                  {lang.name}
                  {language === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSelector