"use server"

import { KnowledgeNetworkAgent } from "@/lib/agents/knowledge-network-agent"

export type ModelConfig = {
  apiKey: string
  baseURL: string
  model: string
  connectionURL?: string
}

export async function generateNetworkFromText(text: string, configOverride?: Partial<ModelConfig>) {
  console.log("[GenerateNetwork] Starting network generation with agent-based approach")

  try {
    // Create a session ID for this generation
    const sessionId = `server_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Use default model if no override provided
    const modelId = configOverride?.model || "minimax" // Default to MiniMax
    
    // Create agent instance
    const agent = new KnowledgeNetworkAgent(modelId, sessionId)
    
    // Generate network
    const networkData = await agent.generateNetwork(text)
    
    console.log(`[GenerateNetwork] Network generated successfully: ${networkData.nodes?.length || 0} nodes, ${networkData.links?.length || 0} links`)
    
    return networkData
    
  } catch (error) {
    console.error("[GenerateNetwork] Generation failed:", error)
    
    // Return fallback network
    return {
      nodes: [
        {
          id: "fallback-1",
          label: "Query Analysis",
          type: "concept",
          x: 400,
          y: 200,
          radius: 30
        },
        {
          id: "fallback-2",
          label: "Related Concept",
          type: "entity",
          x: 300,
          y: 300,
          radius: 25
        },
        {
          id: "fallback-3",
          label: "Method",
          type: "method",
          x: 500,
          y: 300,
          radius: 20
        }
      ],
      links: [
        {
          source: "fallback-1",
          target: "fallback-2",
          label: "relates_to",
          type: "relates_to"
        },
        {
          source: "fallback-1",
          target: "fallback-3",
          label: "uses",
          type: "relates_to"
        }
      ],
      metadata: {
        nodeCount: 3,
        linkCount: 2,
        inputText: text,
        fallback: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}
