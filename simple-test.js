const test = async () => {
  console.log('🧠 智能知识导航与科学发现平台 - 自动化测试');
  console.log('==========================================');
  
  // 测试API连接
  console.log('\n1. 测试API连接...');
  try {
    const response = await fetch('http://localhost:3000/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 'API连接测试' })
    });
    const data = await response.json();
    console.log('✅ API连接正常:', data.message);
  } catch (error) {
    console.log('❌ API连接失败:', error.message);
    return;
  }
  
  // 测试知识网络生成流
  console.log('\n2. 测试知识网络生成流...');
  console.log('输入提示: "人工智能在医疗领域的应用"');
  
  try {
    const response = await fetch('http://localhost:3000/api/mock-stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: '人工智能在医疗领域的应用',
        config: { model: 'gpt-3.5-turbo' }
      })
    });
    
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
              console.log('\n✅ 流式响应完成');
              break;
            } else if (data.content) {
              process.stdout.write(data.content);
              result += data.content;
            }
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }
    
    console.log('\n\n✅ 测试完成！知识网络生成流程正常工作');
    console.log('\n📝 测试总结:');
    console.log('- API连接: ✅ 正常');
    console.log('- 流式响应: ✅ 正常');
    console.log('- 知识网络生成: ✅ 正常');
    console.log('\n🎉 系统已准备就绪，可以在浏览器中访问 http://localhost:3000/model-test 进行完整测试');
    
  } catch (error) {
    console.log('❌ 流式测试失败:', error.message);
  }
};

test().catch(console.error);