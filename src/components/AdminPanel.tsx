import React, { useState } from 'react'
import { Users, Calendar, TrendingUp, AlertTriangle, Clock, CheckCircle, XCircle, Edit, Trash2, Filter } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface AdminPanelProps {
  onNavigate: (view: string) => void
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const { t } = useLanguage()

  const waitingList = [
    {
      id: 1,
      patientName: 'María García López',
      healthId: '12345678A',
      specialty: t('booking.specialties.cardiology'),
      urgency: 'high',
      urgencyScore: 85,
      requestDate: '2025-01-10',
      estimatedWait: '3-5 días',
      symptoms: 'Dolor en el pecho, dificultad respiratoria'
    },
    {
      id: 2,
      patientName: 'Juan Martínez Ruiz',
      healthId: '87654321B',
      specialty: t('booking.specialties.traumatology'),
      urgency: 'medium',
      urgencyScore: 65,
      requestDate: '2025-01-12',
      estimatedWait: '1-2 semanas',
      symptoms: 'Dolor en rodilla tras caída'
    },
    {
      id: 3,
      patientName: 'Ana Rodríguez Sánchez',
      healthId: '11223344C',
      specialty: t('booking.specialties.dermatology'),
      urgency: 'low',
      urgencyScore: 35,
      requestDate: '2025-01-14',
      estimatedWait: '3-4 semanas',
      symptoms: 'Revisión lunar en brazo'
    },
    {
      id: 4,
      patientName: 'Carlos López Fernández',
      healthId: '55667788D',
      specialty: t('booking.specialties.cardiology'),
      urgency: 'high',
      urgencyScore: 92,
      requestDate: '2025-01-13',
      estimatedWait: '1-2 días',
      symptoms: 'Hipertensión severa, mareos frecuentes'
    }
  ]

  const kpis = [
    {
      title: t('admin.waitingListPatients'),
      value: '1,247',
      change: '+5.2%',
      trend: 'up',
      icon: Users
    },
    {
      title: t('admin.averageWaitTime'),
      value: '12 días',
      change: '-2.1%',
      trend: 'down',
      icon: Clock
    },
    {
      title: t('admin.noShowRate'),
      value: '8.3%',
      change: '+1.2%',
      trend: 'up',
      icon: XCircle
    },
    {
      title: t('admin.completedToday'),
      value: '156',
      change: '+12.5%',
      trend: 'up',
      icon: CheckCircle
    }
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high': return t('admin.high')
      case 'medium': return t('admin.medium')
      case 'low': return t('admin.low')
      default: return 'Normal'
    }
  }

  const filteredWaitingList = waitingList.filter(patient => {
    if (selectedFilter === 'all') return true
    return patient.urgency === selectedFilter
  })

  const handleAssignSlot = (patientId: number) => {
    alert(t('admin.assigningSlot'))
  }

  const handleEditPatient = (patient: any) => {
    setSelectedPatient(patient)
    setShowEditModal(true)
  }

  const handleDeletePatient = (patientId: number) => {
    if (confirm(t('admin.confirmDelete'))) {
      alert(t('admin.patientDeleted'))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('admin.title')}</h1>
        <p className="text-gray-600">{t('admin.subtitle')}</p>
      </div>

      {/* KPIs Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Waiting List Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">{t('admin.priorityWaitingList')}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-gray-500 mr-2" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="input-field text-sm"
              >
                <option value="all">{t('admin.allUrgencies')}</option>
                <option value="high">{t('admin.highUrgency')}</option>
                <option value="medium">{t('admin.mediumUrgency')}</option>
                <option value="low">{t('admin.lowUrgency')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.patient')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.specialty')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.urgency')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.aiScore')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.estimatedTime')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWaitingList.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {patient.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.healthId}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {t('admin.requested')}: {patient.requestDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.specialty}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {patient.symptoms}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getUrgencyColor(patient.urgency)}`}>
                      {getUrgencyLabel(patient.urgency)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.urgencyScore}/100
                      </div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            patient.urgencyScore >= 80 ? 'bg-red-500' :
                            patient.urgencyScore >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${patient.urgencyScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.estimatedWait}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleAssignSlot(patient.id)}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                      {t('admin.assignAppointment')}
                    </button>
                    <button
                      onClick={() => handleEditPatient(patient)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredWaitingList.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('admin.noPatientsCategory')}
            </h3>
            <p className="text-gray-600">
              {t('admin.selectDifferentFilter')}
            </p>
          </div>
        )}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.performanceBySpecialty')}</h3>
          <div className="space-y-4">
            {[
              { specialty: t('booking.specialties.cardiology'), waiting: 45, avgWait: '8 días' },
              { specialty: t('booking.specialties.traumatology'), waiting: 32, avgWait: '12 días' },
              { specialty: t('booking.specialties.dermatology'), waiting: 28, avgWait: '18 días' },
              { specialty: t('booking.specialties.gynecology'), waiting: 22, avgWait: '15 días' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.specialty}</p>
                  <p className="text-sm text-gray-600">{item.waiting} {t('admin.patientsWaiting')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.avgWait}</p>
                  <p className="text-xs text-gray-500">{t('admin.averageTime')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.systemAlerts')}</h3>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">
                  {t('admin.criticalWaitingList')}
                </p>
                <p className="text-xs text-red-700 mt-1">
                  15 {t('admin.criticalPatientsWaiting')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  {t('admin.noShowIncrease')}
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  {t('admin.noShowIncreaseDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  {t('admin.waitTimeGoalMet')}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  {t('admin.waitTimeReduction')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('admin.editPatient')}: {selectedPatient.patientName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.urgencyLevel')}
                </label>
                <select className="input-field">
                  <option value="high">{t('admin.high')}</option>
                  <option value="medium">{t('admin.medium')}</option>
                  <option value="low">{t('admin.low')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.additionalNotes')}
                </label>
                <textarea className="input-field h-20 resize-none" placeholder={t('admin.addNotes')}></textarea>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-secondary flex-1"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  alert(t('admin.changesSaved'))
                }}
                className="btn-primary flex-1"
              >
                {t('admin.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel