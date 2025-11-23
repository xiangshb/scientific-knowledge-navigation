import { DashboardShell } from "@/components/dashboard-shell"
import { MetricsCard } from "@/components/metrics-card"
import { ActivityFeed } from "@/components/activity-feed"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Atom, BrainCircuit, Database, Globe, Sparkles, Users } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <DashboardShell>
      {/* Hero / Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 md:p-12 border border-white/10">
        <div className="relative z-10 max-w-3xl">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20"
          >
            System Online • v2.4.0
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Welcome to the <span className="text-primary">Scientific Insight Engine</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Accelerate your research with our autonomous discovery platform. Coordinate 180+ intelligent agents to parse
            literature, generate hypotheses, and simulate experiments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/knowledge-network">
              <Button size="lg" className="shadow-lg shadow-primary/20">
                Start Discovery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/agents">
              <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur">
                Manage Agents
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-20">
          <Atom className="h-64 w-64 text-blue-500 animate-spin-slow" />
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Knowledge Base"
          value="8.4M"
          change="+12.5%"
          trend="up"
          description="entities connected"
          icon={<Database className="h-4 w-4 text-blue-400" />}
        />
        <MetricsCard
          title="Active Agents"
          value="181"
          change="98% uptime"
          trend="neutral"
          description="across 15 types"
          icon={<Users className="h-4 w-4 text-green-400" />}
        />
        <MetricsCard
          title="Discoveries"
          value="24"
          change="+3 new"
          trend="up"
          description="this week"
          icon={<Sparkles className="h-4 w-4 text-purple-400" />}
        />
        <MetricsCard
          title="Global Collaboration"
          value="12"
          change="+2"
          trend="up"
          description="active labs"
          icon={<Globe className="h-4 w-4 text-orange-400" />}
        />
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card/50 hover:bg-card/80 transition-colors border-primary/20 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              Knowledge Network
            </CardTitle>
            <CardDescription>Visualize and explore scientific connections</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate interactive graphs from literature, explore causal relationships, and identify research gaps.
            </p>
            <Link href="/knowledge-network">
              <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                Enter Module <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card/50 hover:bg-card/80 transition-colors border-green-500/20 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
              Agent Ecosystem
            </CardTitle>
            <CardDescription>Manage your digital research workforce</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor agent performance, assign tasks, and configure the multi-agent collaboration parameters.
            </p>
            <Link href="/agents">
              <Button variant="ghost" className="w-full group-hover:bg-green-500/10">
                Manage Agents <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card/50 hover:bg-card/80 transition-colors border-purple-500/20 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
              Research Tasks
            </CardTitle>
            <CardDescription>Track and manage discovery projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create new research goals, track progress on existing projects, and view automated reports.
            </p>
            <Link href="/research">
              <Button variant="ghost" className="w-full group-hover:bg-purple-500/10">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Latest Discoveries Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Latest Insights & Discoveries</CardTitle>
            <CardDescription>Real-time findings from the autonomous research pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Novel Protein Folding Pathway Identified",
                  category: "Biochemistry",
                  confidence: "98.2%",
                  time: "2h ago",
                  color: "bg-blue-500",
                },
                {
                  title: "Potential Superconductor Candidate Material",
                  category: "Materials Science",
                  confidence: "87.5%",
                  time: "5h ago",
                  color: "bg-purple-500",
                },
                {
                  title: "Correlation Found: Gene Expression & Sleep Patterns",
                  category: "Genetics",
                  confidence: "92.1%",
                  time: "8h ago",
                  color: "bg-green-500",
                },
                {
                  title: "Anomaly Detected in Climate Model Region 4",
                  category: "Climate Science",
                  confidence: "99.9%",
                  time: "12h ago",
                  color: "bg-orange-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <div className={`mt-1 h-2 w-2 rounded-full ${item.color}`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-full bg-background border">{item.category}</span>
                      <span>
                        Confidence: <span className="text-foreground font-medium">{item.confidence}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed Sidebar */}
        <div className="space-y-6">
          <ActivityFeed />

          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">System Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Compute Nodes</span>
                  <span className="text-green-400">94% Optimal</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[94%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>API Rate Limits</span>
                  <span className="text-yellow-400">68% Used</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[68%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Memory Usage</span>
                  <span className="text-blue-400">42% Used</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[42%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
