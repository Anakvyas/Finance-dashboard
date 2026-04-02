import React from 'react'

function Card({ title, value, className }) {
  return (
    <div className={`dashboard-card animate-enter rounded-xl border border-slate-700/70 p-4 bg-slate-800 text-gray-100 ${className}`}>
      <div className="text-sm text-gray-300">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </div>
  )
}

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0)
  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0)
  const balance = income - expenses

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Total Balance" value={`$${balance.toLocaleString()}`} className="col-span-1" />
      <Card title="Total Income" value={`$${income.toLocaleString()}`} />
      <Card title="Total Expenses" value={`$${expenses.toLocaleString()}`} />
      <Card title="Net" value={`${(income - expenses) >= 0 ? 'Positive' : 'Negative'}`} />
    </div>
  )
}
