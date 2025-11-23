"use client"

import { useState } from "react"
// import { DashboardShell } from "@/components/dashboard-shell"
import { GraphVisualizer } from "@/components/knowledge-network/graph-visualizer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Sparkles, BrainCircuit, Activity, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ModelConfigPanel } from "@/components/knowledge-network/model-config-panel"
import { generateNetworkFromText } from "@/actions/generate-network"
import Link from "next/link"

export default function KnowledgeNetworkPage() {
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [graphData, setGraphData] = useState<any>(null)

  const handleGenerate = async () => {
    if (!inputText.trim()) return
    setIsProcessing(true)
    try {
      // Call the server action that uses the config file
      const data = await generateNetworkFromText(inputText)
      setGraphData(data)
    } catch (error) {
      console.error("Failed to generate network", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Background Visualization Layer - Full Screen */}
      <div className="absolute inset-0 z-0">
        <GraphVisualizer data={graphData} />
      </div>

      {/* Navigation - Floating Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 gap-2 pl-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Button>
        </Link>
      </div>

      {/* Floating Control Panel (Top Left, below Back button) */}
      <div className="absolute top-20 left-6 z-10 w-[380px] flex flex-col gap-4">
        {/* Main Input Card */}
        <div className="bg-black/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-5 shadow-2xl transition-all hover:border-white/10 group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <BrainCircuit className="w-5 h-5 text-blue-400" />
              </div>
              <span className="font-semibold text-white tracking-wide">Insight Engine</span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5 rounded-full"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-950/90 border-white/10 backdrop-blur-xl sm:rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Model Configuration</DialogTitle>
                </DialogHeader>
                <ModelConfigPanel />
              </DialogContent>
            </Dialog>
          </div>

          <Textarea
            placeholder="Paste research papers, abstracts, or raw data here..."
            className="min-h-[120px] bg-white/5 border-transparent focus:bg-white/10 focus:border-white/10 focus-visible:ring-0 resize-none text-sm mb-4 rounded-xl text-gray-300 placeholder:text-gray-600 transition-all"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              MiniMax-M2 Active
            </div>
            <Button
              size="sm"
              onClick={handleGenerate}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all rounded-lg px-6"
            >
              {isProcessing ? (
                <>
                  <Activity className="w-3 h-3 mr-2 animate-spin" />
                  Parsing...
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 mr-2" />
                  Generate Graph
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Status / Log Mini-panel */}
        {isProcessing && (
          <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-4 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Initialization</span>
                <span className="text-emerald-400">Complete</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Semantic Extraction</span>
                <span className="animate-pulse text-blue-400 font-medium">Processing...</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-progress w-[60%] blur-[1px]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
