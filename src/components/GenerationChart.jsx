const SEVERITY_FILL = {
  정상: '#10b981',
  주의: '#f59e0b',
  경고: '#f97316',
  이상: '#ef4444',
}

const VIEW_W = 700
const VIEW_H = 220
const PAD_TOP = 16
const PAD_BOTTOM = 28
const PAD_X = 8

export default function GenerationChart({ data }) {
  const maxVal = Math.max(...data.map((d) => d.predictedKwh)) * 1.05
  const chartH = VIEW_H - PAD_TOP - PAD_BOTTOM
  const slot = (VIEW_W - PAD_X * 2) / data.length
  const barW = Math.min(18, slot * 0.32)

  const scaleY = (val) => chartH - (val / maxVal) * chartH

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="예측 발전량 대비 실제 발전량 차트">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={PAD_X}
          x2={VIEW_W - PAD_X}
          y1={PAD_TOP + chartH * (1 - f)}
          y2={PAD_TOP + chartH * (1 - f)}
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}
      {data.map((d, i) => {
        const cx = PAD_X + slot * i + slot / 2
        const predictedY = PAD_TOP + scaleY(d.predictedKwh)
        const actualY = PAD_TOP + scaleY(d.actualKwh)
        const label = d.date.slice(5).replace('-', '/')
        return (
          <g key={d.date}>
            <rect
              x={cx - barW}
              y={predictedY}
              width={barW}
              height={chartH - scaleY(d.predictedKwh)}
              fill="#cbd5e1"
              rx="2"
            />
            <rect
              x={cx}
              y={actualY}
              width={barW}
              height={chartH - scaleY(d.actualKwh)}
              fill={SEVERITY_FILL[d.severity] ?? '#94a3b8'}
              rx="2"
            />
            <title>
              {d.date} — 예측 {d.predictedKwh}kWh / 실제 {d.actualKwh}kWh ({d.severity})
            </title>
            <text
              x={cx}
              y={VIEW_H - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#64748b"
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
