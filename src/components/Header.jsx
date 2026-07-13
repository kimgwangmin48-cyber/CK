import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">☀️</span>
          <span className="text-lg font-bold tracking-tight text-slate-900">SolarCare Agent</span>
        </div>
        <nav className="flex gap-1">
          <NavLink to="/" end className={linkClass}>
            대시보드
          </NavLink>
          <NavLink to="/history" className={linkClass}>
            발전 이력
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
