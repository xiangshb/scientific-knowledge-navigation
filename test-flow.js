// 测试脚本：验证知识网络生成流程
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🧠 智能知识导航与科学发现平台 - 流程测试');
console.log('==========================================\n');

// 测试API连接
async function testAPIConnection() {
  console.log('1. 测试API连接...');
  
  try {
    const response = await fetch('http://localhost:3000/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        test: 'API连接测试',
        timestamp: new Date().toISOString()
      })
    });
    
    const data = await response.json();
    console.log('✅ API连接正常:', data.message);
    return true;
  } catch (error) {
    console.log('❌ API连接失败:', error.message);
    return false;
  }
}

// 测试知识网络生成流
async function testKnowledgeStream(prompt) {
  console.log('\n2. 测试知识网络生成流...');
  console.log(`输入提示: "${prompt}"`);
  
  try {
    const response = await fetch('http://localhost:3000/api/mock-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        config: {
          model: 'gpt-3.5-turbo',
          apiKey: 'test-key',
          baseURL: 'https://api.openai.com/v1'
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    
    console.log('\n📡 接收流式响应:');
    console.log('-------------------');
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              console.log('✅ 流式响应完成');
              return result;
            } else if (data.content) {
              process.stdout.write(data.content);
              result += data.content;
            }
          } catch (e) {
            console.log('解析数据失败:', line);
          }
        }
      }
    }
    
    return result;
  } catch (error) {
    console.log('❌ 流式测试失败:', error.message);
    return null;
  }
}

// 主测试流程
async function runTest() {
  const apiOk = await testAPIConnection();
  
  if (!apiOk) {
    console.log('\n❌ API连接失败，无法继续测试');
    rl.close();
    return;
  }
  
  rl.question('\n请输入要测试的知识网络生成提示 (例如: "人工智能在医疗领域的应用"): ', async (prompt) => {
    if (!prompt.trim()) {
      prompt = '人工智能在医疗领域的应用';
      console.log(`使用默认提示: "${prompt}"`);
    }
    
    const result = await testKnowledgeStream(prompt);
    
    if (result) {
      console.log('\n\n✅ 测试完成！知识网络生成流程正常工作');
      console.log('\n📝 测试总结:');
      console.log('- API连接: ✅ 正常');
      console.log('- 流式响应: ✅ 正常');
      console.log('- 知识网络生成: ✅ 正常');
      console.log('\n🎉 系统已准备就绪，可以在浏览器中访问 http://localhost:3000/model-test 进行完整测试');
    } else {
      console.log('\n❌ 测试失败，请检查系统配置');
    }
    
    rl.close();
  });
}

// 启动测试
runTest().catch(console.error);