"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Maximize2, ZoomIn, ZoomOut, RefreshCw, Layers } from "lucide-react"

interface DragState {
  isDragging: boolean
  nodeId: string | null
  startX: number
  startY: number
}

interface Node {
  id: string
  x: number
  y: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
  type: "entity" | "concept" | "method"
  label: string
  radius: number
}

interface Link {
  source: string
  target: string
  type: string
}

export function GraphVisualizer({ data }: { data?: { nodes: Node[]; links: Link[] } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const particles = useRef<{ x: number; y: number; tx: number; ty: number; speed: number; progress: number }[]>([])

  const dragRef = useRef<DragState>({ isDragging: false, nodeId: null, startX: 0, startY: 0 })
  const transformRef = useRef({ x: 0, y: 0, k: 1 }) // Pan and zoom transform

  useEffect(() => {
    if (data) {
      setNodes(data.nodes)
      setLinks(data.links)
    } else {
      const mockNodes: Node[] = [
        {
          id: "1",
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          type: "concept",
          label: "CRISPR-Cas9",
          radius: 40,
        },
        {
          id: "2",
          x: window.innerWidth / 2 - 150,
          y: window.innerHeight / 2 - 100,
          type: "entity",
          label: "Gene Editing",
          radius: 25,
        },
        {
          id: "3",
          x: window.innerWidth / 2 + 150,
          y: window.innerHeight / 2 - 100,
          type: "method",
          label: "DNA Cleavage",
          radius: 25,
        },
        {
          id: "4",
          x: window.innerWidth / 2 - 100,
          y: window.innerHeight / 2 + 150,
          type: "entity",
          label: "Off-target Effects",
          radius: 30,
        },
        {
          id: "5",
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2 + 150,
          type: "method",
          label: "sgRNA Design",
          radius: 20,
        },
      ]

      const mockLinks: Link[] = [
        { source: "1", target: "2", type: "enables" },
        { source: "1", target: "3", type: "performs" },
        { source: "1", target: "4", type: "causes" },
        { source: "5", target: "1", type: "guides" },
      ]

      setNodes(mockNodes)
      setLinks(mockLinks)
    }
  }, [data])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: (e.clientX - rect.left - transformRef.current.x) / transformRef.current.k,
        y: (e.clientY - rect.top - transformRef.current.y) / transformRef.current.k,
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getMousePos(e)

      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i]
        const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
        if (dist <= node.radius) {
          dragRef.current = {
            isDragging: true,
            nodeId: node.id,
            startX: x,
            startY: y,
          }
          node.fx = node.x
          node.fy = node.y
          node.vx = 0
          node.vy = 0
          return
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging || !dragRef.current.nodeId) return

      const { x, y } = getMousePos(e)
      const node = nodes.find((n) => n.id === dragRef.current.nodeId)
      if (node) {
        node.fx = x
        node.fy = y
      }
    }

    const handleMouseUp = () => {
      if (dragRef.current.nodeId) {
        const node = nodes.find((n) => n.id === dragRef.current.nodeId)
        if (node) {
          node.fx = null
          node.fy = null
        }
      }
      dragRef.current = { isDragging: false, nodeId: null, startX: 0, startY: 0 }
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [nodes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const simulationTick = () => {
      const repulsion = 500
      const springLength = 150
      const springStrength = 0.05
      const centerStrength = 0.01
      const maxVelocity = 2

      nodes.forEach((node, i) => {
        if (node.fx !== null && node.fx !== undefined) {
          node.x = node.fx
          node.y = node.fy!
          return
        }

        let dx = 0,
          dy = 0

        dx += (canvas.width / 2 - node.x) * centerStrength
        dy += (canvas.height / 2 - node.y) * centerStrength

        nodes.forEach((other, j) => {
          if (i === j) return
          const diffX = node.x - other.x
          const diffY = node.y - other.y
          const dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1
          if (dist < 300) {
            const force = repulsion / (dist * dist)
            dx += (diffX / dist) * force
            dy += (diffY / dist) * force
          }
        })

        links.forEach((link) => {
          if (link.source === node.id || link.target === node.id) {
            const otherId = link.source === node.id ? link.target : link.source
            const other = nodes.find((n) => n.id === otherId)
            if (other) {
              const diffX = other.x - node.x
              const diffY = other.y - node.y
              const dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1
              const force = (dist - springLength) * springStrength
              dx += (diffX / dist) * force
              dy += (diffY / dist) * force
            }
          }
        })

        const time = Date.now() / 1000
        dx += Math.sin(time + Number.parseInt(node.id)) * 0.1
        dy += Math.cos(time + Number.parseInt(node.id)) * 0.1

        node.vx = (node.vx || 0) * 0.9 + dx * 0.05
        node.vy = (node.vy || 0) * 0.9 + dy * 0.05

        const v = Math.sqrt(node.vx ** 2 + node.vy ** 2)
        if (v > maxVelocity) {
          node.vx = (node.vx / v) * maxVelocity
          node.vy = (node.vy / v) * maxVelocity
        }

        node.x += node.vx
        node.y += node.vy
      })
    }

    const render = () => {
      simulationTick()

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )
      gradient.addColorStop(0, "#0f172a") // Slate 900
      gradient.addColorStop(1, "#020617") // Slate 950
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(148, 163, 184, 0.05)"
      ctx.lineWidth = 1
      const gridSize = 50
      const offsetX = (Date.now() / 100) % gridSize
      const offsetY = (Date.now() / 100) % gridSize

      for (let x = offsetX; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      links.forEach((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source)
        const targetNode = nodes.find((n) => n.id === link.target)
        if (sourceNode && targetNode) {
          ctx.beginPath()
          ctx.moveTo(sourceNode.x, sourceNode.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.strokeStyle = "rgba(56, 189, 248, 0.15)" // Sky blue low opacity
          ctx.lineWidth = 1 // Thinner lines for elegance
          ctx.stroke()

          if (Math.random() < 0.03) {
            particles.current.push({
              x: sourceNode.x,
              y: sourceNode.y,
              tx: targetNode.x,
              ty: targetNode.y,
              speed: 0.02 + Math.random() * 0.02,
              progress: 0,
            })
          }
        }
      })

      particles.current.forEach((p, index) => {
        p.progress += p.speed
        if (p.progress >= 1) {
          particles.current.splice(index, 1)
          return
        }
        const currentX = p.x + (p.tx - p.x) * p.progress
        const currentY = p.y + (p.ty - p.y) * p.progress

        ctx.beginPath()
        ctx.arc(currentX, currentY, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = "#38bdf8" // Sky blue
        ctx.fill()
        ctx.shadowColor = "#38bdf8"
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
      })

      nodes.forEach((node) => {
        const pulse = Math.sin(Date.now() / 1500 + Number.parseInt(node.id)) * 3

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 6 + pulse, 0, 2 * Math.PI)
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)

        if (node.type === "concept") {
          ctx.fillStyle = "rgba(6, 182, 212, 0.2)" // Cyan background
          ctx.strokeStyle = "rgba(6, 182, 212, 0.8)" // Cyan border
          ctx.shadowColor = "rgba(6, 182, 212, 0.5)"
        } else if (node.type === "entity") {
          ctx.fillStyle = "rgba(16, 185, 129, 0.2)" // Emerald
          ctx.strokeStyle = "rgba(16, 185, 129, 0.8)"
          ctx.shadowColor = "rgba(16, 185, 129, 0.5)"
        } else {
          ctx.fillStyle = "rgba(139, 92, 246, 0.2)" // Violet
          ctx.strokeStyle = "rgba(139, 92, 246, 0.8)"
          ctx.shadowColor = "rgba(139, 92, 246, 0.5)"
        }

        ctx.shadowBlur = 15
        ctx.fill()
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.shadowBlur = 0

        ctx.beginPath()
        ctx.arc(node.x - node.radius / 3, node.y - node.radius / 3, node.radius / 4, 0, 2 * Math.PI)
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.fill()

        const textWidth = ctx.measureText(node.label).width
        ctx.fillStyle = "rgba(15, 23, 42, 0.8)" // Darker bg for text
        ctx.beginPath()
        ctx.roundRect(node.x - textWidth / 2 - 6, node.y + node.radius + 8, textWidth + 12, 20, 4)
        ctx.fill()

        ctx.fillStyle = "#e2e8f0" // Slate 200
        ctx.font = "500 12px Inter"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, node.x, node.y + node.radius + 18)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [nodes, links])

  return (
    <div className="w-full h-full relative bg-[#020617] overflow-hidden cursor-move">
      <canvas ref={canvasRef} className="absolute inset-0 block touch-none" />

      <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900/50 backdrop-blur border-white/10 hover:bg-white/10 text-cyan-400"
        >
          <Layers className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900/50 backdrop-blur border-white/10 hover:bg-white/10 text-emerald-400"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
        <div className="h-4" />
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900/50 backdrop-blur border-white/10 hover:bg-white/10 text-slate-200"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900/50 backdrop-blur border-white/10 hover:bg-white/10 text-slate-200"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900/50 backdrop-blur border-white/10 hover:bg-white/10 text-slate-200"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute bottom-8 left-8 p-4 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/5 text-xs space-y-3 z-10 pointer-events-none select-none">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
          <span className="text-slate-300 font-medium">Concepts & Theories</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
          <span className="text-slate-300 font-medium">Entities & Objects</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]"></div>
          <span className="text-slate-300 font-medium">Methods & Data</span>
        </div>
      </div>
    </div>
  )
}
