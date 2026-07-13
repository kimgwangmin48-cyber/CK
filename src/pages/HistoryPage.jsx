import { useState } from 'react'
import SeverityBadge from '../components/SeverityBadge.jsx'
import { generationLog } from '../data/mockData.js'

const FILTERS = ['전체', '주의', '경고', '이상']

export default function HistoryPage() {
  const [filter, setFilter] = useState('전체')

  const rows = [...generationLog].reverse().filter((d) => filter === '전체' || d.severity === filter)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">발전 이력</h1>
      <p className="mt-1 text-sm text-slate-500">일별 예측 발전량과 실제 발전량을 비교해 점검 우선순위를 확인하세요.</p>

      <div className="mt-4 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">날짜</th>
              <th className="px-4 py-3 font-medium">예측</th>
              <th className="px-4 py-3 font-medium">실제</th>
              <th className="px-4 py-3 font-medium">부족률</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">원인</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((d) => (
              <tr key={d.date}>
                <td className="px-4 py-3 text-slate-700">{d.date}</td>
                <td className="px-4 py-3 text-slate-600">{d.predictedKwh.toLocaleString()} kWh</td>
                <td className="px-4 py-3 text-slate-600">{d.actualKwh.toLocaleString()} kWh</td>
                <td className="px-4 py-3 text-slate-600">{d.shortfallPct}%</td>
                <td className="px-4 py-3">
                  <SeverityBadge severity={d.severity} />
                </td>
                <td className="px-4 py-3 text-slate-500">{d.cause ?? '-'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  해당하는 기록이 없어요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
