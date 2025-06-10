import React from 'react'
import { Home, Calendar, Video, FileText, Settings, LogOut, Users } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

interface NavigationProps {
  userRole: 'patient' | 'admin'
  currentView: string
  onNavigate: (view: string) => void
  onLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({ userRole, currentView, onNavigate, onLogout }) => {
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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SNS</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                {t('login.title')}
              </span>
            </div>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === item.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('common.logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation