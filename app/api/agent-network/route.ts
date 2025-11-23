import { NextRequest, NextResponse } from 'next/server'
import { KnowledgeNetworkAgent, NetworkData, GenerationProgress } from '@/lib/agents/knowledge-network-agent'

// In-memory progress tracking (in production, use Redis or database)
const progressMap = new Map<string, GenerationProgress>()

export async function POST(request: NextRequest) {
  try {
    const { query, modelId, sessionId } = await request.json()

    if (!query || !sessionId) {
      return NextResponse.json(
        { error: 'Query and sessionId are required' },
        { status: 400 }
      )
    }

    console.log(`[AgentNetwork] Starting network generation for query: "${query}" with model: ${modelId}`)

    // Create progress callback
    const progressCallback = (progress: GenerationProgress) => {
      progressMap.set(sessionId, progress)
    }

    // Start network generation in background
    generateNetworkInBackground(query, modelId, sessionId, progressCallback)

    return NextResponse.json({
      success: true,
      sessionId,
      message: 'Network generation started'
    })

  } catch (error) {
    console.error('[AgentNetwork] Error starting network generation:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to start network generation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    )
  }
  
  try {
    const progress = progressMap.get(sessionId)
    
    // Check if generation is complete
    let network: NetworkData | null = null
    let complete = false
    
    if (progress && progress.step === 'complete') {
      // In a real implementation, you'd retrieve the completed network
      // For now, we'll simulate completion
      network = await getCompletedNetwork(sessionId)
      complete = network !== null
      
      if (complete) {
        // Clean up progress
        progressMap.delete(sessionId)
      }
    }
    
    return NextResponse.json({
      progress,
      network,
      complete
    })
    
  } catch (error) {
    console.error('[AgentNetwork] Error getting progress:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to get progress',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Background function to generate network
async function generateNetworkInBackground(
  query: string, 
  modelId: string, 
  sessionId: string, 
  progressCallback: (progress: GenerationProgress) => void
) {
  try {
    const agent = new KnowledgeNetworkAgent(modelId, sessionId, progressCallback)
    const networkData = await agent.generateNetwork(query)
    
    // Store completed network (in production, use database)
    await storeCompletedNetwork(sessionId, networkData)
    
    // Mark as complete
    progressCallback({
      step: 'complete',
      progress: 100,
      message: 'Knowledge network generated successfully!',
      timestamp: Date.now()
    })
    
  } catch (error) {
    console.error('[AgentNetwork] Background generation failed:', error)
    
    // Mark as error
    progressCallback({
      step: 'error',
      progress: 0,
      message: `Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: Date.now()
    })
  }
}

// In-memory storage for completed networks (in production, use database)
const completedNetworks = new Map<string, NetworkData>()

async function storeCompletedNetwork(sessionId: string, networkData: NetworkData) {
  completedNetworks.set(sessionId, networkData)
}

async function getCompletedNetwork(sessionId: string): Promise<NetworkData | null> {
  return completedNetworks.get(sessionId) || null
}