import {
  ChartNoAxesCombined,
  FileText,
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
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'

export default function Dashboard() {
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
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Table de bord</h1>
          <div className='flex items-center space-x-2'>
            <Button>
              <Plus className='h-4 w-4' />
              Add lead
            </Button>
          </div>
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
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total leads
                  </CardTitle>
                  <Users className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$45,231.89</div>
                  <p className='text-muted-foreground text-xs'>
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Clients</CardTitle>
                  <UserRoundCheck className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+2350</div>
                  <p className='text-muted-foreground text-xs'>
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Devis créé
                  </CardTitle>
                  <FileText className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+12,234</div>
                  <p className='text-muted-foreground text-xs'>
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Taux de conversion
                  </CardTitle>
                  <ChartNoAxesCombined className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-muted-foreground text-xs'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
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
