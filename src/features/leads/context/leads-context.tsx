import React from 'react'
import { LeadsContext, type LeadsDialogType } from './leads-context-core'

export default function LeadsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState<LeadsDialogType>(null)
  return <LeadsContext value={{ open, setOpen }}>{children}</LeadsContext>
}
