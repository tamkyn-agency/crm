import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Route = createFileRoute('/_authenticated/recent-activities')({
  component: RecentActivitiesPage,
})

type ActivityRow = {
  name: string
  email: string
  activity: string
  activityDetail: string
  color: 'green' | 'blue' | 'red'
  date: string
  by: string
}

function RecentActivitiesPage() {
  // Filters (no-op demo state for now)
  const [userFilter, setUserFilter] = useState('Toutes les utilisateurs')
  const [typeFilter, setTypeFilter] = useState('Toutes les activités')
  const [rangeFilter, setRangeFilter] = useState('Oct18–Nov18')
  const [periodFilter, setPeriodFilter] = useState('Mois')

  const rows: ActivityRow[] = useMemo(
    () => [
      {
        name: 'Guy Hawkins',
        email: 'michelle.rivera@example.com',
        activity: 'Ajout d’un commentaire',
        activityDetail: 'Ajout d’un commentaire XXX',
        color: 'green',
        date: 'Jul 13, 2023',
        by: 'Kathryn Murphy',
      },
      {
        name: 'Kathryn Murphy',
        email: 'nevaeh.simmons@example.com',
        activity: 'Ajout de document',
        activityDetail:
          'Ajout de document Contrat Sous-traitance - AYA ENERGIES x Clim Install_20250413.pdf',
        color: 'green',
        date: 'Jul 13, 2023',
        by: 'Kathryn Murphy',
      },
      {
        name: 'Courtney Henry',
        email: 'jackson.graham@example.com',
        activity: 'Ajout de document dans un devis',
        activityDetail:
          'Ajout de document Contrat Sous-traitance - AYA ENERGIES x Clim Install_20250413.pdf',
        color: 'green',
        date: 'Jul 13, 2023',
        by: 'Kathryn Murphy',
      },
      {
        name: 'Floyd Miles',
        email: 'deanna.curtis@example.com',
        activity: 'Création du devis',
        activityDetail: 'Création du devis DE728250717–2',
        color: 'green',
        date: 'Jul 13, 2023',
        by: 'Kathryn Murphy',
      },
      {
        name: 'Albert Flores',
        email: 'felicia.reid@example.com',
        activity: 'Création du lead',
        activityDetail: 'Création du lead',
        color: 'green',
        date: 'Jul 13, 2023',
        by: 'Kathryn Murphy',
      },
      {
        name: 'Cameron Williamson',
        email: 'kenzi.lawson@example.com',
        activity: 'lead supprimé',
        activityDetail: 'lead supprimé',
        color: 'red',
        date: 'Jul 13, 2023',
        by: 'Kathryn Murphy',
      },
      {
        name: 'Cameron Williamson',
        email: 'kenzi.lawson@example.com',
        activity: 'Modification  du lead',
        activityDetail: 'Modification  du lead',
        color: 'blue',
        date: 'Jul 13, 2023',
        by: 'Cameron Williamson',
      },
      {
        name: 'Cameron Williamson',
        email: 'kenzi.lawson@example.com',
        activity: 'Suppression du document',
        activityDetail: 'Suppression du document ecifvn34',
        color: 'red',
        date: 'Jul 13, 2023',
        by: 'Cameron Williamson',
      },
      {
        name: 'Cameron Williamson',
        email: 'kenzi.lawson@example.com',
        activity: 'Suppression du commentaire',
        activityDetail: 'Suppression du commentaire vn34',
        color: 'red',
        date: 'Jul 13, 2023',
        by: 'Cameron Williamson',
      },
      {
        name: 'Cameron Williamson',
        email: 'kenzi.lawson@example.com',
        activity: 'Suppression du devis',
        activityDetail: 'Suppression du devis 232',
        color: 'red',
        date: 'Jul 13, 2023',
        by: 'Cameron Williamson',
      },
    ],
    []
  )

  const pill =
    'rounded-full border px-3 py-2 text-sm inline-flex items-center gap-2 bg-background'

  const badgeClass = (c: ActivityRow['color']) =>
    c === 'green'
      ? 'bg-emerald-600 text-white'
      : c === 'blue'
        ? 'bg-sky-500 text-white'
        : 'bg-rose-500 text-white'

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <Link to='/' className='text-muted-foreground text-sm hover:underline'>
          ← Retour au tableau de bord
        </Link>
      </div>
      <h1 className='text-2xl font-bold'>Activités récentes</h1>

      {/* Filters bar */}
      <div className='flex flex-wrap items-center gap-3'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={pill}>
              {userFilter}
              <ChevronDown className='size-4' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>Utilisateurs</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['Toutes les utilisateurs', 'Moi', 'Équipe A', 'Équipe B'].map(
              (u) => (
                <DropdownMenuItem key={u} onClick={() => setUserFilter(u)}>
                  {u}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={pill}>
              {typeFilter}
              <ChevronDown className='size-4' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>Types d’activité</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              'Toutes les activités',
              'Ajout d’un commentaire',
              'Ajout de document',
              'Création du lead',
              'Suppression',
            ].map((t) => (
              <DropdownMenuItem key={t} onClick={() => setTypeFilter(t)}>
                {t}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={pill}>
              <CalendarIcon className='size-4' /> {rangeFilter}
              <ChevronDown className='size-4' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {['Oct18–Nov18', 'Derniers 7 jours', 'Derniers 30 jours'].map(
              (r) => (
                <DropdownMenuItem key={r} onClick={() => setRangeFilter(r)}>
                  {r}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={pill}>
              {periodFilter}
              <ChevronDown className='size-4' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {['Jour', 'Semaine', 'Mois', 'Année'].map((p) => (
              <DropdownMenuItem key={p} onClick={() => setPeriodFilter(p)}>
                {p}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leads / Clients</TableHead>
                  <TableHead>Activité</TableHead>
                  <TableHead>Détail de l'activité</TableHead>
                  <TableHead>Date de l’activité</TableHead>
                  <TableHead>Activité fait par</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r, i) => (
                  <TableRow key={`${r.name}-${i}`}>
                    <TableCell className='min-w-56'>
                      <div className='font-medium'>{r.name}</div>
                      <div className='text-muted-foreground text-xs'>
                        {r.email}
                      </div>
                    </TableCell>
                    <TableCell className='min-w-56'>
                      <Badge className={`${badgeClass(r.color)} px-3`}>
                        {r.activity}
                      </Badge>
                    </TableCell>
                    <TableCell className='min-w-96'>
                      {r.activityDetail}
                    </TableCell>
                    <TableCell className='min-w-40'>{r.date}</TableCell>
                    <TableCell className='min-w-40'>{r.by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination footer */}
          <div className='flex items-center justify-between border-t px-4 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              {['10', '20', '30'].map((n, idx) => (
                <button
                  key={n}
                  className={`rounded-md border px-2 py-1 ${idx === 0 ? 'bg-foreground text-background' : 'text-foreground/70'}`}
                >
                  {n}
                </button>
              ))}
              <span className='text-foreground/70'>Éléments par page</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-foreground/70'>1–10 sur 230</span>
              <div className='flex items-center gap-1'>
                <Button variant='outline' size='icon'>
                  <ChevronLeft className='size-4' />
                </Button>
                <Button variant='outline' size='icon'>
                  <ChevronRight className='size-4' />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
