import { ColumnDef } from '@tanstack/react-table'
import { IconEdit, IconSend, IconTrash } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Lead } from '../data/leads'

export const columns: ColumnDef<Lead>[] = [
  {
    id: 'action',
    header: () => <div className='pl-1'>Action</div>,
    cell: () => (
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='icon'
          className='h-7 w-7 text-emerald-600'
        >
          <IconEdit size={16} />
        </Button>
        <Button variant='ghost' size='icon' className='h-7 w-7 text-sky-600'>
          <IconSend size={16} />
        </Button>
        <Button variant='ghost' size='icon' className='h-7 w-7 text-red-600'>
          <IconTrash size={16} />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: 'id', header: 'N de dossier' },
  { accessorKey: 'category', header: 'Catégorie' },
  { accessorKey: 'name', header: 'Nom et Prénom' },
  {
    accessorKey: 'status',
    header: 'Etat',
    cell: ({ row }) => {
      const value = row.getValue('status') as Lead['status']
      const styles: Record<Lead['status'], string> = {
        LEAD: 'bg-green-600 text-white',
        NRP: 'bg-red-600 text-white',
        'NRP 1': 'bg-red-600 text-white',
        'NRP 2': 'bg-red-600 text-white',
        'A CONTACTER': 'bg-blue-600 text-white',
      }
      return (
        <Badge className={`rounded-full px-3 py-1 ${styles[value]}`}>
          {value}
        </Badge>
      )
    },
  },
  { accessorKey: 'phone', header: 'Téléphone / fixe' },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className='block max-w-[220px] truncate'>
        {row.getValue('email')}
      </span>
    ),
  },
]
