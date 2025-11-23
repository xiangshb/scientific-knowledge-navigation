"use client"

import { Settings2, Cpu, Key, Thermometer, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export function ModelConfigPanel() {
  return (
    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Model Configuration
            </CardTitle>
            <CardDescription>Configure the AI models for extraction</CardDescription>
          </div>
          <Button variant="outline" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Selected Model</Label>
          <Select defaultValue="gpt-4">
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4 (OpenAI)</SelectItem>
              <SelectItem value="claude-3">Claude 3 (Anthropic)</SelectItem>
              <SelectItem value="minimax">MiniMax ABAB6.5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          </TabsList>
          <TabsContent value="parameters" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" /> Temperature
                  </Label>
                  <span className="text-xs text-muted-foreground">0.7</span>
                </div>
                <Slider defaultValue={[0.7]} max={1} step={0.1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Gauge className="h-4 w-4" /> Max Tokens
                  </Label>
                  <span className="text-xs text-muted-foreground">4096</span>
                </div>
                <Slider defaultValue={[4096]} max={8192} step={128} />
              </div>

              <div className="pt-2 space-y-2">
                <Label className="flex items-center gap-2">
                  <Key className="h-4 w-4" /> API Key Override
                </Label>
                <Input type="password" placeholder="Use system default" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="capabilities" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Entity Extraction</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Relation Mining</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Causal Inference</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Logical Reasoning</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
