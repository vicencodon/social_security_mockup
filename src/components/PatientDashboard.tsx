import React from 'react'
import { Calendar, Video, FileText, Bell, Clock, MapPin, User, Plus, TrendingUp, Activity, Heart } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface PatientDashboardProps {
  onNavigate: (view: string) => void
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onNavigate }) => {
  const { t } = useLanguage()

  const upcomingAppointments = [
    {
      id: 1,
      specialty: t('booking.specialties.general'),
      doctor: 'Dr. García López',
      date: '2025-01-15',
      time: '10:30',
      location: 'Centro de Salud Norte'
    },
    {
      id: 2,
      specialty: t('booking.specialties.cardiology'),
      doctor: 'Dra. Martínez Ruiz',
      date: '2025-01-20',
      time: '16:00',
      location: 'Hospital Universitario'
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'reminder',
      message: t('dashboard.reminderAppointment').replace('{doctor}', 'Dr. García López').replace('{time}', '10:30'),
      time: '2 horas'
    },
    {
      id: 2,
      type: 'result',
      message: t('dashboard.resultsAvailable'),
      time: '1 día'
    }
  ]

  const healthStats = [
    {
      label: t('dashboard.nextAppointment'),
      value: 'Mañana 10:30',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: t('dashboard.pendingResults'),
      value: '2',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: t('dashboard.lastVisit'),
      value: '5 días',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome')}, María González
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          {t('dashboard.healthCard')}: 12345678A
        </p>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {healthStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mr-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t('dashboard.upcomingAppointments')}</h2>
              <button
                onClick={() => onNavigate('booking')}
                className="btn-primary text-sm px-4 py-2 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('dashboard.bookNew')}
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-900 text-sm sm:text-base">{appointment.doctor}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{appointment.date} - {appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <button className="btn-secondary text-xs px-3 py-2">{t('dashboard.modify')}</button>
                      <button className="text-red-600 hover:text-red-700 text-xs font-medium px-3 py-2 rounded min-h-[36px]">{t('common.cancel')}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {upcomingAppointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('dashboard.noAppointments')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('dashboard.scheduleFirst')}
                </p>
                <button
                  onClick={() => onNavigate('booking')}
                  className="btn-primary"
                >
                  {t('dashboard.bookAppointment')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications & Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Bell className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t('dashboard.notifications')}</h2>
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification p-4 rounded-lg">
                  <p className="text-sm text-gray-800 mb-2 leading-relaxed">{notification.message}</p>
                  <p className="text-xs text-gray-500">Hace {notification.time}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium min-h-[44px] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              {t('dashboard.viewAllNotifications')}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.quickActions')}</h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('telemedicine')}
                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                <Video className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{t('dashboard.telemedicine')}</p>
                  <p className="text-xs text-gray-600">{t('dashboard.virtualConsultation')}</p>
                </div>
              </button>
              
              <button
                onClick={() => onNavigate('records')}
                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                <FileText className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{t('dashboard.medicalHistory')}</p>
                  <p className="text-xs text-gray-600">{t('dashboard.viewRecords')}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard