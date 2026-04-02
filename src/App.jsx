import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-gray-300">
      <div className="background-orb background-orb-left" />
      <div className="background-orb background-orb-right" />
      <div className="background-orb background-orb-bottom" />

      <div className="relative flex min-h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 min-h-screen flex flex-col">
          <div className="border-b border-slate-800 bg-slate-900 px-4 py-4 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-sm font-bold text-white">
                A
              </div>
              <div>
                <div className="font-semibold text-white">Finance Dashboard</div>
                <div className="text-sm text-gray-400">Track and explore your finance activity</div>
              </div>
            </div>
          </div>
          <Dashboard activeTab={activeTab} onTabChange={setActiveTab} />
          <footer className="mt-auto border-t border-slate-800 px-4 py-4 text-center text-sm text-gray-400 md:px-6 md:text-left">
            Finance Dashboard. Track smarter, spend clearer.
          </footer>
        </div>
      </div>
    </div>
  )
}
