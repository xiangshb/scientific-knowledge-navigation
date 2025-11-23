"use server"

import { MODEL_CONFIG } from "@/lib/model-config"

export async function testModelConnection(prompt: string, configOverride?: any) {
  const config = { ...MODEL_CONFIG, ...configOverride }

  const apiUrl = config.connectionURL || config.baseURL

  console.log(`[v0] Testing connection to: ${apiUrl} with model: ${config.model}`)

  try {
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
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return { success: false, raw: `Error ${response.status}: ${errorText}`, url: apiUrl }
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2)

    return {
      success: true,
      content: content,
      raw: JSON.stringify(data, null, 2),
      url: apiUrl,
    }
  } catch (error: any) {
    return { success: false, raw: `Network Error: ${error.message}`, url: apiUrl }
  }
}
