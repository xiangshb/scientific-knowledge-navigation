/**
 * Simple test for agent-based knowledge network generation
 */

async function testAgentNetwork() {
  console.log("🧪 Testing Agent-Based Knowledge Network Generation");
  
  const testQuery = "统计学和深度学习之间的因果网络是什么？";
  const modelId = "minimax";
  const sessionId = `test_${Date.now()}`;
  
  console.log(`\n📝 Query: "${testQuery}"`);
  console.log(`🤖 Model: ${modelId}`);
  console.log(`🆔 Session: ${sessionId}`);
  
  try {
    // Start network generation
    console.log("\n🚀 Starting network generation...");
    const response = await fetch('http://localhost:3002/api/agent-network', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: testQuery,
        modelId: modelId,
        sessionId: sessionId
      })
    });
    
    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Error details: ${errorText}`);
      return;
    }
    
    const result = await response.json();
    console.log("✅ Generation started successfully!");
    console.log(`Session ID: ${result.sessionId}`);
    
    // Poll for completion
    console.log("\n⏳ Polling for completion...");
    let attempts = 0;
    const maxAttempts = 20;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const progressResponse = await fetch(`http://localhost:3002/api/agent-network?sessionId=${sessionId}`);
      
      if (!progressResponse.ok) {
        console.error(`❌ Progress poll error: ${progressResponse.status}`);
        break;
      }
      
      const data = await progressResponse.json();
      
      if (data.progress) {
        console.log(`📈 Progress: ${data.progress.progress}% - ${data.progress.message}`);
      }
      
      if (data.complete && data.network) {
        console.log("\n🎉 Network generation completed!");
        console.log(`📊 Network stats: ${data.network.metadata?.nodeCount || 0} nodes, ${data.network.metadata?.linkCount || 0} links`);
        
        // Show network structure
        console.log("\n📋 Network Structure:");
        console.log("Nodes:");
        data.network.nodes.forEach((node, i) => {
          console.log(`  ${i + 1}. ${node.label} (${node.type})`);
        });
        
        console.log("\nLinks:");
        data.network.links.forEach((link, i) => {
          console.log(`  ${i + 1}. ${link.source} -> ${link.target} (${link.label})`);
        });
        
        return;
      }
      
      attempts++;
    }
    
    console.log("\n⏰ Timeout waiting for completion");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// Run the test
testAgentNetwork();