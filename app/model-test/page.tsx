"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Loader2,
  Play,
  Settings2,
  Edit2,
  Check,
  Eye,
  EyeOff,
  Plus,
  Terminal,
  FileJson,
  MessageSquare,
  Send,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { PRESET_MODELS } from "@/lib/model-config"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { testModelConnection } from "@/actions/test-model" // Server action removed for static export
import { Switch } from "@/components/ui/switch" // Import Switch component

const addLog = (log: string) => {
  console.log(log)
}

export default function ModelTestPage() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showConfig, setShowConfig] = useState(false)
  const [isEditingConfig, setIsEditingConfig] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [useStream, setUseStream] = useState(true) // Add state for stream toggle
  const [hasInteracted, setHasInteracted] = useState(false) // Track if user has made a test request

  const [availableModels, setAvailableModels] = useState(PRESET_MODELS)
  const [selectedModelId, setSelectedModelId] = useState(PRESET_MODELS[0].id)

  const currentModel = availableModels.find((m) => m.id === selectedModelId) || availableModels[0]
  const isDefaultModel = availableModels.length > 0 && selectedModelId === availableModels[0].id

  const [tempModel, setTempModel] = useState(currentModel)
  const [rawOutput, setRawOutput] = useState("")

  const [activeTab, setActiveTab] = useState<"response" | "json" | "logs">("response")
  const logsEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of logs when they update
  useEffect(() => {
    if (activeTab === "logs" && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs, activeTab])

  const handleStartEdit = () => {
    setTempModel(currentModel)
    setIsEditingConfig(true)
  }

  const handleSaveConfig = () => {
    setAvailableModels((prev) => prev.map((m) => (m.id === selectedModelId ? tempModel : m)))
    setIsEditingConfig(false)
    setLogs((prev) => [...prev, `[System] Configuration updated for ${tempModel.name}`])
  }

  const handleSetDefault = () => {
    const otherModels = availableModels.filter((m) => m.id !== selectedModelId)
    setAvailableModels([currentModel, ...otherModels])
    setLogs((prev) => [...prev, `[System] Set ${currentModel.name} as session default`])
  }

  const handleAddNewModel = () => {
    const newId = `custom-model-${Date.now()}`
    const newModel = {
      id: newId,
      name: "New Custom Model",
      baseURL: "https://api.example.com/v1",
      connectionURL: "https://api.example.com/v1/chat/completions",
      apiKey: "",
      model: "gpt-3.5-turbo",
      provider: "generic",
    }
    setAvailableModels([...availableModels, newModel])
    setSelectedModelId(newId)
    setTempModel(newModel)
    setIsEditingConfig(true)
    setShowConfig(true)
  }

  const updateTempModel = (field: string, value: string) => {
    setTempModel((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancelEdit = () => {
    setTempModel(currentModel)
    setIsEditingConfig(false)
  }

  const handleTest = async () => {
    if (!input.trim()) return

    setLoading(true)
    setResponse(null)
    setLogs([]) // Clear previous logs for a fresh run
    setRawOutput("")
    setHasInteracted(true) // Mark that user has made a request
    // Don't force switch tab, let user stay where they are, or default to response if empty
    if (!activeTab) setActiveTab("response")

    const timestamp = new Date().toLocaleTimeString()
    const newLogs = [`[${timestamp}] Starting request...`]
    setLogs(newLogs)

    try {
      if (useStream) {
        newLogs.push(`[${new Date().toLocaleTimeString()}] Calling streaming API with model: ${currentModel.name}`)
        setLogs([...newLogs])

        // 根据是否有真实API密钥决定使用哪个端点
        const useRealAPI = currentModel.apiKey && currentModel.apiKey.trim() !== "" &&
                         currentModel.connectionURL && currentModel.connectionURL.trim() !== "";
        
        const apiUrl = useRealAPI ? "/api/stream-model" : "/api/mock-stream";
        
        newLogs.push(`[${new Date().toLocaleTimeString()}] Using ${useRealAPI ? 'real' : 'mock'} API: ${apiUrl}`);
        setLogs([...newLogs]);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: input,
            config: {
              apiKey: currentModel.apiKey,
              baseURL: currentModel.baseURL,
              model: currentModel.model,
              connectionURL: (currentModel as any).connectionURL,
            },
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(errorText || `HTTP ${response.status}`)
        }

        if (!response.body) throw new Error("No response body")
        
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let streamedText = ""
        let buffer = ""
        
        newLogs.push(`[${new Date().toLocaleTimeString()}] Stream started`)
        setLogs([...newLogs])
        
        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          if (value) {
            const chunk = decoder.decode(value, { stream: true })
            buffer += chunk
            
            // 处理SSE格式的数据
            const lines = buffer.split('\n')
            buffer = lines.pop() || '' // 保留最后一个不完整的行
            
            for (const line of lines) {
              if (line.trim() === '' || !line.startsWith('data: ')) continue
              
              try {
                const jsonStr = line.slice(6).trim()
                if (jsonStr === '') continue
                
                const data = JSON.parse(jsonStr)
                if (data.done) {
                  done = true
                  break
                } else if (data.content) {
                  // 累积内容，提供自然的段落阅读体验
                  streamedText += data.content
                  setRawOutput(streamedText)
                }
              } catch (e) {
                // 忽略无法解析的行
              }
            }
          }
        }

        newLogs.push(`[${new Date().toLocaleTimeString()}] Stream complete`)
        setLogs([...newLogs])

        setResponse({
          rawContent: JSON.stringify({
            object: "chat.completion",
            choices: [{ message: { content: streamedText } }],
          }),
        })
      } else {
        newLogs.push(
          `[${new Date().toLocaleTimeString()}] Calling standard API (Non-stream) with model: ${currentModel.name}`,
        )
        setLogs([...newLogs])

        // Non-streaming mode disabled for static export
        throw new Error("Non-streaming mode is not supported in static export. Please use streaming mode.")
      }
    } catch (error) {
      newLogs.push(`[${new Date().toLocaleTimeString()}] Error: ${error}`)
      setLogs([...newLogs])
      console.error(error)
      setRawOutput((prev) => prev + `\n\n[System Error: ${String(error)}]`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 overflow-hidden">
      {/* Header */}
      <header className="flex-none h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Model Test Console
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">v2.0</span>
          </h1>
        </div>
        
        {/* Centered Tab Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex gap-1 items-center">
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm mr-2">
              <Switch
                id="stream-mode"
                checked={useStream}
                onCheckedChange={setUseStream}
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label
                htmlFor="stream-mode"
                className="text-xs font-medium text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <Zap className={`w-3 h-3 ${useStream ? "text-emerald-500 fill-emerald-500" : "text-slate-400"}`} />
                Stream
              </Label>
            </div>
            <button
              onClick={() => setActiveTab("response")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "response"
                  ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Response
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "json"
                  ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FileJson className="w-4 h-4" />
              Raw JSON
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "logs"
                  ? "bg-amber-50 text-amber-700 shadow-sm ring-1 ring-amber-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Terminal className="w-4 h-4" />
              System Logs
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <span className="text-xs font-medium text-slate-500 px-2">Active:</span>
            <Select value={selectedModelId} onValueChange={setSelectedModelId} disabled={loading || isEditingConfig}>
              <SelectTrigger className="h-7 w-[200px] text-xs bg-white border-slate-200 text-slate-700 focus:ring-emerald-500/50 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 text-slate-700">
                {availableModels.map((m, index) => (
                  <SelectItem key={m.id} value={m.id} className="text-xs focus:bg-slate-100 focus:text-emerald-600">
                    {m.name} {index === 0 && <span className="text-slate-400 ml-1">(Default)</span>}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfig(true)}
            className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          >
            <Settings2 className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </header>

      {/* Configuration Modal Overlay */}
      {showConfig && (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl bg-white shadow-2xl border-0 animate-in fade-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <CardTitle className="text-lg text-slate-800">Configuration Manager</CardTitle>
                <div className="h-6 w-px bg-slate-200" />
                <Select
                  value={selectedModelId}
                  onValueChange={(val) => {
                    setSelectedModelId(val)
                    setIsEditingConfig(false)
                  }}
                  disabled={isEditingConfig}
                >
                  <SelectTrigger className="w-[250px] h-9 bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((m, index) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} {index === 0 && <span className="text-slate-400 ml-1 font-normal">(Default)</span>}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleAddNewModel}
                  className="text-emerald-600 hover:bg-emerald-50"
                  disabled={isEditingConfig}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add New
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowConfig(false)}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-500">Configuration Name</Label>
                  <Input
                    value={isEditingConfig ? tempModel.name : currentModel.name}
                    onChange={(e) => updateTempModel("name", e.target.value)}
                    disabled={!isEditingConfig}
                    className={isEditingConfig ? "border-emerald-500 ring-1 ring-emerald-500/20" : "bg-slate-50"}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500">Model ID / Deployment Name</Label>
                  <Input
                    value={isEditingConfig ? tempModel.model : currentModel.model}
                    onChange={(e) => updateTempModel("model", e.target.value)}
                    disabled={!isEditingConfig}
                    className={`font-mono text-sm ${isEditingConfig ? "border-emerald-500 ring-1 ring-emerald-500/20" : "bg-slate-50"}`}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-slate-500">API Base URL</Label>
                  <Input
                    value={isEditingConfig ? tempModel.baseURL : currentModel.baseURL}
                    onChange={(e) => updateTempModel("baseURL", e.target.value)}
                    disabled={!isEditingConfig}
                    placeholder="https://api.example.com/v1"
                    className={`font-mono text-sm ${isEditingConfig ? "border-emerald-500 ring-1 ring-emerald-500/20" : "bg-slate-50"}`}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-slate-500">API Connection URL</Label>
                  <Input
                    value={isEditingConfig ? (tempModel as any).connectionURL : (currentModel as any).connectionURL}
                    onChange={(e) => updateTempModel("connectionURL", e.target.value)}
                    disabled={!isEditingConfig}
                    placeholder="https://api.example.com/v1/chat/completions"
                    className={`font-mono text-sm pr-10 ${isEditingConfig ? "border-emerald-500 ring-1 ring-emerald-500/20" : "bg-slate-50"}`}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Full endpoint URL used for API requests. System will use this directly without modifications.
                  </p>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-slate-500">API Key</Label>
                  <div className="relative">
                    <Input
                      type={showApiKey || isEditingConfig ? "text" : "password"}
                      value={isEditingConfig ? tempModel.apiKey : currentModel.apiKey}
                      onChange={(e) => updateTempModel("apiKey", e.target.value)}
                      disabled={!isEditingConfig}
                      className={`font-mono text-sm pr-10 ${isEditingConfig ? "border-emerald-500 ring-1 ring-emerald-500/20" : "bg-slate-50"}`}
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                {isEditingConfig ? (
                  <>
                    <Button variant="ghost" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveConfig} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                      <Check className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleSetDefault}
                      disabled={isDefaultModel}
                      className={isDefaultModel ? "text-slate-400 bg-slate-50" : "hover:text-slate-900 bg-transparent"}
                    >
                      {isDefaultModel ? "Current Default" : "Set as Default"}
                    </Button>
                    <Button variant="outline" onClick={handleStartEdit}>
                      <Edit2 className="mr-2 h-4 w-4" /> Edit Config
                    </Button>
                    <Button onClick={() => setShowConfig(false)}>Done</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {/* Output Area (Takes up all available space above input) */}
        <div className="flex-1 flex flex-col bg-slate-50 min-h-0">

          {/* Content Viewport */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-20 pb-6 custom-scrollbar">
            <div className="max-w-4xl mx-auto h-full">
              {/* Empty State */}
              {!rawOutput && logs.length === 0 && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60 select-none">
                  <div className="w-24 h-24 rounded-3xl bg-slate-200 flex items-center justify-center mb-6">
                    <Play className="w-10 h-10 text-slate-400 ml-1" />
                  </div>
                  <p className="text-lg font-medium">Ready to Test</p>
                  <p className="text-sm">Enter a prompt below to start the analysis</p>
                </div>
              )}

              {/* Loading State */}
              {loading && !rawOutput && (
                <div className="h-full flex flex-col items-center justify-center text-emerald-600 animate-pulse">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="text-sm font-medium">Waiting for API response...</p>
                </div>
              )}

              {/* Tab Content */}
              {/* Show tab content only when there's actual content to display */}
              {/* Never show empty output box while waiting for initial response */}
              {(rawOutput || logs.length > 0) ? (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm min-h-[200px] overflow-hidden">
                  {/* RESPONSE TAB */}
                  {activeTab === "response" && (
                    <div className="p-6 md:p-8">
                      {rawOutput ? (
                        <div className="prose prose-slate max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-slate-800 bg-transparent border-0 p-0">
                            {rawOutput}
                          </pre>
                        </div>
                      ) : (
                        !loading && !useStream && (
                          <div className="text-slate-400 italic text-center py-10">
                            No response content available yet.
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* JSON TAB */}
                  {activeTab === "json" && (
                    <div className="bg-slate-900 p-0 min-h-full">
                      <div className="p-4 overflow-x-auto">
                        {response && response.rawContent ? (
                          <pre className="text-xs md:text-sm text-blue-300 font-mono">
                            {JSON.stringify(JSON.parse(response.rawContent), null, 2)}
                          </pre>
                        ) : (
                          <div className="text-slate-500 italic p-4">No JSON data captured.</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* LOGS TAB */}
                  {activeTab === "logs" && (
                    <div className="bg-slate-950 p-4 min-h-full font-mono text-xs md:text-sm text-amber-400/90 space-y-1">
                      {logs.map((log, i) => (
                        <div
                          key={i}
                          className="border-l-2 border-amber-900/30 pl-3 py-1 hover:bg-white/5 transition-colors"
                        >
                          {log}
                        </div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Floating Input Area at Bottom */}
        <div className="flex-none px-4 sm:px-6 md:px-20 pb-8 pt-2 bg-slate-50">
          <div className="max-w-4xl mx-auto relative">
            <div className="relative flex items-end gap-2 bg-white p-2 rounded-2xl shadow-xl border border-slate-200 ring-1 ring-slate-200/50 focus-within:ring-emerald-500/30 focus-within:border-emerald-500/50 transition-all">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message to test the model..."
                className="flex-1 min-h-[60px] max-h-[200px] border-0 shadow-none resize-none bg-transparent p-3 text-base focus-visible:ring-0 placeholder:text-slate-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleTest()
                  }
                }}
              />
              <Button
                onClick={handleTest}
                disabled={loading || !input.trim()}
                className={`h-12 w-12 rounded-xl flex-none mb-0.5 transition-all ${
                  loading
                    ? "bg-slate-100 text-slate-400"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                }`}
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5 ml-0.5" />}
              </Button>
            </div>
            <div className="text-center mt-3">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                Press Enter to Send • Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
