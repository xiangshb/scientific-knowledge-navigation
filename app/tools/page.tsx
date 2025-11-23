"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { MetricsCard } from "@/components/metrics-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { 
  Wrench, 
  Plus, 
  Settings,
  Zap,
  Database,
  Brain,
  Search,
  Filter,
  RefreshCw,
  Activity,
  Play,
  Pause,
  MoreHorizontal,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Cpu,
  Globe,
  FileText,
  BarChart3
} from "lucide-react"

export default function ToolsPage() {
  const [enabledTools, setEnabledTools] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: true,
    6: true
  })

  const handleToggle = (toolId: number) => {
    setEnabledTools(prev => ({
      ...prev,
      [toolId]: !prev[toolId]
    }))
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tool Ecosystem</h1>
            <p className="text-muted-foreground">
              Manage and configure specialized tools for research automation and data processing.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Install Tool
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Active Tools"
            value="47"
            change="+3 this week"
            trend="up"
            description="across 12 categories"
            icon={<Wrench className="h-4 w-4 text-blue-400" />}
          />
          <MetricsCard
            title="Tool Usage"
            value="18.2K"
            change="+24.5%"
            trend="up"
            description="executions today"
            icon={<Activity className="h-4 w-4 text-green-400" />}
          />
          <MetricsCard
            title="Success Rate"
            value="96.8%"
            change="+1.2%"
            trend="up"
            description="monthly average"
            icon={<CheckCircle className="h-4 w-4 text-purple-400" />}
          />
          <MetricsCard
            title="Processing Time"
            value="1.2s"
            change="-0.3s"
            trend="up"
            description="average execution"
            icon={<Clock className="h-4 w-4 text-orange-400" />}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="installed" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="installed">Installed</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button variant="ghost" size="sm">
                Usage
              </Button>
              <Button variant="ghost" size="sm">
                Name
              </Button>
            </div>
          </div>

          <TabsContent value="installed" className="space-y-4">
            {/* Installed Tools Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 1,
                  name: "Data Processor",
                  category: "Data Analysis",
                  description: "Advanced data processing and transformation tool for research datasets",
                  status: "active",
                  usage: 1847,
                  version: "v2.4.1",
                  lastUsed: "2 hours ago",
                  icon: <Database className="h-8 w-8 text-blue-500" />
                },
                {
                  id: 2,
                  name: "Neural Network Builder",
                  category: "Machine Learning",
                  description: "Create and train custom neural networks for research applications",
                  status: "active",
                  usage: 1234,
                  version: "v3.1.0",
                  lastUsed: "5 hours ago",
                  icon: <Brain className="h-8 w-8 text-purple-500" />
                },
                {
                  id: 3,
                  name: "Literature Scanner",
                  category: "Research",
                  description: "Automated literature review and citation analysis tool",
                  status: "active",
                  usage: 982,
                  version: "v1.8.3",
                  lastUsed: "1 day ago",
                  icon: <FileText className="h-8 w-8 text-green-500" />
                },
                {
                  id: 4,
                  name: "API Connector",
                  category: "Integration",
                  description: "Connect to external APIs and data sources",
                  status: "inactive",
                  usage: 456,
                  version: "v1.2.0",
                  lastUsed: "3 days ago",
                  icon: <Globe className="h-8 w-8 text-orange-500" />
                },
                {
                  id: 5,
                  name: "Performance Monitor",
                  category: "System",
                  description: "Real-time system performance and resource monitoring",
                  status: "active",
                  usage: 2341,
                  version: "v2.0.1",
                  lastUsed: "1 hour ago",
                  icon: <BarChart3 className="h-8 w-8 text-red-500" />
                },
                {
                  id: 6,
                  name: "Query Optimizer",
                  category: "Database",
                  description: "Optimize database queries for faster data retrieval",
                  status: "active",
                  usage: 789,
                  version: "v1.5.2",
                  lastUsed: "6 hours ago",
                  icon: <Search className="h-8 w-8 text-cyan-500" />
                }
              ].map((tool) => (
                <Card key={tool.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{tool.category}</Badge>
                            <Badge 
                              variant={tool.status === "active" ? "default" : "secondary"}
                            >
                              {tool.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    
                    {/* Tool Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Usage</span>
                        <div className="font-medium">{tool.usage.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Version</span>
                        <div className="font-medium">{tool.version}</div>
                      </div>
                    </div>

                    {/* Last Used */}
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last used: </span>
                      <span className="font-medium">{tool.lastUsed}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={enabledTools[tool.id] || false}
                          onCheckedChange={() => handleToggle(tool.id)}
                        />
                        <span className="text-sm">{enabledTools[tool.id] ? "Enabled" : "Disabled"}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {tool.status === "active" ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Climate Data Analyzer",
                  category: "Environmental Science",
                  description: "Analyze climate patterns and environmental data",
                  rating: 4.8,
                  downloads: 1234,
                  size: "12.3 MB"
                },
                {
                  name: "Genome Sequencer",
                  category: "Bioinformatics",
                  description: "Process and analyze genomic sequences",
                  rating: 4.6,
                  downloads: 892,
                  size: "45.7 MB"
                },
                {
                  name: "Quantum Simulator",
                  category: "Physics",
                  description: "Simulate quantum computing scenarios",
                  rating: 4.9,
                  downloads: 567,
                  size: "23.1 MB"
                }
              ].map((tool, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{tool.category}</Badge>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{tool.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Downloads</span>
                        <div className="font-medium">{tool.downloads.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size</span>
                        <div className="font-medium">{tool.size}</div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Install Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Data Analysis",
                  count: 12,
                  description: "Tools for data processing and statistical analysis",
                  color: "bg-blue-500",
                  icon: <BarChart3 className="h-6 w-6" />
                },
                {
                  name: "Machine Learning",
                  count: 8,
                  description: "AI and ML model training and deployment tools",
                  color: "bg-purple-500",
                  icon: <Brain className="h-6 w-6" />
                },
                {
                  name: "Research",
                  count: 15,
                  description: "Literature review and research assistance tools",
                  color: "bg-green-500",
                  icon: <FileText className="h-6 w-6" />
                },
                {
                  name: "Integration",
                  count: 6,
                  description: "API connectors and integration utilities",
                  color: "bg-orange-500",
                  icon: <Globe className="h-6 w-6" />
                },
                {
                  name: "System",
                  count: 4,
                  description: "System monitoring and optimization tools",
                  color: "bg-red-500",
                  icon: <Cpu className="h-6 w-6" />
                },
                {
                  name: "Database",
                  count: 7,
                  description: "Database management and query tools",
                  color: "bg-cyan-500",
                  icon: <Database className="h-6 w-6" />
                }
              ].map((category, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <Badge variant="secondary">{category.count} tools</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <Button variant="outline" className="w-full">
                      View Category
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>External Integrations</CardTitle>
                  <CardDescription>Connect with external services and platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "OpenAI API", status: "connected", type: "AI Service" },
                    { name: "Google Scholar", status: "connected", type: "Research Database" },
                    { name: "PubMed", status: "disconnected", type: "Medical Database" },
                    { name: "arXiv", status: "connected", type: "Research Archive" }
                  ].map((integration, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">{integration.type}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          integration.status === "connected" ? "bg-green-500" : "bg-red-500"
                        }`} />
                        <Badge 
                          variant={integration.status === "connected" ? "default" : "secondary"}
                        >
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Usage Statistics</CardTitle>
                  <CardDescription>Monitor API call usage and limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily API Calls</span>
                      <span className="text-blue-400">8,234 / 10,000</span>
                    </div>
                    <Progress value={82.34} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span className="text-yellow-400">45.2 GB / 100 GB</span>
                    </div>
                    <Progress value={45.2} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Concurrent Requests</span>
                      <span className="text-green-400">23 / 50</span>
                    </div>
                    <Progress value={46} className="h-2" />
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