import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, config } = await request.json()

    // 验证必要的配置
    if (!config?.apiKey || !config?.connectionURL) {
      return NextResponse.json(
        { error: 'API密钥和连接URL不能为空' },
        { status: 400 }
      )
    }

    // 调用真实的AI模型API
    const response = await fetch(config.connectionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: true,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API请求失败: ${response.status} - ${errorText}`)
    }

    // 处理流式响应
    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('无法获取响应流')
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const decoder = new TextDecoder()
          let buffer = ''

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              if (line.trim() === '' || !line.startsWith('data: ')) continue
              
              try {
                const jsonStr = line.slice(6).trim()
                if (jsonStr === '' || jsonStr === '[DONE]') continue
                
                const data = JSON.parse(jsonStr)
                const content = data.choices?.[0]?.delta?.content || data.content || ''
                
                if (content) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
                }

                if (data.choices?.[0]?.finish_reason === 'stop' || data.done) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
                  controller.close()
                  return
                }
              } catch (e) {
                // 忽略解析错误，继续处理下一行
              }
            }
          }
        } catch (error) {
          controller.error(error)
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Model test API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '请求处理失败' },
      { status: 500 }
    )
  }
}
