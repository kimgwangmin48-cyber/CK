import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </div>
  )
}
