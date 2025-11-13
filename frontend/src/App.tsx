import { useState, useEffect } from 'react'
import './App.css'

// For development/demo - update with your actual backend URL
const API_URL = 'http://localhost:8000'

interface HealthStatus {
  status: string
  timestamp: string
  uptime_seconds: number
  health_score: number
  services: {
    vehicle_detector: boolean
    traffic_manager: boolean
    analytics: boolean
  }
  version: string
}

function App() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch(`${API_URL}/health`)
        const data = await response.json()
        setHealthStatus(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to connect to backend')
        setLoading(false)
      }
    }

    fetchHealth()
    const interval = setInterval(fetchHealth, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚦 AI Traffic Management System</h1>
        <p className="subtitle">Real-time Vehicle Detection & Adaptive Signal Control</p>
        <p className="api-info">Demo Mode - Connect to your backend</p>
      </header>

      <main className="container">
        {loading && <div className="loading">Loading system status...</div>}
        
        {error && (
          <div className="error-card">
            <h2>❌ Connection Error</h2>
            <p>{error}</p>
            <p className="hint">Start your backend locally with: cd backend && python -m uvicorn app.main:app --reload</p>
          </div>
        )}

        {healthStatus && (
          <>
            <div className={`status-card ${healthStatus.status}`}>
              <h2>System Status: {healthStatus.status.toUpperCase()}</h2>
              <div className="status-grid">
                <div className="status-item">
                  <span className="label">Health Score:</span>
                  <span className="value">{(healthStatus.health_score * 100).toFixed(0)}%</span>
                </div>
                <div className="status-item">
                  <span className="label">Uptime:</span>
                  <span className="value">{Math.floor(healthStatus.uptime_seconds / 60)} minutes</span>
                </div>
                <div className="status-item">
                  <span className="label">Version:</span>
                  <span className="value">{healthStatus.version}</span>
                </div>
              </div>
            </div>

            <div className="services-card">
              <h2>Services Status</h2>
              <div className="services-grid">
                <div className={`service ${healthStatus.services.vehicle_detector ? 'active' : 'inactive'}`}>
                  <span className="icon">{healthStatus.services.vehicle_detector ? '✅' : '❌'}</span>
                  <span className="name">Vehicle Detector (YOLOv8)</span>
                </div>
                <div className={`service ${healthStatus.services.traffic_manager ? 'active' : 'inactive'}`}>
                  <span className="icon">{healthStatus.services.traffic_manager ? '✅' : '❌'}</span>
                  <span className="name">Traffic Manager</span>
                </div>
                <div className={`service ${healthStatus.services.analytics ? 'active' : 'inactive'}`}>
                  <span className="icon">{healthStatus.services.analytics ? '✅' : '❌'}</span>
                  <span className="name">Analytics Service</span>
                </div>
              </div>
            </div>

            <div className="api-links">
              <h2>API Resources</h2>
              <div className="links-grid">
                <a href={`${API_URL}/docs`} target="_blank" rel="noopener noreferrer" className="api-link">
                  📚 API Documentation (Swagger)
                </a>
                <a href={`${API_URL}/health`} target="_blank" rel="noopener noreferrer" className="api-link">
                  ❤️ Health Check
                </a>
                <a href={`${API_URL}/system/info`} target="_blank" rel="noopener noreferrer" className="api-link">
                  ℹ️ System Information
                </a>
                <a href={`${API_URL}/metrics`} target="_blank" rel="noopener noreferrer" className="api-link">
                  📊 Metrics (Prometheus)
                </a>
              </div>
            </div>

            <div className="info-card">
              <h3>🎯 Quick Start</h3>
              <ol>
                <li>Use the API Documentation to explore available endpoints</li>
                <li>Upload a traffic intersection image via the <code>/api/detect-vehicles</code> endpoint</li>
                <li>Monitor real-time traffic signals at <code>/api/intersection-status</code></li>
                <li>View analytics at <code>/api/analytics/summary</code></li>
              </ol>
            </div>
          </>
        )}
      </main>

      <footer className="footer">
        <p>Powered by YOLOv8, FastAPI, and React - Deployed on Vercel</p>
        <p className="copyright">© 2025 AI Traffic Management System</p>
      </footer>
    </div>
  )
}

export default App
