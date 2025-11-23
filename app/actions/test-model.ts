// Mock server action for static export compatibility
export async function testModelConnection(config: any) {
  // Simulate API response delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock response for testing
  return {
    success: true,
    message: 'Mock connection test successful (static export mode)',
    latency: Math.floor(Math.random() * 100) + 50,
    model: config.model || 'mock-model'
  }
}
