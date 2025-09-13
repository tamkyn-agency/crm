import type { ComponentType, SVGProps } from 'react'
import { useMemo, useRef, useState } from 'react'
import { PdfIcon } from '@/icons/PdfIcon'
import {
  ChartNoAxesCombined,
  ChevronDown,
  Download,
  FileText,
  MoreHorizontal,
  Move,
  Plus,
  UserRoundCheck,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

type MetricId = 'total-leads' | 'clients' | 'quotes-created' | 'conversion-rate'

export default function Dashboard() {
  const [visible, setVisible] = useState<Record<MetricId, boolean>>({
    'total-leads': true,
    clients: true,
    'quotes-created': true,
    'conversion-rate': true,
  })
  const [spans, setSpans] = useState<Record<MetricId, 1 | 2>>({
    'total-leads': 1,
    clients: 1,
    'quotes-created': 1,
    'conversion-rate': 1,
  })

  const metricsOrder: MetricId[] = useMemo(
    () => ['total-leads', 'clients', 'quotes-created', 'conversion-rate'],
    []
  )

  const toggleMetric = (id: MetricId, checked: boolean | 'indeterminate') => {
    setVisible((v) => ({ ...v, [id]: Boolean(checked) }))
  }
  const setSpan = (id: MetricId, value: 1 | 2) =>
    setSpans((s) => ({ ...s, [id]: value }))
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Table de bord</h1>
          <div className='flex items-center space-x-2'>
            <Button>
              <Plus className='h-4 w-4' />
              Add lead
            </Button>
          </div>
        </div>
        <div className='flex items-center justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' aria-label='Customize stats'>
                <MoreHorizontal className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='-mt-1 min-w-56'>
              <DropdownMenuLabel>Stat cards</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {metricsOrder.map((id) => (
                <DropdownMenuCheckboxItem
                  key={id}
                  checked={visible[id]}
                  onCheckedChange={(c) => toggleMetric(id, c)}
                  className='justify-between pr-2'
                >
                  <span className='flex items-center gap-2'>
                    <Move className='text-muted-foreground size-3.5' />
                    {labelFor(id)}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          {/* <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div> */}
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {metricsOrder
                .filter((m) => visible[m])
                .map((m) => (
                  <StatCard
                    key={m}
                    id={m}
                    span={spans[m]}
                    onResize={(v: 1 | 2) => setSpan(m, v)}
                  />
                ))}
            </div>
            <div className='grid grid-cols-1 gap-x-4 lg:auto-rows-min lg:grid-cols-7 lg:gap-y-0'>
              {/* Left top: Action cards take same width as activity section */}
              <div className='col-span-1 lg:col-span-3 lg:h-fit'>
                <ActionCards />
              </div>
              {/* Right: Leads table starts at top and fills remaining width */}
              <Card className='col-span-1 lg:col-span-4 lg:col-start-4 lg:row-span-2'>
                <CardHeader>
                  <CardTitle>Leads & Client</CardTitle>
                </CardHeader>
                <CardContent>
                  <LeadsClientsTable />
                </CardContent>
              </Card>
              {/* Left bottom: Recent activity */}
              <Card className='col-span-1 lg:col-span-3 lg:-mt-28'>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>Activité récente</CardTitle>
                  <Button asChild variant='outline' size='sm'>
                    <Link to='/recent-activities'>View all</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <RecentActivityTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

function labelFor(id: MetricId) {
  switch (id) {
    case 'total-leads':
      return 'Total leads'
    case 'clients':
      return 'Clients'
    case 'quotes-created':
      return 'Devis créé'
    case 'conversion-rate':
      return 'Taux de conversion'
  }
}

function StatCard({
  id,
  span,
  onResize,
}: {
  id: MetricId
  span: 1 | 2
  onResize: (v: 1 | 2) => void
}) {
  let title: string
  let Icon: ComponentType<SVGProps<SVGSVGElement>>
  let value: string
  let subtitle: string

  switch (id) {
    case 'total-leads':
      title = 'Total leads'
      Icon = Users
      value = '$45,231.89'
      subtitle = '+20.1% from last month'
      break
    case 'clients':
      title = 'Clients'
      Icon = UserRoundCheck
      value = '+2350'
      subtitle = '+180.1% from last month'
      break
    case 'quotes-created':
      title = 'Devis créé'
      Icon = FileText
      value = '+12,234'
      subtitle = '+19% from last month'
      break
    case 'conversion-rate':
      title = 'Taux de conversion'
      Icon = ChartNoAxesCombined
      value = '+573'
      subtitle = '+201 since last hour'
      break
  }

  const startXRef = useRef<number>(0)
  const startSpanRef = useRef<1 | 2>(span)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX
    startSpanRef.current = span

    const handleMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startXRef.current
      if (dx > 24 && startSpanRef.current !== 2) onResize(2)
      if (dx < -24 && startSpanRef.current !== 1) onResize(1)
    }
    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp, { once: true })
  }

  return (
    <Card
      className={`relative ${span === 2 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-muted-foreground text-xs'>{subtitle}</p>
      </CardContent>
      {/* Right-edge resize handle */}
      <div
        onPointerDown={onPointerDown}
        title='Drag to resize'
        className='hover:bg-border/40 absolute top-0 right-0 h-full w-2 cursor-ew-resize rounded-r-md'
      />
    </Card>
  )
}

function ActionCards() {
  const items = [
    {
      title: 'Générer un devis',
      icon: FileText,
      bgColor: 'hsla(166, 76%, 97%, 0.4)',
      iconColor: 'hsla(167, 85%, 89%, 1)',
    },
    {
      title: 'Générer un docs',
      icon: PdfIcon,
      bgColor: 'hsla(0, 73%, 88%, 0.2)',
      iconColor: 'hsla(0, 94%, 82%, 1)',
    },
    {
      title: 'Import CSV',
      icon: Download,
      bgColor: 'hsla(213, 97%, 87%, 0.38)',
      iconColor: 'hsla(213, 97%, 87%, 1)',
    },
  ] as const
  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
      {items.map(({ title, icon: Icon, bgColor, iconColor }) => (
        <Card
          key={title}
          className='transition-shadow hover:shadow-md'
          style={{ backgroundColor: bgColor }}
        >
          <CardContent className='flex flex-col items-center justify-center gap-1 px-2'>
            <div
              style={{
                backgroundColor: iconColor,
              }}
              className='grid size-10 place-content-center rounded-full text-black'
            >
              <Icon className='size-5' />
            </div>
            <div className='text-center text-xs font-medium'>{title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function RecentActivityTable() {
  const rows = [
    {
      name: 'Guy Hawkins',
      activity: 'Ajout d’un commentaire',
      color: 'green',
      date: 'Jul 13, 2023',
    },
    {
      name: 'Kathryn Murphy',
      activity: 'Modification du lead',
      color: 'blue',
      date: 'Jul 13, 2023',
    },
    {
      name: 'Courtney Henry',
      activity: 'Ajout de document dans un devis',
      color: 'green',
      date: 'Jul 13, 2023',
    },
    {
      name: 'Floyd Miles',
      activity: 'lead supprimé',
      color: 'red',
      date: 'Jul 13, 2023',
    },
    {
      name: 'Albert Flores',
      activity: 'Création du lead',
      color: 'green',
      date: 'Jul 13, 2023',
    },
  ] as const

  const badgeClass = (c: string) =>
    c === 'green' ? 'bg-green-600' : c === 'blue' ? 'bg-blue-400' : 'bg-red-400'

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-muted text-card-foreground text-md text-center'>
          <TableHead className='text-center'>Leads / Clients</TableHead>
          <TableHead className='text-center'>Activité</TableHead>
          <TableHead className='text-center'>Date de l’activité</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={`${r.name}-${r.activity}`}>
            <TableCell className='font-semibold'>{r.name}</TableCell>
            <TableCell className='text-center font-semibold'>
              <Badge className={`${badgeClass(r.color)} text-white`}>
                {r.activity}
              </Badge>
            </TableCell>
            <TableCell className='text-center font-medium text-gray-500'>
              {r.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function LeadsClientsTable() {
  const rows = Array.from({ length: 9 }).map(() => ({
    id: `728—418633928`,
    category: 'Renovation d’ampleur',
    name: 'bari alexneder',
    status: 'LEAD',
    dept: '77\n(77600)',
    phone: '0687945635\n0687945635',
    created: 'Jul 13, 2023',
  }))

  // Filters state
  const [catFilter, setCatFilter] = useState<'all' | string>('all')
  const statusOptions = [
    { value: 'LEAD', label: 'lead' },
    { value: 'SIGNE', label: 'signe' },
    { value: 'A CONTACT', label: 'A contact' },
    { value: 'MORE', label: 'more' },
  ] as const
  type Status = (typeof statusOptions)[number]['value']
  const [statusFilter, setStatusFilter] = useState<Status>('LEAD')

  const categories = Array.from(new Set(rows.map((r) => r.category)))

  const filteredRows = rows.filter(
    (r) =>
      (catFilter === 'all' || r.category === catFilter) &&
      r.status.toUpperCase() === statusFilter
  )
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N de dossier</TableHead>
          <TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type='button'
                  className='hover:text-foreground/80 inline-flex items-center gap-1 font-semibold'
                >
                  Catégorie
                  <ChevronDown className='size-3.5' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='min-w-48'>
                <DropdownMenuLabel>Filtrer par catégorie</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={catFilter}
                  onValueChange={(v: string) => setCatFilter(v)}
                >
                  <DropdownMenuRadioItem value='all'>
                    Toutes
                  </DropdownMenuRadioItem>
                  {categories.map((c) => (
                    <DropdownMenuRadioItem key={c} value={c}>
                      {c}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>
          <TableHead>Nom et Prénom</TableHead>
          <TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type='button'
                  className='hover:text-foreground/80 inline-flex items-center gap-1 font-semibold'
                >
                  Etat
                  <ChevronDown className='size-3.5' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='min-w-40'>
                {statusOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setStatusFilter(opt.value)}
                    className={`mx-1 rounded-md px-3 py-1 text-base ${
                      statusFilter === opt.value
                        ? 'bg-emerald-600 font-semibold text-white'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>
          <TableHead>Département / Province</TableHead>
          <TableHead>Téléphone / fixe</TableHead>
          <TableHead>Date de création</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredRows.map((r, idx) => (
          <TableRow key={`${r.id}-${idx}`}>
            <TableCell>{r.id}</TableCell>
            <TableCell className='min-w-48'>{r.category}</TableCell>
            <TableCell className='min-w-40 capitalize'>{r.name}</TableCell>
            <TableCell>
              <Badge className='rounded-full bg-green-100 px-2 text-green-700'>
                {r.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className='leading-tight'>77</div>
              <div className='text-muted-foreground text-xs'>(77600)</div>
            </TableCell>
            <TableCell>
              <div className='leading-tight'>0687945635</div>
              <div className='text-muted-foreground text-xs'>0687945635</div>
            </TableCell>
            <TableCell>{r.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
