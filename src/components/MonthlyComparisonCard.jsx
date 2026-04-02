import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function buildMonthlyData(transactions) {
  const map = {}

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7)

    if (!map[month]) {
      map[month] = { month, income: 0, expense: 0 }
    }

    if (transaction.type === 'income') {
      map[month].income += Number(transaction.amount)
    } else {
      map[month].expense += Number(transaction.amount)
    }
  })

  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => ({
      ...item,
      income: Number(item.income.toFixed(2)),
      expense: Number(item.expense.toFixed(2))
    }))
}

export default function MonthlyComparisonCard({ transactions }) {
  const data = buildMonthlyData(transactions)

  return (
    <div className="animate-enter rounded-xl bg-slate-800 p-4 text-gray-100 shadow">
      <div className="text-sm text-gray-300">Monthly Income vs Expenses</div>
      <div className="mt-2 h-56">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-700 text-sm text-gray-400">
            No monthly comparison available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" tick={{ fill: '#cbd5e1' }} />
              <YAxis tick={{ fill: '#cbd5e1' }} />
              <Tooltip />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
