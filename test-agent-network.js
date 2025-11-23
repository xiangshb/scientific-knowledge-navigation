/**
 * Test script for the new agent-based knowledge network generation
 * This tests the integration between the frontend, API, and agent system
 */

const testQueries = [
  "统计学和深度学习之间的因果网络是什么？",
  "机器学习算法如何影响数据分析结果？",
  "人工智能在医疗诊断中的应用有哪些？",
  "神经网络训练中的梯度下降优化原理",
  "大数据分析中的统计方法"
];

const models = [
  { id: "minimax", name: "MiniMax M2" },
  { id: "doubao-pro", name: "Doubao Seed 1.6 Lite" },
  { id: "ChatGLM", name: "ChatGLM-4.6" }
];

async function testNetworkGeneration() {
  console.log("🧪 Testing Agent-Based Knowledge Network Generation\n");
  
  for (const model of models) {
    console.log(`\n📊 Testing with model: ${model.name} (${model.id})`);
    console.log("=" .repeat(60));
    
    for (let i = 0; i < testQueries.length; i++) {
      const query = testQueries[i];
      console.log(`\n${i + 1}. Testing query: "${query}"`);
      
      try {
        // Test the agent-network API endpoint
        const response = await fetch('http://localhost:3000/api/agent-network', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            modelId: model.id,
            sessionId: `test_${Date.now()}_${i}`
          })
        });
        
        if (!response.ok) {
          console.error(`❌ API Error: ${response.status} ${response.statusText}`);
          continue;
        }
        
        const result = await response.json();
        
        if (result.success) {
          console.log(`✅ Generation started successfully with session: ${result.sessionId}`);
          
          // Poll for progress and completion
          await pollForCompletion(result.sessionId);
          
        } else {
          console.error(`❌ Generation failed: ${result.error}`);
        }
        
      } catch (error) {
        console.error(`❌ Test failed: ${error.message}`);
      }
      
      // Wait a bit between tests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log("\n🎉 All tests completed!");
}

async function pollForCompletion(sessionId) {
  console.log("⏳ Polling for completion...");
  
  let attempts = 0;
  const maxAttempts = 30; // 30 seconds max
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`http://localhost:3000/api/agent-network?sessionId=${sessionId}`);
      
      if (!response.ok) {
        console.error(`❌ Progress poll error: ${response.status}`);
        break;
      }
      
      const data = await response.json();
      
      if (data.progress) {
        console.log(`📈 Progress: ${data.progress.progress}% - ${data.progress.message}`);
      }
      
      if (data.complete && data.network) {
        console.log("✅ Network generation completed!");
        console.log(`📊 Network stats: ${data.network.metadata?.nodeCount || 0} nodes, ${data.network.metadata?.linkCount || 0} links`);
        
        // Validate network structure
        validateNetwork(data.network);
        return;
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Polling error: ${error.message}`);
      break;
    }
  }
  
  console.log("⏰ Timeout waiting for completion");
}

function validateNetwork(network) {
  console.log("\n🔍 Validating network structure...");
  
  let issues = [];
  
  // Check nodes
  if (!network.nodes || !Array.isArray(network.nodes)) {
    issues.push("Missing or invalid nodes array");
  } else {
    network.nodes.forEach((node, index) => {
      if (!node.id) issues.push(`Node ${index} missing id`);
      if (!node.label) issues.push(`Node ${index} missing label`);
      if (!node.type) issues.push(`Node ${index} missing type`);
      if (!['concept', 'entity', 'method'].includes(node.type)) {
        issues.push(`Node ${index} has invalid type: ${node.type}`);
      }
    });
  }
  
  // Check links
  if (!network.links || !Array.isArray(network.links)) {
    issues.push("Missing or invalid links array");
  } else {
    network.links.forEach((link, index) => {
      if (!link.source) issues.push(`Link ${index} missing source`);
      if (!link.target) issues.push(`Link ${index} missing target`);
    });
  }
  
  // Check metadata
  if (!network.metadata) {
    issues.push("Missing metadata");
  }
  
  if (issues.length > 0) {
    console.log("❌ Validation issues found:");
    issues.forEach(issue => console.log(`   - ${issue}`));
  } else {
    console.log("✅ Network structure is valid!");
  }
}

// Run the tests
if (require.main === module) {
  testNetworkGeneration().catch(console.error);
}

module.exports = { testNetworkGeneration, validateNetwork };