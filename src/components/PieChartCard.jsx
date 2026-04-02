import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#ef4444', '#f59e0b', '#60a5fa', '#a78bfa', '#06b6d4']

function buildData(transactions) {
  const map = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + Number(t.amount)
  })
  return Object.keys(map).map((k) => ({ name: k, value: Number(map[k].toFixed(2)) }))
}

export default function PieChartCard({ transactions }) {
  const data = buildData(transactions)

  return (
    <div className="dashboard-card animate-enter rounded-xl border border-slate-700/70 p-4 bg-slate-800 text-gray-100 h-64">
      <div className="text-sm text-gray-300">Spending by Category</div>
      <div className="h-44 mt-2">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-700 text-sm text-gray-400">
            No expense categories to display yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={4}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
