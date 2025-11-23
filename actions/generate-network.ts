"use server"

import { MODEL_CONFIG } from "@/lib/model-config"

export type ModelConfig = typeof MODEL_CONFIG

export async function generateNetworkFromText(text: string, configOverride?: Partial<ModelConfig>) {
  const config = { ...MODEL_CONFIG, ...configOverride }

  console.log("[v0] Generating network with model:", config.model)

  const apiUrl = (configOverride as any)?.connectionURL || config.baseURL

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
          {
            role: "system",
            content: `You are a scientific knowledge graph extractor. 
            Analyze the user's scientific text and extract key entities (Concepts, Methods, Metrics) and their relationships.
            
            Return ONLY a valid JSON object with this exact structure, no markdown formatting, no explanation:
            {
              "nodes": [
                { "id": "string", "label": "string", "type": "concept" | "entity" | "method" }
              ],
              "links": [
                { "source": "id_of_source_node", "target": "id_of_target_node", "label": "relationship_name" }
              ]
            }
            `,
          },
          {
            role: "user",
            content: text,
          },
        ],
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[v0] API Error: ${response.status} - ${apiUrl} - ${errorText}`)
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid API response structure")
    }

    const content = data.choices[0].message.content

    // Robust JSON Extraction
    let parsedData
    let extractionError = null
    try {
      // 1. Try direct parse
      parsedData = JSON.parse(content)
    } catch (e) {
      // 2. Try extracting from markdown block
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/)
      if (jsonMatch && jsonMatch[1]) {
        try {
          parsedData = JSON.parse(jsonMatch[1])
        } catch (e2) {
          // 3. Try finding first { and last }
          const start = content.indexOf("{")
          const end = content.lastIndexOf("}")
          if (start !== -1 && end !== -1) {
            const jsonString = content.substring(start, end + 1)
            parsedData = JSON.parse(jsonString)
          } else {
            extractionError = "Could not parse JSON from model output"
          }
        }
      } else {
        // 3. Fallback: Try finding first { and last } directly
        const start = content.indexOf("{")
        const end = content.lastIndexOf("}")
        if (start !== -1 && end !== -1) {
          const jsonString = content.substring(start, end + 1)
          parsedData = JSON.parse(jsonString)
        } else {
          extractionError = "Could not parse JSON from model output"
        }
      }
    }

    if (extractionError || !parsedData) {
      console.warn("[v0] JSON extraction failed, returning raw content:", content.substring(0, 100))
      return {
        nodes: [],
        links: [],
        rawContent: content,
        error: extractionError,
      }
    }

    // Validations for response structure
    if (!parsedData.nodes || !Array.isArray(parsedData.nodes)) {
      return {
        nodes: [],
        links: [],
        rawContent: content,
        error: "Missing 'nodes' array in JSON output",
      }
    }

    const nodes = parsedData.nodes.map((node: any, i: number) => ({
      ...node,
      // Random initial position for the force layout to organize
      x: Math.random() * 800 + 100,
      y: Math.random() * 600 + 100,
      // Assign radius based on type
      radius: node.type === "concept" ? 30 : node.type === "method" ? 25 : 20,
    }))

    const links = (parsedData.links || []).map((link: any) => ({
      source: link.source,
      target: link.target,
      type: "relates_to",
      label: link.label,
    }))

    return { nodes, links, rawContent: content }
  } catch (error) {
    console.error("[v0] Generation failed:", error)
    console.log("[v0] Falling back to simulation mode due to error")

    const nodeCount = Math.max(5, Math.min(15, Math.floor(text.length / 20)))
    const newNodes = Array.from({ length: nodeCount }).map((_, i) => ({
      id: `generated-${i}`,
      x: Math.random() * 800 + 100,
      y: Math.random() * 600 + 100,
      type: i % 3 === 0 ? "concept" : i % 3 === 1 ? "entity" : "method",
      label: `Extracted Term ${i + 1}`,
      radius: i % 3 === 0 ? 30 : 20,
    }))

    const newLinks = newNodes.slice(1).map((node, i) => ({
      source: newNodes[0].id,
      target: node.id,
      type: "relates_to",
      label: "connected_to",
    }))

    return { nodes: newNodes, links: newLinks, isFallback: true, error: String(error) }
  }
}
