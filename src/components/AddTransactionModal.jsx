import React, { useState } from 'react'
import useStore from '../store/useStore'

export default function AddTransactionModal({ open, onClose }) {
  const addTransaction = useStore((s) => s.addTransaction)
  const [form, setForm] = useState({ date: '', amount: '', category: '', type: 'expense', note: '' })

  const submit = (e) => {
    e.preventDefault()
    const tx = { ...form, id: 't' + Date.now(), amount: Number(form.amount) }
    addTransaction(tx)
    setForm({ date: '', amount: '', category: '', type: 'expense', note: '' })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-slate-900 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-white text-lg mb-4">Add Transaction</h3>
        <div className="flex flex-col gap-3">
          <input required value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} type="date" className="bg-slate-800 text-gray-200 rounded-lg px-3 py-2" />
          <input required value={form.amount} onChange={(e)=>setForm({...form,amount:e.target.value})} placeholder="Amount" className="bg-slate-800 text-gray-200 rounded-lg px-3 py-2" />
          <input required value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} placeholder="Category" className="bg-slate-800 text-gray-200 rounded-lg px-3 py-2" />
          <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} className="bg-slate-800 text-gray-200 rounded-lg px-3 py-2">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input value={form.note} onChange={(e)=>setForm({...form,note:e.target.value})} placeholder="Note" className="bg-slate-800 text-gray-200 rounded-lg px-3 py-2" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg bg-slate-700 text-gray-200">Cancel</button>
            <button type="submit" className="px-3 py-2 rounded-lg bg-indigo-600 text-white">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}
