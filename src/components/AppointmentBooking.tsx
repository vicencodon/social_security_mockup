import React, { useState } from 'react'
import { Calendar, Clock, MapPin, User, Filter, Check } from 'lucide-react'

interface AppointmentBookingProps {
  onNavigate: (view: string) => void
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ onNavigate }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const specialties = [
    'Medicina General',
    'Cardiología',
    'Dermatología',
    'Ginecología',
    'Pediatría',
    'Traumatología',
    'Oftalmología',
    'Neurología'
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

  const doctors = [
    { name: 'Dr. García López', specialty: 'Medicina General' },
    { name: 'Dra. Martínez Ruiz', specialty: 'Cardiología' },
    { name: 'Dr. Rodríguez Sánchez', specialty: 'Dermatología' },
    { name: 'Dra. López Fernández', specialty: 'Ginecología' }
  ]

  const handleBookAppointment = () => {
    setShowConfirmation(true)
  }

  const handleConfirmBooking = () => {
    setShowConfirmation(false)
    // Show success message and redirect
    alert('Cita reservada con éxito. Recibirá confirmación por SMS y email.')
    onNavigate('dashboard')
  }

  if (showConfirmation) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmar Cita</h2>
            <p className="text-gray-600">Por favor, revise los detalles de su cita</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Dr. García López</p>
                <p className="text-sm text-gray-600">{selectedSpecialty}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{selectedDate}</p>
                <p className="text-sm text-gray-600">Fecha de la cita</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{selectedTime}</p>
                <p className="text-sm text-gray-600">Hora de la cita</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{selectedLocation}</p>
                <p className="text-sm text-gray-600">Ubicación</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="btn-secondary flex-1"
            >
              Modificar
            </button>
            <button
              onClick={handleConfirmBooking}
              className="btn-primary flex-1"
            >
              Confirmar Cita
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservar Cita</h1>
        <p className="text-gray-600">Seleccione la especialidad, ubicación y horario preferido</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <div className="flex items-center mb-6">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidad
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="input-field"
                >
                  <option value="">Seleccionar especialidad</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="input-field"
                >
                  <option value="">Seleccionar ubicación</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Horarios Disponibles</h2>
            
            {selectedSpecialty && selectedLocation && selectedDate ? (
              <div>
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    {selectedSpecialty} - {selectedLocation}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Fecha seleccionada: {selectedDate}
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {selectedTime && (
                  <div className="border-t pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">Profesionales Disponibles</h3>
                    <div className="space-y-3">
                      {doctors
                        .filter(doctor => doctor.specialty === selectedSpecialty)
                        .map((doctor, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <User className="w-5 h-5 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{doctor.name}</p>
                                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                              </div>
                            </div>
                            <button
                              onClick={handleBookAppointment}
                              className="btn-primary"
                            >
                              Seleccionar
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
                  Seleccione los filtros
                </h3>
                <p className="text-gray-600">
                  Complete la especialidad, ubicación y fecha para ver los horarios disponibles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentBooking