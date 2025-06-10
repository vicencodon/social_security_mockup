import React from 'react'
import { Calendar, Video, FileText, Bell, Clock, MapPin, User } from 'lucide-react'

interface PatientDashboardProps {
  onNavigate: (view: string) => void
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onNavigate }) => {
  const upcomingAppointments = [
    {
      id: 1,
      specialty: 'Medicina General',
      doctor: 'Dr. García López',
      date: '2025-01-15',
      time: '10:30',
      location: 'Centro de Salud Norte'
    },
    {
      id: 2,
      specialty: 'Cardiología',
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
      message: 'Recordatorio: Cita con Dr. García López mañana a las 10:30',
      time: '2 horas'
    },
    {
      id: 2,
      type: 'result',
      message: 'Resultados de análisis disponibles',
      time: '1 día'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenido, María González
        </h1>
        <p className="text-gray-600">
          Tarjeta Sanitaria: 12345678A
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => onNavigate('booking')}
          className="card hover:shadow-lg transition-shadow duration-200 text-left group"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Pedir Cita</h3>
              <p className="text-sm text-gray-600">Reservar nueva cita</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('appointments')}
          className="card hover:shadow-lg transition-shadow duration-200 text-left group"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Mis Citas</h3>
              <p className="text-sm text-gray-600">Ver citas programadas</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('telemedicine')}
          className="card hover:shadow-lg transition-shadow duration-200 text-left group"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Teleconsulta</h3>
              <p className="text-sm text-gray-600">Consulta virtual</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('history')}
          className="card hover:shadow-lg transition-shadow duration-200 text-left group"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">Historial Médico</h3>
              <p className="text-sm text-gray-600">Ver historial completo</p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Próximas Citas</h2>
              <button
                onClick={() => onNavigate('appointments')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Ver todas
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-900">{appointment.doctor}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{appointment.specialty}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="mr-4">{appointment.date} - {appointment.time}</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs">Modificar</button>
                      <button className="text-red-600 hover:text-red-700 text-xs font-medium">Cancelar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="card">
            <div className="flex items-center mb-6">
              <Bell className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification">
                  <p className="text-sm text-gray-800 mb-1">{notification.message}</p>
                  <p className="text-xs text-gray-500">Hace {notification.time}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard