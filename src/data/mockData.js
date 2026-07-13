export const plant = {
  name: '당진 태양광 발전소',
  location: '충청남도 당진시',
  capacityKw: 500,
}

// severity thresholds based on shortfall = (predicted - actual) / predicted
export function getSeverity(shortfallPct) {
  if (shortfallPct <= 10) return '정상'
  if (shortfallPct <= 20) return '주의'
  if (shortfallPct <= 35) return '경고'
  return '이상'
}

// raw daily generation log — predicted (예측 발전량) vs actual (실제 발전량), kWh
// cause: 심각도가 정상이 아닐 때만 의미 있음 ('날씨' | '원인불명')
const rawLog = [
  { date: '2026-06-30', predictedKwh: 2450, actualKwh: 2380, cause: null },
  { date: '2026-07-01', predictedKwh: 2500, actualKwh: 2410, cause: null },
  { date: '2026-07-02', predictedKwh: 2480, actualKwh: 1890, cause: '날씨' },
  { date: '2026-07-03', predictedKwh: 2510, actualKwh: 1790, cause: '날씨' },
  { date: '2026-07-04', predictedKwh: 2460, actualKwh: 2300, cause: null },
  { date: '2026-07-05', predictedKwh: 2470, actualKwh: 2050, cause: '원인불명' },
  { date: '2026-07-06', predictedKwh: 2490, actualKwh: 2440, cause: null },
  { date: '2026-07-07', predictedKwh: 2500, actualKwh: 2470, cause: null },
  { date: '2026-07-08', predictedKwh: 2440, actualKwh: 1520, cause: '원인불명' },
  { date: '2026-07-09', predictedKwh: 2450, actualKwh: 1980, cause: '날씨' },
  { date: '2026-07-10', predictedKwh: 2500, actualKwh: 2440, cause: null },
  { date: '2026-07-11', predictedKwh: 2510, actualKwh: 2260, cause: '날씨' },
  { date: '2026-07-12', predictedKwh: 2480, actualKwh: 2410, cause: null },
  { date: '2026-07-13', predictedKwh: 2460, actualKwh: 1610, cause: '원인불명' },
]

export const generationLog = rawLog.map((entry) => {
  const shortfallPct = ((entry.predictedKwh - entry.actualKwh) / entry.predictedKwh) * 100
  const severity = getSeverity(shortfallPct)
  return {
    ...entry,
    shortfallPct: Math.round(shortfallPct * 10) / 10,
    severity,
    cause: severity === '정상' ? null : entry.cause,
  }
})

export const today = generationLog[generationLog.length - 1]
