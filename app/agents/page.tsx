import { DashboardShell } from "@/components/dashboard-shell"
import { AgentGrid } from "@/components/agents/agent-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, RefreshCw, Zap, Activity } from "lucide-react"

export default function AgentsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agent Management</h1>
            <p className="text-muted-foreground">
              Monitor and control the 181 intelligent agents powering the platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Deploy New Agent
            </Button>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-500">Total Active Agents</CardTitle>
              <Zap className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142/181</div>
              <p className="text-xs text-muted-foreground">78% utilization rate</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-500">System Health</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">All systems nominal</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-500">Tasks Pending</CardTitle>
              <RefreshCw className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">Estimated clearance: 12m</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Main Content */}
        <Tabs defaultValue="grid" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="topology">Topology</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <Button variant="ghost" size="sm">
                Type
              </Button>
              <Button variant="ghost" size="sm">
                Status
              </Button>
            </div>
          </div>

          <TabsContent value="grid" className="space-y-4">
            <AgentGrid />
          </TabsContent>

          <TabsContent value="list">
            <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/10 border-dashed">
              <p className="text-muted-foreground">List view implementation pending</p>
            </div>
          </TabsContent>

          <TabsContent value="topology">
            <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/10 border-dashed">
              <p className="text-muted-foreground">Agent topology visualization pending</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
