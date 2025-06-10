import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './components/LoginScreen'
import PatientDashboard from './components/PatientDashboard'
import AppointmentBooking from './components/AppointmentBooking'
import TelemedicineSession from './components/TelemedicineSession'
import AdminPanel from './components/AdminPanel'
import Navigation from './components/Navigation'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<'patient' | 'admin'>('patient')
  const [currentView, setCurrentView] = useState('login')

  const handleLogin = (role: 'patient' | 'admin') => {
    setIsAuthenticated(true)
    setUserRole(role)
    setCurrentView(role === 'admin' ? 'admin' : 'dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('login')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />
      case 'dashboard':
        return <PatientDashboard onNavigate={setCurrentView} />
      case 'booking':
        return <AppointmentBooking onNavigate={setCurrentView} />
      case 'telemedicine':
        return <TelemedicineSession onNavigate={setCurrentView} />
      case 'admin':
        return <AdminPanel onNavigate={setCurrentView} />
      default:
        return <PatientDashboard onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-medical-light">
      {isAuthenticated && (
        <Navigation 
          userRole={userRole} 
          currentView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />
      )}
      <main className={isAuthenticated ? 'pt-16' : ''}>
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default App