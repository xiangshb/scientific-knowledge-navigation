"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Play, Pause, Settings } from "lucide-react"

// Mock data for agents based on the 15 types mentioned
const agents = [
  {
    id: "A001",
    name: "Literature Parser Alpha",
    type: "Data Ingestion",
    status: "Active",
    task: "Parsing 2.4k PDFs",
    progress: 67,
    health: 98,
    avatar: "LP",
  },
  {
    id: "A002",
    name: "Hypothesis Generator Beta",
    type: "Reasoning",
    status: "Idle",
    task: "Waiting for inputs",
    progress: 0,
    health: 100,
    avatar: "HG",
  },
  {
    id: "A003",
    name: "Causal Inference Engine",
    type: "Analysis",
    status: "Processing",
    task: "Building graph nodes",
    progress: 34,
    health: 92,
    avatar: "CI",
  },
  {
    id: "A004",
    name: "Exp. Simulator X1",
    type: "Simulation",
    status: "Warning",
    task: "High memory usage",
    progress: 89,
    health: 75,
    avatar: "ES",
  },
  {
    id: "A005",
    name: "Reviewer Bot",
    type: "Quality Control",
    status: "Active",
    task: "Validating results",
    progress: 12,
    health: 99,
    avatar: "RB",
  },
  {
    id: "A006",
    name: "Data Visualizer",
    type: "Presentation",
    status: "Active",
    task: "Rendering chart",
    progress: 95,
    health: 100,
    avatar: "DV",
  },
]

export function AgentGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {agents.map((agent) => (
        <Card
          key={agent.id}
          className="overflow-hidden border-l-4 border-l-transparent hover:border-l-primary transition-all"
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border bg-muted">
                <AvatarFallback>{agent.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">{agent.name}</CardTitle>
                <div className="text-xs text-muted-foreground">{agent.type}</div>
              </div>
            </div>
            <Badge
              variant={
                agent.status === "Active" || agent.status === "Processing"
                  ? "default"
                  : agent.status === "Warning"
                    ? "destructive"
                    : "secondary"
              }
              className="text-[10px] px-2 py-0"
            >
              {agent.status}
            </Badge>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Current Task</span>
                <span className="font-medium">{agent.task}</span>
              </div>
              <Progress value={agent.progress} className="h-1.5" />
              <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>Health: {agent.health}%</span>
                <span>ID: {agent.id}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-3 flex justify-between">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Settings className="h-3.5 w-3.5" />
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                Logs
              </Button>
              <Button
                size="sm"
                className={`h-7 w-7 p-0 ${agent.status === "Idle" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
              >
                {agent.status === "Idle" ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
