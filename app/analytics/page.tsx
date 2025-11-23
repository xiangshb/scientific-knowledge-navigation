import { DashboardShell } from "@/components/dashboard-shell"
import { MetricsCard } from "@/components/metrics-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Activity,
  Users,
  Database,
  Zap,
  Eye,
  MousePointer,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search
} from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Center</h1>
            <p className="text-muted-foreground">
              Monitor platform performance, user engagement, and research insights.
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7d">
              <SelectTrigger className="w-[140px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Total Users"
            value="2,847"
            change="+12.5%"
            trend="up"
            description="active researchers"
            icon={<Users className="h-4 w-4 text-blue-400" />}
          />
          <MetricsCard
            title="Research Queries"
            value="18.4K"
            change="+23.1%"
            trend="up"
            description="this month"
            icon={<Search className="h-4 w-4 text-green-400" />}
          />
          <MetricsCard
            title="Data Processed"
            value="847GB"
            change="-5.2%"
            trend="down"
            description="daily average"
            icon={<Database className="h-4 w-4 text-purple-400" />}
          />
          <MetricsCard
            title="System Uptime"
            value="99.9%"
            change="+0.1%"
            trend="up"
            description="monthly average"
            icon={<Activity className="h-4 w-4 text-orange-400" />}
          />
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">Research Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* User Activity Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    User Activity Trends
                  </CardTitle>
                  <CardDescription>Daily active users and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/10">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-400 mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive chart visualization</p>
                      <p className="text-sm text-muted-foreground">User activity over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Metrics */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Top Domains</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Biochemistry", count: 342, change: "+12%" },
                      { name: "Machine Learning", count: 289, change: "+8%" },
                      { name: "Climate Science", count: 234, change: "+15%" },
                      { name: "Quantum Physics", count: 187, change: "-3%" }
                    ].map((domain, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm font-medium">{domain.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{domain.count}</span>
                          <Badge 
                            variant={domain.change.startsWith('+') ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {domain.change}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">System Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage</span>
                        <span className="text-green-400">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memory</span>
                        <span className="text-yellow-400">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Storage</span>
                        <span className="text-blue-400">55%</span>
                      </div>
                      <Progress value={55} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Feature Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage Statistics</CardTitle>
                  <CardDescription>How users interact with platform features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { feature: "Knowledge Network", usage: 1847, percentage: 78, icon: <Database className="h-4 w-4" /> },
                      { feature: "Agent Management", usage: 1234, percentage: 52, icon: <Users className="h-4 w-4" /> },
                      { feature: "Model Testing", usage: 982, percentage: 41, icon: <Zap className="h-4 w-4" /> },
                      { feature: "Research Projects", usage: 756, percentage: 32, icon: <BarChart3 className="h-4 w-4" /> }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <span className="text-sm font-medium">{item.feature}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{item.usage.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{item.percentage}% of users</div>
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement Metrics</CardTitle>
                  <CardDescription>Session duration and interaction patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold">24m</div>
                        <div className="text-sm text-muted-foreground">Avg. Session</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">3.2</div>
                        <div className="text-sm text-muted-foreground">Pages/Session</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold">68%</div>
                        <div className="text-sm text-muted-foreground">Return Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">4.7</div>
                        <div className="text-sm text-muted-foreground">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bounce Rate</span>
                      <div className="flex items-center gap-1">
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">32%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Task Completion</span>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">87%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Response Times */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">API Response Times</CardTitle>
                  <CardDescription>Average response times (ms)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { endpoint: "Knowledge Query", time: 142, status: "good" },
                    { endpoint: "Agent Tasks", time: 234, status: "good" },
                    { endpoint: "Model Inference", time: 892, status: "warning" },
                    { endpoint: "Data Processing", time: 567, status: "good" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{item.endpoint}</span>
                      <Badge 
                        variant={item.status === "good" ? "default" : "secondary"}
                      >
                        {item.time}ms
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Error Rates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Error Rates</CardTitle>
                  <CardDescription>System error distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "4xx Errors", count: 23, rate: "0.8%" },
                    { type: "5xx Errors", count: 5, rate: "0.2%" },
                    { type: "Timeouts", count: 12, rate: "0.4%" },
                    { type: "Rate Limits", count: 47, rate: "1.6%" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{item.type}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{item.count}</div>
                        <div className="text-xs text-muted-foreground">{item.rate}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resource Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resource Utilization</CardTitle>
                  <CardDescription>Current system resource usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compute Nodes</span>
                      <span className="text-green-400">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Database Connections</span>
                      <span className="text-yellow-400">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cache Hit Rate</span>
                      <span className="text-blue-400">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Research Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Emerging Research Trends</CardTitle>
                  <CardDescription>Most active research areas and topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { trend: "AI in Drug Discovery", growth: "+45%", papers: 234, confidence: "92%" },
                      { trend: "Climate Modeling", growth: "+32%", papers: 189, confidence: "87%" },
                      { trend: "Quantum Computing", growth: "+28%", papers: 156, confidence: "78%" },
                      { trend: "Synthetic Biology", growth: "+24%", papers: 143, confidence: "85%" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg border">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm">{item.trend}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Growth: {item.growth}</span>
                            <span>Papers: {item.papers}</span>
                            <span>Confidence: {item.confidence}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Collaboration Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Collaboration Insights</CardTitle>
                  <CardDescription>Research collaboration patterns and networks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 border-2 border-dashed rounded-lg bg-muted/10">
                      <Users className="h-12 w-12 text-muted-400 mx-auto mb-4" />
                      <p className="text-muted-foreground">Collaboration network visualization</p>
                      <p className="text-sm text-muted-foreground">Interactive graph of research partnerships</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">47</div>
                        <div className="text-sm text-muted-foreground">Active Labs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">234</div>
                        <div className="text-sm text-muted-foreground">Collaborations</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}