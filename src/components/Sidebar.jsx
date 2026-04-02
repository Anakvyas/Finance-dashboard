import React from 'react'
import useStore from '../store/useStore'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'transactions', label: 'Transactions' }
]

const NavItem = ({ children, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition ${
      active ? 'bg-slate-700 text-white' : 'text-gray-300 hover:bg-slate-800'
    }`}
  >
    {children}
  </button>
)

export default function Sidebar({ activeTab, onTabChange }) {
  const role = useStore((s) => s.role)

  return (
    <aside className="hidden h-screen w-72 flex-col gap-6 bg-slate-900 p-6 md:flex">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 font-bold text-white">
          A
        </div>
        <div>
          <div className="font-semibold text-white">Alex Morgan</div>
          <div className="text-sm text-gray-400">{role === 'admin' ? 'Administrator' : 'Viewer'}</div>
        </div>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            active={activeTab === item.id}
            onClick={() => onTabChange?.(item.id)}
          >
            {item.label}
          </NavItem>
        ))}
      </nav>
    </aside>
  )
}
