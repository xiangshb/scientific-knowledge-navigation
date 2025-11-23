// 测试真实API的流式响应
const testRealAPI = async () => {
  console.log('🧪 测试真实AI模型流式响应');
  console.log('================================');
  
  try {
    // 使用用户配置的真实API信息
    const config = {
      apiKey: '2ee34654-7f98-46bc-b879-6ed4fb57eddf',
      baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
      model: 'doubao-seed-1-6-lite-251015',
      connectionURL: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
    };
    
    const prompt = '你好，中国有几个直辖市，请分别详细介绍一下四个直辖市的情况';
    
    console.log(`📡 调用真实API: ${config.connectionURL}`);
    console.log(`🤖 使用模型: ${config.model}`);
    console.log(`❓ 问题: ${prompt}`);
    console.log('\n📡 接收流式响应:');
    console.log('-------------------');
    
    const response = await fetch('http://localhost:3000/api/stream-model', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        config: config
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API调用失败:', errorText);
      return;
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let chunkCount = 0;
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          chunkCount++;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              console.log('\n✅ 流式响应完成');
              console.log(`📊 总共收到 ${chunkCount} 个数据块`);
              console.log(`📝 完整响应长度: ${fullResponse.length} 字符`);
              return;
            } else if (data.content) {
              process.stdout.write(data.content);
              fullResponse += data.content;
            }
          } catch (e) {
            console.log('解析数据失败:', line);
          }
        }
      }
    }
    
  } catch (error) {
    console.log('❌ 测试失败:', error.message);
  }
};

// 运行测试
testRealAPI().catch(console.error);