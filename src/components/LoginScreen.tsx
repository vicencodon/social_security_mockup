import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

interface LoginScreenProps {
  onLogin: (role: 'patient' | 'admin') => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [healthId, setHealthId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo logic: admin if healthId starts with 'admin'
    const role = healthId.toLowerCase().startsWith('admin') ? 'admin' : 'patient'
    onLogin(role)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 px-4">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <LanguageSelector />
        </div>

        {/* Login Card */}
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">SNS</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('login.title')}</h1>
            <p className="text-gray-600">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="healthId" className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.healthId')}
              </label>
              <input
                type="text"
                id="healthId"
                value={healthId}
                onChange={(e) => setHealthId(e.target.value)}
                className="input-field"
                placeholder="12345678A"
                required
                aria-describedby="healthId-help"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('login.loggingIn') : t('common.login')}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {t('login.forgotPassword')}
              </button>
            </div>
          </form>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">{t('login.demo')}</p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">{t('login.gdpr')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen