// 测试流式输出的自然度
const testStreamOutput = async () => {
  console.log('🧪 测试流式输出的自然度');
  console.log('============================');
  
  try {
    // 测试模拟API
    console.log('\n📋 测试模拟API流式输出:');
    console.log('------------------------------');
    
    const mockResponse = await fetch('http://localhost:3000/api/mock-stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: '你好，中国有几个直辖市？',
        config: { model: 'test-model' }
      })
    });
    
    const mockReader = mockResponse.body.getReader();
    const mockDecoder = new TextDecoder();
    let mockContent = '';
    let mockChunks = 0;
    
    console.log('📡 模拟API响应内容:');
    while (true) {
      const { done, value } = await mockReader.read();
      if (done) break;
      
      const chunk = mockDecoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          mockChunks++;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              console.log('\n✅ 模拟API完成');
              console.log(`📊 总数据块: ${mockChunks}`);
              console.log(`📝 内容长度: ${mockContent.length} 字符`);
              console.log(`📄 内容预览: ${mockContent.substring(0, 100)}...`);
              break;
            } else if (data.content) {
              mockContent += data.content;
            }
          } catch (e) {}
        }
      }
    }
    
    // 测试真实API
    console.log('\n📋 测试真实API流式输出:');
    console.log('------------------------------');
    
    const realConfig = {
      apiKey: '2ee34654-7f98-46bc-b879-6ed4fb57eddf',
      baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
      model: 'doubao-seed-1-6-lite-251015',
      connectionURL: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
    };
    
    const realResponse = await fetch('http://localhost:3000/api/stream-model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: '请简单介绍一下人工智能',
        config: realConfig
      })
    });
    
    if (!realResponse.ok) {
      console.log('❌ 真实API调用失败');
      return;
    }
    
    const realReader = realResponse.body.getReader();
    const realDecoder = new TextDecoder();
    let realContent = '';
    let realChunks = 0;
    
    console.log('📡 真实API响应内容:');
    while (true) {
      const { done, value } = await realReader.read();
      if (done) break;
      
      const chunk = realDecoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          realChunks++;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              console.log('\n✅ 真实API完成');
              console.log(`📊 总数据块: ${realChunks}`);
              console.log(`📝 内容长度: ${realContent.length} 字符`);
              console.log(`📄 内容预览: ${realContent.substring(0, 100)}...`);
              break;
            } else if (data.content) {
              realContent += data.content;
            }
          } catch (e) {}
        }
      }
    }
    
    // 分析结果
    console.log('\n🎉 流式输出分析');
    console.log('==================');
    console.log(`模拟API: ${mockChunks} 个数据块，平均每块 ${(mockContent.length / mockChunks).toFixed(1)} 字符`);
    console.log(`真实API: ${realChunks} 个数据块，平均每块 ${(realContent.length / realChunks).toFixed(1)} 字符`);
    
    if (mockChunks > 10 && realChunks > 10) {
      console.log('✅ 流式输出正常：数据块数量合理，内容自然流畅');
    } else {
      console.log('⚠️  流式输出可能过于碎片化');
    }
    
  } catch (error) {
    console.log('❌ 测试失败:', error.message);
  }
};

// 运行测试
testStreamOutput().catch(console.error);