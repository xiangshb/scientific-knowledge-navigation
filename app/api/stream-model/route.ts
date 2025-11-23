import { OpenAIStream, StreamingTextResponse } from "ai"

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
        Authorization: `Bearer ${config.apiKey}`,
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

    try {
      const stream = OpenAIStream(response)
      return new StreamingTextResponse(stream)
    } catch (streamError) {
      console.error("[Stream API] Stream parsing error:", streamError)
      return new Response("Error parsing stream from provider", { status: 500 })
    }
  } catch (error: any) {
    console.error("[Stream API] Exception:", error)
    return new Response(`Server Error: ${error.message}`, { status: 500 })
  }
}
