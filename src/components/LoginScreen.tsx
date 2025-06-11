import React, { useState } from 'react'
import { Eye, EyeOff, Shield, Heart, Users } from 'lucide-react'
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
          {/* Enhanced Logo and Branding */}
          <div className="text-center mb-8">
            <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="absolute inset-0 bg-white opacity-10 rounded-2xl"></div>
              <div className="relative flex items-center justify-center">
                <Shield className="w-8 h-8 text-white absolute -translate-x-1" />
                <Heart className="w-6 h-6 text-white absolute translate-x-1 translate-y-1" />
                <Users className="w-4 h-4 text-white absolute translate-x-2 -translate-y-2 opacity-80" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('login.title')}</h1>
            <p className="text-gray-600 text-sm sm:text-base">{t('login.subtitle')}</p>
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
                autoComplete="username"
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
                  className="input-field pr-12"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center min-w-[44px] min-h-[44px] justify-center"
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
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  {t('login.loggingIn')}
                </>
              ) : (
                t('common.login')
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium min-h-[44px] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {t('login.forgotPassword')}
              </button>
            </div>
          </form>

          {/* Demo Information */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 leading-relaxed">{t('login.demo')}</p>
          </div>

          {/* GDPR Notice */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 leading-relaxed">{t('login.gdpr')}</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              <span>SSL Seguro</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              <span>GDPR</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen