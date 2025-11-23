import { NextRequest, NextResponse } from 'next/server'
import { generateNetworkFromText } from '@/actions/generate-network'
import { PRESET_MODELS } from '@/lib/model-config'

export async function POST(request: NextRequest) {
  try {
    const { query, modelId } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Get model configuration
    const modelConfig = PRESET_MODELS.find(m => m.id === modelId) || PRESET_MODELS[0]

    console.log(`[v0] Generating network for query: "${query}" using model: ${modelConfig.name}`)

    // Generate network using the server action
    const result = await generateNetworkFromText(query, {
      apiKey: modelConfig.apiKey,
      baseURL: modelConfig.baseURL,
      model: modelConfig.model
    })

    console.log(`[v0] Network generated successfully: ${result.nodes.length} nodes, ${result.links.length} links`)

    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        model: modelConfig.name,
        query: query,
        nodeCount: result.nodes.length,
        linkCount: result.links.length,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('[v0] Network generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate network',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}