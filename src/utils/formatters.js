export function normalizeCategory(category) {
  const value = String(category || '').trim().toLowerCase()

  if (!value) {
    return ''
  }

  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function normalizeTransaction(transaction) {
  return {
    ...transaction,
    category: normalizeCategory(transaction.category)
  }
}
