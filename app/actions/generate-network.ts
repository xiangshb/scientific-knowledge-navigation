export async function generateNetworkFromText(options: {
  text: string,
  modelId: string,
  options?: any
}) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Mock network data
  const mockNetworkData = {
    nodes: [
      { id: 1, label: options?.text?.substring(0, 30) || '核心概念', group: 'main', size: 30 },
      { id: 2, label: '相关研究', group: 'research', size: 20 },
      { id: 3, label: '方法论', group: 'method', size: 15 },
    ],
    links: [
      { source: 1, target: 2, strength: 0.8 },
      { source: 1, target: 3, strength: 0.6 },
      { source: 2, target: 3, strength: 0.4 },
    ],
    metadata: {
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      totalNodes: 3,
      totalLinks: 3,
      modelId: options.modelId,
    }
  }

  return {
    success: true,
    network: mockNetworkData,
    sessionId: mockNetworkData.metadata.sessionId,
    message: '知识网络生成完成'
  }
}
