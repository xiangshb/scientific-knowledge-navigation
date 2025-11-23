"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Maximize2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export function KnowledgeGraphPlaceholder() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Simple node simulation
    const nodes: { x: number; y: number; vx: number; vy: number; color: string }[] = []
    const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"]

    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const render = () => {
      ctx.fillStyle = "#00000000" // Transparent clear
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update positions & draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
        // Glow
        ctx.shadowBlur = 8
        ctx.shadowColor = node.color
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <Card className="col-span-4 lg:col-span-2 bg-card/50 border-border/60 overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            Knowledge Network
          </CardTitle>
          <CardDescription>Real-time semantic mapping and entity linking</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-1 relative min-h-[300px]">
        <canvas ref={canvasRef} width={800} height={400} className="w-full h-full object-cover absolute inset-0" />
        <div className="absolute bottom-4 left-4 flex gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Literature
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Concepts
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Methods
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
