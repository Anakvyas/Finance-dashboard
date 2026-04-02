import React, { useMemo, useState } from 'react'
import useStore from '../store/useStore'

const TAB_CONTENT = {
  dashboard: {
    title: 'Dashboard Overview',
    subtitle: 'Monitor your balance, recent activity, and spending distribution in one place.'
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Understand category trends, monthly shifts, and where your money is moving.'
  },
  transactions: {
    title: 'Transactions',
    subtitle: 'Search, sort, export, and manage every transaction record quickly.'
  }
}

export default function Header({
  activeTab = 'dashboard',
  onSearch,
  onAdd,
  transactions = [],
  sortBy = 'date-desc',
  onSortChange
}) {
  const role = useStore((s) => s.role)
  const setRole = useStore((s) => s.setRole)
  const [q, setQ] = useState('')
  const storedTransactions = useStore((s) => s.transactions)
  const content = TAB_CONTENT[activeTab] || TAB_CONTENT.dashboard
  const roleContent = role === 'admin'
    ? {
        badge: 'Admin Mode',
        titleSuffix: 'with editing controls enabled.',
        note: 'You can add transactions, delete entries, and export records from this workspace.',
        badgeClassName: 'bg-indigo-500/15 text-indigo-200 border border-indigo-400/20',
        panelClassName: 'border-indigo-500/20 bg-indigo-500/5',
        accentClassName: 'text-indigo-300'
      }
    : {
        badge: 'Viewer Mode',
        titleSuffix: 'in read-only mode.',
        note: 'You can review metrics, search records, and explore charts without changing data.',
        badgeClassName: 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/20',
        panelClassName: 'border-emerald-500/20 bg-emerald-500/5',
        accentClassName: 'text-emerald-300'
      }

  const exportTransactions = useMemo(() => {
    return transactions.length > 0 ? transactions : storedTransactions
  }, [transactions, storedTransactions])

  const handleDownload = () => {
    const csv = [
      ['Date', 'Amount', 'Category', 'Type', 'Note'],
      ...exportTransactions.map((t) => [t.date, t.amount, t.category, t.type, t.note])
    ].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <header className={`dashboard-card animate-enter rounded-xl border bg-slate-900/70 p-4 ${roleContent.panelClassName}`}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className={`text-xs font-semibold uppercase tracking-[0.18em] ${roleContent.accentClassName}`}>
              Finance Workspace
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${roleContent.badgeClassName}`}>
              {roleContent.badge}
            </div>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            {content.title} {roleContent.titleSuffix}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            {content.subtitle} {roleContent.note}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto">
          <div className="rounded-lg border border-slate-800 bg-slate-800/80 p-3">
            <div className="text-xs uppercase tracking-wide text-gray-500">Role</div>
            <div className="mt-1 text-sm font-medium text-white">{role === 'admin' ? 'Admin' : 'Viewer'}</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-800/80 p-3">
            <div className="text-xs uppercase tracking-wide text-gray-500">Records</div>
            <div className="mt-1 text-sm font-medium text-white">{exportTransactions.length}</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-800/80 p-3">
            <div className="text-xs uppercase tracking-wide text-gray-500">Income</div>
            <div className="mt-1 text-sm font-medium text-green-300">
              {exportTransactions.filter((t) => t.type === 'income').length}
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-800/80 p-3">
            <div className="text-xs uppercase tracking-wide text-gray-500">Expenses</div>
            <div className="mt-1 text-sm font-medium text-red-300">
              {exportTransactions.filter((t) => t.type === 'expense').length}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-md">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); onSearch?.(e.target.value) }}
            placeholder="Search transactions..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 text-gray-200 placeholder-gray-400 px-4 py-3 focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:flex xl:flex-wrap xl:items-center">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full min-w-[160px] bg-slate-800 text-gray-200 rounded-lg px-3 py-3 xl:w-[160px]"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="w-full min-w-[190px] bg-slate-800 text-gray-200 rounded-lg px-3 py-3 xl:w-[190px]"
          >
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="amount-desc">Amount High-Low</option>
            <option value="amount-asc">Amount Low-High</option>
          </select>

          <button onClick={handleDownload} className="w-full bg-slate-700 text-white px-3 py-3 rounded-lg hover:bg-slate-600 sm:col-span-1 xl:w-auto">
            Download
          </button>

          {role === 'admin' && (
            <button onClick={onAdd} className="w-full bg-indigo-600 text-white px-3 py-3 rounded-lg hover:brightness-110 sm:col-span-1 xl:w-auto">
              Add Transaction
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
