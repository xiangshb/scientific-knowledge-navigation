import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query, modelId, sessionId } = await request.json()

    // 验证必要的参数
    if (!query || !modelId || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required parameters: query, modelId, sessionId' },
        { status: 400 }
      )
    }

    // 模拟知识网络生成响应
    const mockNetworkData = {
      nodes: [
        { id: 1, label: '核心概念', group: 'main', size: 30 },
        { id: 2, label: '相关研究', group: 'research', size: 20 },
        { id: 3, label: '方法论', group: 'method', size: 15 },
      ],
      links: [
        { source: 1, target: 2, strength: 0.8 },
        { source: 1, target: 3, strength: 0.6 },
        { source: 2, target: 3, strength: 0.4 },
      ],
      metadata: {
        sessionId,
        timestamp: new Date().toISOString(),
        totalNodes: 3,
        totalLinks: 3,
      }
    }

    // 模拟异步处理
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      sessionId,
      network: mockNetworkData,
      message: '知识网络生成完成'
    })

  } catch (error) {
    console.error('Agent network API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '请求处理失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url!)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      )
    }

    // 模拟进度查询
    const mockProgress = {
      sessionId,
      progress: {
        step: 'processing',
        progress: 75,
        message: '正在生成知识网络节点...',
        timestamp: Date.now()
      },
      complete: Math.random() > 0.7, // 30% 概率完成
      network: Math.random() > 0.7 ? {
        nodes: [
          { id: 1, label: '核心概念', group: 'main', size: 30 },
          { id: 2, label: '相关研究', group: 'research', size: 20 },
        ],
        links: [
          { source: 1, target: 2, strength: 0.8 },
        ]
      } : null
    }

    return NextResponse.json(mockProgress)

  } catch (error) {
    console.error('Agent network GET error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '查询失败' },
      { status: 500 }
    )
  }
}
