import type { ComponentType, SVGProps } from 'react'
import { useMemo, useRef, useState } from 'react'
import {
  ChartNoAxesCombined,
  FileText,
  MoreHorizontal,
  Move,
  Plus,
  UserRoundCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'

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
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
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
