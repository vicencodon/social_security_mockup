import React, { useState } from 'react'
import { Video, FileText, Clock, User, Phone, MessageSquare, Camera, Mic } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface TelemedicineSessionProps {
  onNavigate: (view: string) => void
}

const TelemedicineSession: React.FC<TelemedicineSessionProps> = ({ onNavigate }) => {
  const [showPreVisitForm, setShowPreVisitForm] = useState(false)
  const [formData, setFormData] = useState({
    symptoms: '',
    duration: '',
    medications: '',
    allergies: '',
    additionalInfo: ''
  })
  const { t } = useLanguage()

  const upcomingSession = {
    id: 1,
    doctor: 'Dr. García López',
    specialty: t('booking.specialties.general'),
    date: '2025-01-15',
    time: '10:30',
    duration: '30 min',
    sessionId: 'TM-2025-001'
  }

  const recentRecords = [
    {
      id: 1,
      type: 'Análisis de Sangre',
      date: '2025-01-10',
      result: 'Normal'
    },
    {
      id: 2,
      type: 'Electrocardiograma',
      date: '2025-01-05',
      result: 'Normal'
    },
    {
      id: 3,
      type: 'Radiografía Tórax',
      date: '2024-12-20',
      result: 'Sin alteraciones'
    }
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPreVisitForm(false)
    alert(t('telemedicine.formSubmitted'))
  }

  const handleJoinCall = () => {
    alert(t('telemedicine.connectingCall'))
  }

  if (showPreVisitForm) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('telemedicine.preVisitFormTitle')}</h2>
            <p className="text-gray-600">
              {t('telemedicine.preVisitFormDesc')}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('telemedicine.mainSymptoms')}
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                className="input-field h-24 resize-none"
                placeholder={t('telemedicine.symptomsPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('telemedicine.symptomsDuration')}
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="input-field"
                required
              >
                <option value="">{t('telemedicine.selectDuration')}</option>
                <option value="1-2 días">1-2 días</option>
                <option value="3-7 días">3-7 días</option>
                <option value="1-2 semanas">1-2 semanas</option>
                <option value="Más de 2 semanas">Más de 2 semanas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('telemedicine.currentMedications')}
              </label>
              <textarea
                value={formData.medications}
                onChange={(e) => setFormData({...formData, medications: e.target.value})}
                className="input-field h-20 resize-none"
                placeholder={t('telemedicine.medicationsPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('telemedicine.knownAllergies')}
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                className="input-field"
                placeholder={t('telemedicine.allergiesPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('telemedicine.additionalInfo')}
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                className="input-field h-20 resize-none"
                placeholder={t('telemedicine.additionalInfoPlaceholder')}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowPreVisitForm(false)}
                className="btn-secondary flex-1"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                {t('common.save')}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('telemedicine.title')}</h1>
        <p className="text-gray-600">{t('telemedicine.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Session Details */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{t('telemedicine.nextConsultation')}</h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {t('telemedicine.confirmed')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <User className="w-8 h-8 text-primary-500 mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">{upcomingSession.doctor}</p>
                  <p className="text-sm text-gray-600">{upcomingSession.specialty}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-8 h-8 text-primary-500 mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {upcomingSession.date} - {upcomingSession.time}
                  </p>
                  <p className="text-sm text-gray-600">{t('telemedicine.duration')}: {upcomingSession.duration}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleJoinCall}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Video className="w-6 h-6 mr-3" />
                {t('telemedicine.joinVideoCall')}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowPreVisitForm(true)}
                  className="btn-secondary flex items-center justify-center"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {t('telemedicine.preVisitForm')}
                </button>

                <button className="btn-secondary flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  {t('telemedicine.audioCall')}
                </button>
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">{t('telemedicine.technicalRequirements')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-800">
                <div className="flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  <span>{t('telemedicine.workingCamera')}</span>
                </div>
                <div className="flex items-center">
                  <Mic className="w-4 h-4 mr-2" />
                  <span>{t('telemedicine.activeMicrophone')}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>{t('telemedicine.stableConnection')}</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  <span>{t('telemedicine.updatedBrowser')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Instructions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('telemedicine.instructions')}</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</span>
                <p>{t('telemedicine.joinEarly')}</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</span>
                <p>{t('telemedicine.quietPlace')}</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</span>
                <p>{t('telemedicine.documents')}</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">4</span>
                <p>{t('telemedicine.completeForm')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Records */}
        <div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('telemedicine.recentHistory')}</h3>
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{record.type}</p>
                      <p className="text-xs text-gray-500 mt-1">{record.date}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {record.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onNavigate('history')}
              className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {t('telemedicine.viewFullHistory')}
            </button>
          </div>

          {/* Contact Information */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('telemedicine.contactInfo')}</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">{t('telemedicine.technicalSupport')}</p>
                <p className="text-gray-600">900 123 456</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('telemedicine.emergencies')}</p>
                <p className="text-gray-600">112</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('telemedicine.sessionId')}</p>
                <p className="text-gray-600 font-mono">{upcomingSession.sessionId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TelemedicineSession