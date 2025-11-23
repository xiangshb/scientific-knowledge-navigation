/**
 * Knowledge Network Agent
 * 
 * This module provides a knowledge network generation agent that can analyze text
 * and generate causal knowledge networks using AI models.
 */

import { PRESET_MODELS } from '@/lib/model-config'

export interface NetworkNode {
  id: string
  label: string
  type: "concept" | "entity" | "method"
  x?: number
  y?: number
  radius?: number
}

export interface NetworkLink {
  source: string
  target: string
  label?: string
  type?: string
}

export interface NetworkData {
  nodes: NetworkNode[]
  links: NetworkLink[]
  metadata?: {
    nodeCount?: number
    linkCount?: number
    inputText?: string
    model?: string
    timestamp?: string
    fallback?: boolean
  }
}

export interface GenerationProgress {
  step: string
  progress: number
  message: string
  timestamp: number
}

export class KnowledgeNetworkAgent {
  private modelConfig: any
  private sessionId: string
  private progressCallback?: (progress: GenerationProgress) => void

  constructor(modelId: string, sessionId: string, progressCallback?: (progress: GenerationProgress) => void) {
    this.modelConfig = PRESET_MODELS.find(m => m.id === modelId) || PRESET_MODELS[0]
    this.sessionId = sessionId
    this.progressCallback = progressCallback
  }

  /**
   * Generate a knowledge network from input text
   */
  async generateNetwork(query: string): Promise<NetworkData> {
    this.updateProgress('initialization', 10, 'Initializing knowledge network generation...')
    
    try {
      // Step 1: Initialize model connection
      this.updateProgress('model_initialization', 20, 'Connecting to AI model...')
      
      // Step 2: Analyze query with AI model
      this.updateProgress('analysis', 30, 'Analyzing query with AI model...')
      const modelResponse = await this.queryModel(query)
      
      // Step 3: Extract network structure from response
      this.updateProgress('extraction', 50, 'Extracting network structure...')
      const extractedData = this.extractNetworkData(modelResponse)
      
      // Step 4: Build final network with layout
      this.updateProgress('construction', 70, 'Building network structure...')
      const networkData = this.buildNetwork(query, extractedData)
      
      // Step 5: Finalize network
      this.updateProgress('finalization', 90, 'Finalizing network visualization...')
      const finalNetwork = this.finalizeNetwork(networkData)
      
      this.updateProgress('complete', 100, 'Knowledge network generated successfully!')
      
      return finalNetwork
      
    } catch (error) {
      console.error('Network generation failed:', error)
      this.updateProgress('error', 0, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      
      // Return fallback network
      return this.createFallbackNetwork(query)
    }
  }

  /**
   * Query the AI model with the user's input
   */
  private async queryModel(query: string): Promise<string> {
    const prompt = `You are a knowledge network extraction expert. Analyze the following query and generate a causal knowledge network.

Query: "${query}"

Your task is to:
1. Identify key concepts, entities, and methods related to the query
2. Determine causal relationships between them
3. Structure this as a knowledge network

Return your response in the following JSON format:
{
  "nodes": [
    {"id": "n1", "label": "Concept Name", "type": "concept"},
    {"id": "n2", "label": "Entity Name", "type": "entity"},
    {"id": "n3", "label": "Method Name", "type": "method"}
  ],
  "links": [
    {"source": "n1", "target": "n2", "label": "causes", "type": "causal"},
    {"source": "n2", "target": "n3", "label": "uses", "type": "methodological"}
  ]
}

Important:
- Use "concept" for abstract ideas, theories, and principles
- Use "entity" for concrete objects, data, and variables
- Use "method" for techniques, algorithms, and procedures
- Focus on causal relationships (causes, enables, requires, influences)
- Return only the JSON, no additional text`

    const response = await fetch(this.modelConfig.connectionURL || `${this.modelConfig.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.modelConfig.apiKey}`
      },
      body: JSON.stringify({
        model: this.modelConfig.model,
        messages: [
          {
            role: 'system',
            content: 'You are a knowledge network extraction expert who specializes in identifying causal relationships between concepts, entities, and methods.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`Model API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || ''
  }

  /**
   * Extract structured network data from model response
   */
  private extractNetworkData(response: string): { nodes: any[], links: any[] } {
    try {
      // Try to extract JSON from response
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1])
      }

      // Try to find JSON object directly
      const objectMatch = response.match(/\{[\s\S]*\}/)
      if (objectMatch) {
        return JSON.parse(objectMatch[0])
      }

      // If no JSON found, return empty structure
      return { nodes: [], links: [] }
      
    } catch (error) {
      console.error('Failed to extract network data:', error)
      return { nodes: [], links: [] }
    }
  }

  /**
   * Build network from extracted data
   */
  private buildNetwork(query: string, extractedData: { nodes: any[], links: any[] }): NetworkData {
    const nodes: NetworkNode[] = []
    const links: NetworkLink[] = []

    // Process nodes
    if (extractedData.nodes && extractedData.nodes.length > 0) {
      extractedData.nodes.forEach((node, index) => {
        nodes.push({
          id: node.id || `node_${index}`,
          label: node.label || `Node ${index + 1}`,
          type: node.type || 'concept',
          radius: this.getNodeRadius(node.type || 'concept')
        })
      })
    } else {
      // Create nodes from query analysis
      const queryNodes = this.analyzeQueryForNodes(query)
      nodes.push(...queryNodes)
    }

    // Process links
    if (extractedData.links && extractedData.links.length > 0) {
      extractedData.links.forEach(link => {
        links.push({
          source: link.source,
          target: link.target,
          label: link.label || 'relates_to',
          type: link.type || 'relates_to'
        })
      })
    } else {
      // Create basic connections between nodes
      for (let i = 0; i < nodes.length - 1; i++) {
        links.push({
          source: nodes[i].id,
          target: nodes[i + 1].id,
          label: 'relates_to',
          type: 'relates_to'
        })
      }
    }

    return { nodes, links }
  }

  /**
   * Analyze query to extract basic nodes
   */
  private analyzeQueryForNodes(query: string): NetworkNode[] {
    const nodes: NetworkNode[] = []
    
    // Simple keyword extraction for fallback
    const concepts = ['统计学', '深度学习', '机器学习', '概率论', '神经网络', '回归', '分类']
    const entities = ['数据', '算法', '模型', '参数', '特征', '样本']
    const methods = ['分析', '预测', '训练', '优化', '计算', '验证']
    
    const allTerms = [...concepts, ...entities, ...methods]
    const foundTerms = allTerms.filter(term => query.includes(term))
    
    foundTerms.slice(0, 5).forEach((term, index) => {
      let type: 'concept' | 'entity' | 'method' = 'concept'
      if (entities.includes(term)) type = 'entity'
      else if (methods.includes(term)) type = 'method'
      
      nodes.push({
        id: `node_${index}`,
        label: term,
        type,
        radius: this.getNodeRadius(type)
      })
    })
    
    // If no terms found, create a default node
    if (nodes.length === 0) {
      nodes.push({
        id: 'node_0',
        label: 'Query Analysis',
        type: 'concept',
        radius: 30
      })
    }
    
    return nodes
  }

  /**
   * Get appropriate radius for node type
   */
  private getNodeRadius(type: string): number {
    switch (type) {
      case 'concept': return 30
      case 'entity': return 25
      case 'method': return 20
      default: return 25
    }
  }

  /**
   * Apply layout and finalize network
   */
  private finalizeNetwork(network: NetworkData): NetworkData {
    // Apply force-directed layout for initial positions
    const centerX = 400
    const centerY = 300
    const radius = Math.min(200, 300 / Math.sqrt(network.nodes.length))
    
    network.nodes.forEach((node, index) => {
      const angle = (2 * Math.PI * index) / network.nodes.length
      node.x = centerX + radius * Math.cos(angle)
      node.y = centerY + radius * Math.sin(angle)
    })
    
    // Add metadata
    network.metadata = {
      nodeCount: network.nodes.length,
      linkCount: network.links.length,
      model: this.modelConfig.name,
      timestamp: new Date().toISOString()
    }
    
    return network
  }

  /**
   * Create fallback network when generation fails
   */
  private createFallbackNetwork(query: string): NetworkData {
    return {
      nodes: [
        {
          id: 'n1',
          label: 'Query Analysis',
          type: 'concept',
          x: 400,
          y: 200,
          radius: 30
        },
        {
          id: 'n2',
          label: 'Related Concept',
          type: 'entity',
          x: 300,
          y: 300,
          radius: 25
        },
        {
          id: 'n3',
          label: 'Method',
          type: 'method',
          x: 500,
          y: 300,
          radius: 20
        }
      ],
      links: [
        {
          source: 'n1',
          target: 'n2',
          label: 'relates_to',
          type: 'relates_to'
        },
        {
          source: 'n1',
          target: 'n3',
          label: 'uses',
          type: 'relates_to'
        }
      ],
      metadata: {
        nodeCount: 3,
        linkCount: 2,
        inputText: query,
        fallback: true,
        timestamp: new Date().toISOString()
      }
    }
  }

  /**
   * Update progress with callback
   */
  private updateProgress(step: string, progress: number, message: string): void {
    const progressData: GenerationProgress = {
      step,
      progress,
      message,
      timestamp: Date.now()
    }
    
    if (this.progressCallback) {
      this.progressCallback(progressData)
    }
    
    console.log(`[KnowledgeNetworkAgent] ${progress}% - ${step}: ${message}`)
  }
}