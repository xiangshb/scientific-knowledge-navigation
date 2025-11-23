"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Database, FileText, Code, Share2 } from "lucide-react"

const agents = [
  {
    id: "LIT-01",
    name: "Literature Parser",
    type: "Parsing",
    status: "active",
    task: "Analyzing 'Nature 2024' dataset",
    load: 85,
  },
  {
    id: "KNO-04",
    name: "Knowledge Extractor",
    type: "Extraction",
    status: "active",
    task: "Entity linking in BioMed",
    load: 62,
  },
  {
    id: "HYP-02",
    name: "Hypothesis Generator",
    type: "Reasoning",
    status: "idle",
    task: "Waiting for input",
    load: 12,
  },
  {
    id: "EXP-01",
    name: "Exp. Designer",
    type: "Planning",
    status: "active",
    task: "Optimizing PCR protocol",
    load: 45,
  },
  {
    id: "COD-09",
    name: "Code Writer",
    type: "Execution",
    status: "active",
    task: "Generating Python notebook",
    load: 78,
  },
  { id: "REV-03", name: "Quality Reviewer", type: "Review", status: "active", task: "Validating results", load: 33 },
]

export function AgentMonitor() {
  return (
    <Card className="col-span-3 bg-card/50 border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Agent Ecosystem</CardTitle>
            <CardDescription>Real-time monitoring of autonomous research agents</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            181 Agents Online
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group relative flex flex-col gap-3 rounded-lg border bg-card p-4 transition-all hover:bg-accent/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-md ${
                      agent.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <GetIconForType type={agent.type} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{agent.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{agent.id}</div>
                  </div>
                </div>
                <div
                  className={`h-2 w-2 rounded-full ${
                    agent.status === "active" ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Current Task</span>
                  <span className="text-muted-foreground">{agent.load}% Load</span>
                </div>
                <div className="text-xs font-medium truncate">{agent.task}</div>
                <div className="h-1 w-full bg-muted overflow-hidden rounded-full mt-2">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${agent.load}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function GetIconForType({ type }: { type: string }) {
  switch (type) {
    case "Parsing":
      return <FileText className="h-4 w-4" />
    case "Extraction":
      return <Database className="h-4 w-4" />
    case "Reasoning":
      return <BrainCircuitIcon className="h-4 w-4" /> // Custom icon below
    case "Planning":
      return <Share2 className="h-4 w-4" />
    case "Execution":
      return <Code className="h-4 w-4" />
    case "Review":
      return <Activity className="h-4 w-4" />
    default:
      return <Zap className="h-4 w-4" />
  }
}

function BrainCircuitIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.97-1.375" />
      <path d="M19.97 16.625A4 4 0 0 1 18 18" />
    </svg>
  )
}
