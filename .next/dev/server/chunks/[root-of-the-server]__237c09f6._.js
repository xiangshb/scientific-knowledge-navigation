module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/mock-stream/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
async function POST(req) {
    try {
        const body = await req.json();
        const { prompt, config } = body;
        console.log("模拟流式API接收到:", {
            prompt,
            config
        });
        // 创建一个模拟的AI对话流式响应
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start (controller) {
                try {
                    // 模拟AI模型的普通对话响应
                    const generateAIResponse = async ()=>{
                        // 根据用户输入生成相应的回复
                        let response = "";
                        if (prompt.includes("你好") || prompt.includes("hi") || prompt.includes("hello")) {
                            response = `你好！我是${config?.model || 'AI助手'}。很高兴为您服务！有什么我可以帮助您的吗？`;
                        } else if (prompt.includes("你是谁")) {
                            response = `我是一个AI语言模型，基于${config?.model || 'GPT技术'}构建。我可以回答问题、提供信息和协助您完成各种任务。`;
                        } else if (prompt.includes("天气")) {
                            response = `很抱歉，我无法获取实时天气信息。建议您查看天气预报应用或网站获取最新的天气情况。`;
                        } else if (prompt.includes("时间")) {
                            const now = new Date();
                            response = `当前时间是：${now.toLocaleString('zh-CN')}`;
                        } else if (prompt.includes("中国") && prompt.includes("直辖市")) {
                            response = `中国有4个直辖市：\n\n1. 北京市\n2. 上海市\n3. 天津市\n4. 重庆市\n\n这些是中国的省级行政单位，直接由中央政府管辖。`;
                        } else if (prompt.includes("中国") && prompt.includes("直辖市") && prompt.includes("详细")) {
                            response = `中国共有4个直辖市，均为中央直接管辖的省级行政区。以下是对四个直辖市的详细介绍：

## 北京市
**核心定位**：中华人民共和国首都，全国政治中心、文化中心、国际交往中心、科技创新中心。
**基本概况**：面积约1.64万平方公里，常住人口约2188.7万。
**经济特色**：2023年GDP约4.16万亿元，总部经济、金融服务、科技创新产业发达。
**文化特色**：拥有故宫、长城、天坛等世界文化遗产，高校科研资源密集。

## 上海市
**核心定位**：全国经济中心、金融中心、贸易中心、航运中心、科技创新中心。
**基本概况**：面积约6340平方公里，常住人口约2487.1万。
**经济特色**：GDP常年居全国第一，2023年约4.72万亿元，浦东开发开放为核心标志。
**文化特色**：海派文化融合中西，外滩、豫园、迪士尼等为标志，是长三角城市群龙头。

## 天津市
**核心定位**：北方重要经济中心、国际港口城市、生态宜居城市，京津冀协同发展核心城市之一。
**基本概况**：面积约1.19万平方公里，常住人口约1386.6万。
**经济特色**：北方航运中心，2023年GDP约1.67万亿元，先进制造业发达。
**文化特色**：津派文化代表，相声发源地之一，五大道、古文化街等为标志。

## 重庆市
**核心定位**：西南地区重要中心城市、长江上游经济中心、国家现代制造业基地、西部大开发战略支点。
**基本概况**：面积约8.24万平方公里，常住人口约3205.4万。
**经济特色**：西部GDP第一，2023年约3.29万亿元，汽车制造、电子信息产业发达。
**文化特色**：巴渝文化代表，火锅文化全球知名，长江三峡、大足石刻为世界遗产。

四个直辖市均为区域发展的核心引擎，在国家发展中具有重要作用。`;
                        } else {
                            // 默认回复
                            response = `感谢您的提问："${prompt}"\n\n这是一个很有趣的问题。作为AI助手，我会尽力为您提供准确和有用的信息。\n\n如果您需要更具体的帮助，请告诉我更多详情，这样我可以给您更精准的回答。`;
                        }
                        // 按词语和短语发送响应，提供更自然的阅读体验
                        const words = response.split(/(\s+|[，。！？；：、])/).filter((word)=>word.trim());
                        for (const word of words){
                            if (word.trim()) {
                                await sendChunk(word);
                                // 根据词语类型调整延迟
                                let delay;
                                if (/^[，。！？；：]$/.test(word)) {
                                    delay = Math.random() * 200 + 100; // 标点符号较长延迟
                                } else if (/^\s+$/.test(word)) {
                                    delay = Math.random() * 50 + 20; // 空格较短延迟
                                } else if (word.length <= 2) {
                                    delay = Math.random() * 80 + 40; // 短词中等延迟
                                } else {
                                    delay = Math.random() * 120 + 60; // 长词较长延迟
                                }
                                await new Promise((resolve)=>setTimeout(resolve, delay));
                            }
                        }
                        // 发送完成信号
                        await sendDone();
                    };
                    const sendChunk = async (content)=>{
                        const data = `data: ${JSON.stringify({
                            content
                        })}\n\n`;
                        controller.enqueue(encoder.encode(data));
                    };
                    const sendDone = async ()=>{
                        const endData = `data: ${JSON.stringify({
                            done: true
                        })}\n\n`;
                        controller.enqueue(encoder.encode(endData));
                        controller.close();
                    };
                    // 开始生成AI响应
                    await generateAIResponse();
                } catch (error) {
                    console.error("流式生成错误:", error);
                    const errorData = `data: ${JSON.stringify({
                        error: error instanceof Error ? error.message : String(error)
                    })}\n\n`;
                    controller.enqueue(encoder.encode(errorData));
                    controller.close();
                }
            }
        });
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        });
    } catch (error) {
        console.error("模拟流式API错误:", error);
        return new Response(JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
            status: "error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__237c09f6._.js.map