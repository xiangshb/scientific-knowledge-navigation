import { NextRequest, NextResponse } from 'next/server'
import { generateNetworkFromText } from '../../actions/generate-network'

export async function POST(request: NextRequest) {
  try {
    const { text, modelId, options } = await request.json()

    // 验证必要的参数
    if (!text || !modelId) {
      return NextResponse.json(
        { error: 'Missing required parameters: text, modelId' },
        { status: 400 }
      )
    }

    // 调用生成网络函数
    const result = await generateNetworkFromText({ text, modelId, options })

    return NextResponse.json(result)

  } catch (error) {
    console.error('Generate network API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '请求处理失败' },
      { status: 500 }
    )
  }
}