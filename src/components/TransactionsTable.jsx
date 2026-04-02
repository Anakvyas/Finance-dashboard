import React from 'react'
import useStore from '../store/useStore'

function Row({ t, onDelete, canDelete }) {
  return (
    <tr className="odd:bg-slate-800 even:bg-slate-900">
      <td className="px-4 py-2 text-sm text-gray-300">{t.date}</td>
      <td className={`px-4 py-2 text-sm ${t.type === 'income' ? 'text-green-300' : 'text-red-300'}`}>${Number(t.amount).toLocaleString()}</td>
      <td className="px-4 py-2 text-sm text-gray-300">{t.category}</td>
      <td className="px-4 py-2 text-sm text-gray-300">{t.type}</td>
      <td className="px-4 py-2 text-sm text-gray-300">{t.note || '-'}</td>
      <td className="px-4 py-3">
        {canDelete ? (
          <button onClick={() => onDelete(t.id)} className="text-sm text-red-400 hover:text-red-300">Delete</button>
        ) : null}
      </td>
    </tr>
  )
}

function MobileCard({ t, onDelete, canDelete }) {
  return (
    <div className="animate-enter rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-white">{t.category}</div>
          <div className="mt-1 text-xs text-gray-400">{t.date}</div>
        </div>
        <div className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-300' : 'text-red-300'}`}>
          ${Number(t.amount).toLocaleString()}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">Type</div>
          <div className="mt-1 text-gray-300">{t.type}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">Note</div>
          <div className="mt-1 text-gray-300">{t.note || '-'}</div>
        </div>
      </div>

      {canDelete ? (
        <div className="mt-4">
          <button onClick={() => onDelete(t.id)} className="text-sm text-red-400 hover:text-red-300">
            Delete
          </button>
        </div>
      ) : null}
    </div>
  )
}

function sortTransactions(transactions, sortBy) {
  const sorted = [...transactions]

  sorted.sort((a, b) => {
    if (sortBy === 'amount-asc') {
      return Number(a.amount) - Number(b.amount)
    }

    if (sortBy === 'amount-desc') {
      return Number(b.amount) - Number(a.amount)
    }

    if (sortBy === 'date-asc') {
      return new Date(a.date) - new Date(b.date)
    }

    return new Date(b.date) - new Date(a.date)
  })

  return sorted
}

export default function TransactionsTable({ transactions, search, sortBy }) {
  const deleteTransaction = useStore((s) => s.deleteTransaction)
  const role = useStore((s) => s.role)

  const q = (search || '').toLowerCase()
  const filtered = transactions.filter(t => {
    return [t.date, String(t.amount), t.category, t.type, (t.note||'')].join(' ').toLowerCase().includes(q)
  })
  const sortedTransactions = sortTransactions(filtered, sortBy)

  if (sortedTransactions.length === 0) {
    return <div className="p-6 bg-slate-800 rounded-xl text-gray-400">No transactions found.</div>
  }

  return (
    <div className="dashboard-card animate-enter rounded-xl border border-slate-700/70 bg-slate-800 overflow-hidden">
      <div className="grid gap-3 p-3 md:hidden">
        {sortedTransactions.map((t) => (
          <MobileCard key={t.id} t={t} onDelete={deleteTransaction} canDelete={role === 'admin'} />
        ))}
      </div>

      <div className="hidden overflow-auto md:block">
        <table className="min-w-full">
          <thead className="text-left text-gray-400 border-b border-slate-700">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map(t => (
              <Row key={t.id} t={t} onDelete={deleteTransaction} canDelete={role === 'admin'} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
