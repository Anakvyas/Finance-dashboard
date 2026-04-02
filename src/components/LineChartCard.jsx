import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function buildSeries(transactions) {
  const map = {}
  transactions.forEach(t => {
    const d = t.date
    map[d] = (map[d] || 0) + (t.type === 'income' ? Number(t.amount) : -Number(t.amount))
  })
  return Object.keys(map).sort().map(k => ({ date: k, value: Number(map[k].toFixed(2)) }))
}

export default function LineChartCard({ transactions }) {
  const data = buildSeries(transactions)

  return (
    <div className="dashboard-card animate-enter rounded-xl border border-slate-700/70 p-4 bg-slate-800 text-gray-100 h-64">
      <div className="text-sm text-gray-300">Transaction Trend</div>
      <div className="h-44 mt-2">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-700 text-sm text-gray-400">
            No transaction trend available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tick={{ fill: '#cbd5e1' }} />
              <YAxis tick={{ fill: '#cbd5e1' }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
