import { useState } from 'react'
import { Link } from 'react-router-dom'
import SeverityBadge from '../components/SeverityBadge.jsx'
import GenerationChart from '../components/GenerationChart.jsx'
import { plant, generationLog, today } from '../data/mockData.js'

const SIMPLE_MESSAGE = {
  정상: '오늘은 예측대로 발전 중이에요. 신경 쓰지 않으셔도 좋아요.',
  주의: '발전량이 예측보다 조금 낮아요. 한 번 확인해보세요.',
  경고: '발전량이 예측보다 많이 낮아요. 점검이 필요할 수 있어요.',
  이상: '발전량이 크게 떨어졌어요. 빠른 점검을 권장해요.',
}

export default function DashboardPage() {
  const [simpleMode, setSimpleMode] = useState(false)
  const last7 = generationLog.slice(-7)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{plant.location}</p>
          <h1 className="text-2xl font-bold text-slate-900">{plant.name}</h1>
          <p className="mt-1 text-sm text-slate-500">설비 용량 {plant.capacityKw}kW</p>
        </div>
        <button
          onClick={() => setSimpleMode((v) => !v)}
          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {simpleMode ? '상세히 보기' : '간단히 보기'}
        </button>
      </div>

      {simpleMode ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <SeverityBadge severity={today.severity} size="lg" />
          <p className="max-w-xs text-slate-600">{SIMPLE_MESSAGE[today.severity]}</p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">오늘 상태</p>
              <div className="mt-2">
                <SeverityBadge severity={today.severity} size="lg" />
              </div>
              {today.cause && (
                <p className="mt-3 text-sm text-slate-500">
                  추정 원인: <span className="font-medium text-slate-700">{today.cause}</span>
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">예측 발전량</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{today.predictedKwh.toLocaleString()} kWh</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">실제 발전량</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{today.actualKwh.toLocaleString()} kWh</p>
              <p className="mt-1 text-sm text-red-500">예측 대비 {today.shortfallPct}% 부족</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">최근 7일 예측 vs 실제</h2>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-slate-300" /> 예측
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" /> 실제
                </span>
              </div>
            </div>
            <GenerationChart data={last7} />
          </div>

          <Link
            to="/history"
            className="mt-6 inline-block text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
          >
            전체 발전 이력 보기 →
          </Link>
        </>
      )}
    </div>
  )
}
