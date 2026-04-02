import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import initialTransactions from '../data/transactions'
import { normalizeTransaction } from '../utils/formatters'

const normalizedInitialTransactions = initialTransactions.map(normalizeTransaction)
const normalizeRole = (role) => (role === 'admin' ? 'admin' : 'viewer')

const useStore = create(
  persist((set) => ({
    transactions: normalizedInitialTransactions,
    role: 'viewer',
    addTransaction: (tx) =>
      set((state) => ({ transactions: [normalizeTransaction(tx), ...state.transactions] })),
    deleteTransaction: (id) =>
      set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
    setRole: (role) => set({ role: normalizeRole(role) })
  }),
  {
    name: 'finance-dashboard-storage',
    merge: (persistedState, currentState) => {
      const mergedState = {
        ...currentState,
        ...persistedState
      }

      return {
        ...mergedState,
        role: normalizeRole(mergedState.role),
        transactions: (mergedState.transactions || []).map(normalizeTransaction)
      }
    }
  })
)

export default useStore;
