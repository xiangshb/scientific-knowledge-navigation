"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BrainCircuit, FileText, Sparkles, ArrowRight } from "lucide-react"

export function NetworkBuilder() {
  const [text, setText] = useState("")

  return (
    <div className="grid grid-cols-1 gap-6 h-full">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Input Source
          </CardTitle>
          <CardDescription>Enter scientific text, abstracts, or upload papers to extract knowledge.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <Textarea
            placeholder="Paste scientific abstract or text here..."
            className="min-h-[200px] flex-1 font-mono text-sm bg-background/50 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Load Example 1
              </Button>
              <Button variant="outline" size="sm">
                Load Example 2
              </Button>
            </div>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Extract & Build Network
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            Extraction Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full rounded-md border border-border bg-black/20 p-4">
            <div className="space-y-2 text-sm font-mono">
              <div className="text-muted-foreground flex gap-2">
                <span className="text-blue-500">[10:42:15]</span>
                <span>System initialized. Waiting for input...</span>
              </div>
              {/* Placeholder logs */}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
