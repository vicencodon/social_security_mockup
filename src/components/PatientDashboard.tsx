import React from 'react'
import { Calendar, Video, FileText, Bell, Clock, MapPin, User, Plus, ArrowRight } from 'lucide-react'
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

      {/* Quick Actions - Mobile Optimized Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <button
          onClick={() => onNavigate('booking')}
          className="card hover:shadow-lg transition-all duration-200 text-left group p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary-50 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary-500 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">{t('dashboard.bookAppointment')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.bookAppointmentDesc')}</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('appointments')}
          className="card hover:shadow-lg transition-all duration-200 text-left group p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-green-500 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">{t('dashboard.myAppointments')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.myAppointmentsDesc')}</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('telemedicine')}
          className="card hover:shadow-lg transition-all duration-200 text-left group p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-purple-500 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">{t('dashboard.telemedicine')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.telemedicineDesc')}</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('history')}
          className="card hover:shadow-lg transition-all duration-200 text-left group p-4 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-orange-500 transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">{t('dashboard.medicalHistory')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.medicalHistoryDesc')}</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t('dashboard.upcomingAppointments')}</h2>
              <button
                onClick={() => onNavigate('appointments')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium min-h-[44px] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {t('dashboard.viewAll')}
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
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ml-4">
                      <button className="btn-secondary text-xs px-3 py-2">{t('dashboard.modify')}</button>
                      <button className="text-red-600 hover:text-red-700 text-xs font-medium px-3 py-2 rounded min-h-[36px]">{t('common.cancel')}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Book Button - Sticky on Mobile */}
            <div className="mt-6">
              <button
                onClick={() => onNavigate('booking')}
                className="w-full sm:w-auto btn-primary flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('dashboard.bookAppointment')}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
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
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard