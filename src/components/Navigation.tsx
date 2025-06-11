import React, { useState } from 'react'
import { Home, Calendar, Video, FileText, Settings, LogOut, Users, Menu, X, Shield, Heart } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

interface NavigationProps {
  userRole: 'patient' | 'admin'
  currentView: string
  onNavigate: (view: string) => void
  onLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({ userRole, currentView, onNavigate, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const patientNavItems = [
    { id: 'dashboard', label: t('dashboard.welcome'), icon: Home },
    { id: 'booking', label: t('dashboard.myAppointments'), icon: Calendar },
    { id: 'telemedicine', label: t('dashboard.telemedicine'), icon: Video },
    { id: 'history', label: t('dashboard.medicalHistory'), icon: FileText },
  ]

  const adminNavItems = [
    { id: 'admin', label: t('admin.title'), icon: Users },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ]

  const navItems = userRole === 'admin' ? adminNavItems : patientNavItems

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                <div className="absolute inset-0 bg-white opacity-10 rounded-xl"></div>
                <div className="relative flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white absolute -translate-x-0.5" />
                  <Heart className="w-3 h-3 text-white absolute translate-x-0.5 translate-y-0.5" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">
                  {t('login.title')}
                </span>
                <div className="text-xs text-gray-500 -mt-1">
                  Portal Digital
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation Items */}
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] ${
                      currentView === item.id
                        ? 'bg-primary-100 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
              
              <button
                onClick={onLogout}
                className="hidden md:flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 min-h-[44px]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">{t('common.logout')}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] ${
                      currentView === item.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                )
              })}
              
              <div className="pt-3 border-t border-gray-200">
                <div className="mb-3">
                  <LanguageSelector className="w-full" />
                </div>
                <button
                  onClick={() => {
                    onLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 min-h-[44px]"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  {t('common.logout')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation (for patients) */}
      {userRole === 'patient' && (
        <div className="mobile-nav md:hidden">
          <div className="grid grid-cols-4 h-16">
            {patientNavItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`mobile-nav-item ${currentView === item.id ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs leading-tight">{item.label.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation