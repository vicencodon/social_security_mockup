import React, { useState } from 'react'
import { Calendar, Clock, MapPin, User, Filter, Check, ArrowLeft, ChevronDown, Search } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface AppointmentBookingProps {
  onNavigate: (view: string) => void
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ onNavigate }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState('book')
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)
  const { t } = useLanguage()

  const specialties = [
    { key: 'general', label: t('booking.specialties.general') },
    { key: 'cardiology', label: t('booking.specialties.cardiology') },
    { key: 'dermatology', label: t('booking.specialties.dermatology') },
    { key: 'gynecology', label: t('booking.specialties.gynecology') },
    { key: 'pediatrics', label: t('booking.specialties.pediatrics') },
    { key: 'traumatology', label: t('booking.specialties.traumatology') },
    { key: 'ophthalmology', label: t('booking.specialties.ophthalmology') },
    { key: 'neurology', label: t('booking.specialties.neurology') }
  ]

  const locations = [
    'Centro de Salud Norte',
    'Centro de Salud Sur',
    'Hospital Universitario',
    'Clínica Especializada',
    'Centro Médico Central'
  ]

  const availableSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ]

  const myAppointments = [
    {
      id: 1,
      specialty: t('booking.specialties.general'),
      doctor: 'Dr. García López',
      date: '2025-01-15',
      time: '10:30',
      location: 'Centro de Salud Norte',
      status: 'confirmed'
    },
    {
      id: 2,
      specialty: t('booking.specialties.cardiology'),
      doctor: 'Dra. Martínez Ruiz',
      date: '2025-01-20',
      time: '16:00',
      location: 'Hospital Universitario',
      status: 'confirmed'
    }
  ]

  const doctors = [
    { name: 'Dr. García López', specialty: 'general' },
    { name: 'Dra. Martínez Ruiz', specialty: 'cardiology' },
    { name: 'Dr. Rodríguez Sánchez', specialty: 'dermatology' },
    { name: 'Dra. López Fernández', specialty: 'gynecology' }
  ]

  const handleBookAppointment = () => {
    setShowConfirmation(true)
  }

  const handleConfirmBooking = () => {
    setShowConfirmation(false)
    alert(t('booking.appointmentBooked'))
    onNavigate('dashboard')
  }

  if (showConfirmation) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
        <div className="card max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('booking.confirmAppointment')}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{t('booking.reviewDetails')}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Dr. García López</p>
                <p className="text-sm text-gray-600">{selectedSpecialty}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{selectedDate}</p>
                <p className="text-sm text-gray-600">{t('booking.appointmentDate')}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{selectedTime}</p>
                <p className="text-sm text-gray-600">{t('booking.appointmentTime')}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{selectedLocation}</p>
                <p className="text-sm text-gray-600">{t('booking.appointmentLocation')}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="btn-secondary flex-1 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('dashboard.modify')}
            </button>
            <button
              onClick={handleConfirmBooking}
              className="btn-primary flex-1"
            >
              {t('booking.confirmAppointment')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('nav.appointments')}</h1>
        <p className="text-gray-600 text-sm sm:text-base">{t('booking.subtitle')}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('book')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'book'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('booking.bookNew')}
        </button>
        <button
          onClick={() => setActiveTab('my')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'my'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('booking.myAppointments')}
        </button>
      </div>

      {activeTab === 'book' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="w-full card flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium text-gray-900">{t('booking.filters')}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isFiltersExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          <div className={`lg:col-span-1 ${isFiltersExpanded ? 'block' : 'hidden lg:block'}`}>
            <div className="card lg:sticky lg:top-20">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t('booking.filters')}</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.specialty')}
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="input-field"
                  >
                    <option value="">{t('booking.selectSpecialty')}</option>
                    {specialties.map((specialty) => (
                      <option key={specialty.key} value={specialty.label}>
                        {specialty.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.location')}
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="input-field"
                  >
                    <option value="">{t('booking.selectLocation')}</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.date')}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Available Slots */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">{t('booking.availableSlots')}</h2>
              
              {selectedSpecialty && selectedLocation && selectedDate ? (
                <div>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4 text-sm sm:text-base">
                      {selectedSpecialty} - {selectedLocation}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('booking.selectedDate')}: {selectedDate}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 min-h-[44px] ${
                          selectedTime === time
                            ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {selectedTime && (
                    <div className="border-t pt-6">
                      <h3 className="font-medium text-gray-900 mb-4 text-sm sm:text-base">{t('booking.availableProfessionals')}</h3>
                      <div className="space-y-3">
                        {doctors
                          .filter(doctor => {
                            const selectedSpecialtyKey = specialties.find(s => s.label === selectedSpecialty)?.key
                            return doctor.specialty === selectedSpecialtyKey
                          })
                          .map((doctor, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                  <User className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm sm:text-base">{doctor.name}</p>
                                  <p className="text-sm text-gray-600">{selectedSpecialty}</p>
                                </div>
                              </div>
                              <button
                                onClick={handleBookAppointment}
                                className="btn-primary text-sm px-4 py-2"
                              >
                                {t('booking.select')}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('booking.selectFilters')}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t('booking.completeFilters')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* My Appointments Tab */
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t('booking.myAppointments')}</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="input-field pl-10 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {myAppointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <User className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-900 text-sm sm:text-base">{appointment.doctor}</span>
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {t('telemedicine.confirmed')}
                      </span>
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

          {myAppointments.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('dashboard.noAppointments')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('dashboard.scheduleFirst')}
              </p>
              <button
                onClick={() => setActiveTab('book')}
                className="btn-primary"
              >
                {t('dashboard.bookAppointment')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AppointmentBooking