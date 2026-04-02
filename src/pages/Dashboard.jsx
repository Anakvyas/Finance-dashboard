import React, { useState } from 'react'
import useStore from '../store/useStore'
import SummaryCards from '../components/SummaryCards'
import LineChartCard from '../components/LineChartCard'
import MonthlyComparisonCard from '../components/MonthlyComparisonCard'
import PieChartCard from '../components/PieChartCard'
import TransactionsTable from '../components/TransactionsTable'
import Insights from '../components/Insights'
import Header from '../components/Header'
import AddTransactionModal from '../components/AddTransactionModal'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'transactions', label: 'Transactions' }
]

function AnalyticsSection({ transactions }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineChartCard transactions={transactions} />
        <MonthlyComparisonCard transactions={transactions} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PieChartCard transactions={transactions} />
        <Insights transactions={transactions} />
      </div>
    </div>
  )
}

function TransactionsSection({ transactions, search, sortBy }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <TransactionsTable transactions={transactions} search={search} sortBy={sortBy} />
    </div>
  )
}

export default function Dashboard({ activeTab = 'dashboard', onTabChange }) {
  const transactions = useStore((s) => s.transactions)
  const [search, setSearch] = useState('')
  const [openAdd, setOpenAdd] = useState(false)
  const [sortBy, setSortBy] = useState('date-desc')

  const renderSection = () => {
    if (activeTab === 'analytics') {
      return <AnalyticsSection transactions={transactions} />
    }

    if (activeTab === 'transactions') {
      return <TransactionsSection transactions={transactions} search={search} sortBy={sortBy} />
    }

    return (
      <>
        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <LineChartCard transactions={transactions} />
            <TransactionsTable transactions={transactions} search={search} sortBy={sortBy} />
          </div>
          <div className="flex flex-col gap-4">
            <PieChartCard transactions={transactions} />
            <Insights transactions={transactions} />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 md:gap-6">
      <Header
        activeTab={activeTab}
        transactions={transactions}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onSearch={setSearch}
        onAdd={() => setOpenAdd(true)}
      />

      <div className="flex gap-2 overflow-auto md:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? 'bg-slate-700 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderSection()}

      <AddTransactionModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  )
}
