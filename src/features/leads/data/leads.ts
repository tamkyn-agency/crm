export type Lead = {
  id: string // N de dossier
  category: string
  name: string
  status: 'LEAD' | 'NRP' | 'NRP 1' | 'NRP 2' | 'A CONTACTER'
  phone: string
  email: string
}

export const leads: Lead[] = [
  {
    id: '922',
    category: "Renovation d'ampleur",
    name: 'Darrell Steward',
    status: 'LEAD',
    phone: '(808) 555–0111',
    email: 'nevaeh.simmons@example.com',
  },
  {
    id: '647',
    category: "Renovation d'ampleur",
    name: 'Cody Fisher',
    status: 'NRP',
    phone: '(684) 555–0102',
    email: 'debra.holt@example.com',
  },
  {
    id: '883',
    category: "Renovation d'ampleur",
    name: 'Jenny Wilson',
    status: 'NRP 1',
    phone: '(208) 555–0112',
    email: 'bill.sanders@example.com',
  },
  {
    id: '429',
    category: "Renovation d'ampleur",
    name: 'Robert Fox',
    status: 'NRP 2',
    phone: '(704) 555–0127',
    email: 'felicia.reid@example.com',
  },
  {
    id: '877',
    category: "Renovation d'ampleur",
    name: 'Jacob Jones',
    status: 'A CONTACTER',
    phone: '(307) 555–0133',
    email: 'michelle.rivera@example.com',
  },
]
