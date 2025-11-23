import { DashboardShell } from "@/components/dashboard-shell"
import { MetricsCard } from "@/components/metrics-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Briefcase, 
  Plus, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Timer
} from "lucide-react"

export default function ResearchPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Research Management</h1>
            <p className="text-muted-foreground">
              Track and manage autonomous research projects and discovery initiatives.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Active Projects"
            value="24"
            change="+3 this week"
            trend="up"
            description="across 8 domains"
            icon={<Briefcase className="h-4 w-4 text-blue-400" />}
          />
          <MetricsCard
            title="Completion Rate"
            value="87%"
            change="+5.2%"
            trend="up"
            description="monthly average"
            icon={<TrendingUp className="h-4 w-4 text-green-400" />}
          />
          <MetricsCard
            title="Research Hours"
            value="1,847"
            change="+124h"
            trend="up"
            description="this month"
            icon={<Clock className="h-4 w-4 text-purple-400" />}
          />
          <MetricsCard
            title="Team Members"
            value="42"
            change="+2 new"
            trend="up"
            description="across 12 labs"
            icon={<Users className="h-4 w-4 text-orange-400" />}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="active">Active Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button variant="ghost" size="sm">
                Priority
              </Button>
              <Button variant="ghost" size="sm">
                Deadline
              </Button>
            </div>
          </div>

          <TabsContent value="active" className="space-y-4">
            {/* Active Research Projects */}
            <div className="grid gap-4">
              {[
                {
                  id: 1,
                  title: "Novel Protein Folding Pathway Analysis",
                  domain: "Biochemistry",
                  status: "in-progress",
                  priority: "high",
                  progress: 68,
                  deadline: "2024-12-15",
                  team: ["Dr. Sarah Chen", "AI Agent Alpha", "AI Agent Beta"],
                  lastUpdate: "2 hours ago",
                  confidence: "92.3%"
                },
                {
                  id: 2,
                  title: "Quantum Computing Applications in Drug Discovery",
                  domain: "Computational Chemistry",
                  status: "in-progress",
                  priority: "critical",
                  progress: 45,
                  deadline: "2024-12-01",
                  team: ["Prof. James Liu", "AI Agent Gamma"],
                  lastUpdate: "5 hours ago",
                  confidence: "87.1%"
                },
                {
                  id: 3,
                  title: "Climate Model Validation Study",
                  domain: "Environmental Science",
                  status: "review",
                  priority: "medium",
                  progress: 92,
                  deadline: "2024-11-28",
                  team: ["Dr. Maria Rodriguez", "AI Agent Delta"],
                  lastUpdate: "1 day ago",
                  confidence: "95.7%"
                },
                {
                  id: 4,
                  title: "Machine Learning for Genetic Variant Prediction",
                  domain: "Genomics",
                  status: "in-progress",
                  priority: "high",
                  progress: 73,
                  deadline: "2024-12-10",
                  team: ["Dr. Alex Kumar", "AI Agent Epsilon"],
                  lastUpdate: "3 hours ago",
                  confidence: "89.4%"
                }
              ].map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{project.domain}</Badge>
                          <Badge 
                            variant={project.priority === "critical" ? "destructive" : 
                                   project.priority === "high" ? "default" : "secondary"}
                          >
                            {project.priority} priority
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {project.status === "in-progress" && <Timer className="h-3 w-3" />}
                            {project.status === "review" && <AlertCircle className="h-3 w-3" />}
                            {project.status === "completed" && <CheckCircle className="h-3 w-3" />}
                            {project.status.replace("-", " ")}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Deadline</span>
                        <div className="font-medium">{project.deadline}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Team Size</span>
                        <div className="font-medium">{project.team.length} members</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Confidence</span>
                        <div className="font-medium">{project.confidence}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Update</span>
                        <div className="font-medium">{project.lastUpdate}</div>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <div
                            key={index}
                            className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center"
                            title={member}
                          >
                            <span className="text-xs font-medium">
                              {member.includes("AI") ? "AI" : member.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs font-medium">+{project.team.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/10 border-dashed">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No completed projects yet</h3>
                <p className="text-muted-foreground">Completed research projects will appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/10 border-dashed">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No archived projects</h3>
                <p className="text-muted-foreground">Archived research projects will appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/10 border-dashed">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Research Templates</h3>
                <p className="text-muted-foreground">Create templates for common research patterns</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}