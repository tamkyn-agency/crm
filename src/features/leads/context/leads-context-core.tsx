import React from 'react'

export type LeadsDialogType = null

export interface LeadsContextType {
  open: LeadsDialogType
  setOpen: (val: LeadsDialogType) => void
}

export const LeadsContext = React.createContext<LeadsContextType | null>(null)

export const useLeads = () => {
  const ctx = React.useContext(LeadsContext)
  if (!ctx) throw new Error('useLeads must be used within LeadsProvider')
  return ctx
}
