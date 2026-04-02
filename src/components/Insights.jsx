import React from 'react'

function InsightCard({ title, value }) {
  return (
    <div className="dashboard-card animate-enter rounded-xl border border-slate-700/70 p-4 bg-slate-800 text-gray-100">
      <div className="text-sm text-gray-300">{title}</div>
      <div className="text-lg font-semibold mt-2">{value}</div>
    </div>
  )
}

export default function Insights({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="animate-enter rounded-xl border border-dashed border-slate-700 bg-slate-800 p-6 text-sm text-gray-400">
        Add a few transactions to unlock spending insights and monthly comparisons.
      </div>
    )
  }

  const expenses = transactions.filter(t => t.type === 'expense')
  const byCategory = {}
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + Number(e.amount) })
  const highest = Object.keys(byCategory).sort((a,b)=> byCategory[b]-byCategory[a])[0] || 'No expenses yet'

  const months = {}
  transactions.forEach(t => {
    const m = t.date.slice(0,7)
    months[m] = (months[m] || 0) + (t.type === 'expense' ? Number(t.amount) : 0)
  })
  const keys = Object.keys(months).sort()
  const latest = keys[keys.length-1]
  const prev = keys[keys.length-2]
  const latestVal = latest ? months[latest] : 0
  const prevVal = prev ? months[prev] : 0
  const diff = prevVal === 0 ? '—' : `${((latestVal - prevVal)/prevVal*100).toFixed(1)}%`

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <InsightCard title="Highest Spending Category" value={highest} />
      <InsightCard title={`Total (${latest || '-'})`} value={`$${(latestVal||0).toLocaleString()}`} />
      <InsightCard title="Monthly Change" value={diff} />
    </div>
  )
}
