import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal } from "lucide-react"

interface LogEntry {
  time: string
  agent: string
  action: string
  status: "success" | "info" | "warning"
}

const logs: LogEntry[] = [
  { time: "10:42:31", agent: "SYS-CORE", action: "Insight Engine initialized v2.4", status: "info" },
  { time: "10:42:35", agent: "LIT-01", action: "Batch parse started: 2,400 PDFs", status: "info" },
  {
    time: "10:42:48",
    agent: "KNO-04",
    action: "Detected new entity relationship: [Protein-X] -> [Pathway-Y]",
    status: "success",
  },
  { time: "10:43:12", agent: "HYP-02", action: "Generating hypothesis based on recent findings...", status: "info" },
  { time: "10:43:15", agent: "HYP-02", action: "Hypothesis confidence score: 0.87 (High)", status: "success" },
  { time: "10:44:01", agent: "EXP-01", action: "Resource constrained: Simulation queue full", status: "warning" },
  { time: "10:44:22", agent: "LIT-01", action: "Completed parsing batch #42", status: "success" },
]

export function ActivityFeed() {
  return (
    <Card className="h-full bg-black border-border/60 font-mono text-sm">
      <CardHeader className="py-3 border-b border-border/40 bg-muted/20">
        <CardTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
          <Terminal className="h-4 w-4" />
          System Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <span className="text-muted-foreground/60 shrink-0">{log.time}</span>
                <span className="text-primary/80 font-bold shrink-0 w-20">{log.agent}</span>
                <span
                  className={
                    log.status === "success"
                      ? "text-green-400/90"
                      : log.status === "warning"
                        ? "text-yellow-400/90"
                        : "text-foreground/80"
                  }
                >
                  {log.action}
                </span>
              </div>
            ))}
            <div className="flex gap-3 text-xs animate-pulse">
              <span className="text-muted-foreground/60">10:44:25</span>
              <span className="text-primary/80 font-bold w-20">SYS</span>
              <span className="text-foreground/80">_</span>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
