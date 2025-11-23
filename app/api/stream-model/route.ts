import fetch from 'node-fetch'

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { prompt, config } = await req.json()
    
    let apiUrl = config.connectionURL
    if (!apiUrl) {
      apiUrl = config.baseURL || ""
      if (!apiUrl.endsWith("/chat/completions")) {
        apiUrl += apiUrl.endsWith("/") ? "chat/completions" : "/chat/completions"
      }
    }
    
    console.log(`[Stream API] Calling URL: ${apiUrl}`)
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: prompt },
        ],
        stream: true,
      }),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Stream API] Error ${response.status}:`, errorText)
      return new Response(errorText || `Error ${response.status}`, { status: response.status })
    }
    
    // 创建正确的SSE流式响应
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          if (!response.body) {
            controller.close()
            return
          }
          
          let buffer = ''
          
          // 使用异步迭代器处理流
          for await (const chunk of response.body as any) {
            buffer += decoder.decode(chunk, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() || '' // 保留最后一个不完整的行
            
            for (const line of lines) {
              if (line.trim() === '') continue
              
              if (line.includes('[DONE]')) {
                const endData = `data: ${JSON.stringify({ done: true })}\n\n`
                controller.enqueue(encoder.encode(endData))
                controller.close()
                return
              }
              
              if (line.startsWith('data: ')) {
                try {
                  const jsonStr = line.slice(6).trim()
                  if (jsonStr === '') continue
                  
                  const json = JSON.parse(jsonStr)
                  if (json.choices && json.choices[0]?.delta?.content) {
                    const content = json.choices[0].delta.content
                    if (content) {
                      // 发送SSE格式的数据
                      const sseData = `data: ${JSON.stringify({ content })}\n\n`
                      controller.enqueue(encoder.encode(sseData))
                    }
                  }
                } catch (e) {
                  console.log("解析SSE数据失败:", line, e instanceof Error ? e.message : String(e))
                }
              }
            }
          }
          
          // 处理剩余的buffer
          if (buffer.trim()) {
            if (buffer.includes('[DONE]')) {
              const endData = `data: ${JSON.stringify({ done: true })}\n\n`
              controller.enqueue(encoder.encode(endData))
            } else if (buffer.startsWith('data: ')) {
              try {
                const jsonStr = buffer.slice(6).trim()
                const json = JSON.parse(jsonStr)
                if (json.choices && json.choices[0]?.delta?.content) {
                  const content = json.choices[0].delta.content
                  if (content) {
                    const sseData = `data: ${JSON.stringify({ content })}\n\n`
                    controller.enqueue(encoder.encode(sseData))
                  }
                }
              } catch (e) {
                console.log("解析剩余数据失败:", buffer, e instanceof Error ? e.message : String(e))
              }
            }
          }
          
          // 发送完成信号
          const endData = `data: ${JSON.stringify({ done: true })}\n\n`
          controller.enqueue(encoder.encode(endData))
          controller.close()
        } catch (error) {
          console.error("[Stream API] Stream processing error:", error)
          controller.error(error)
        }
      }
    })
    
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error: any) {
    console.error("[Stream API] Exception:", error)
    return new Response(`Server Error: ${error.message}`, { status: 500 })
  }
}
