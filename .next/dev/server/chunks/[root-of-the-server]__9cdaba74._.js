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
"[externals]/node:http [external] (node:http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:http", () => require("node:http"));

module.exports = mod;
}),
"[externals]/node:https [external] (node:https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:https", () => require("node:https"));

module.exports = mod;
}),
"[externals]/node:zlib [external] (node:zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:zlib", () => require("node:zlib"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:stream/web [external] (node:stream/web, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/web", () => require("node:stream/web"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:net [external] (node:net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:net", () => require("node:net"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[project]/app/api/stream-model/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$node$2d$fetch$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/node-fetch/src/index.js [app-route] (ecmascript) <locals>");
;
const runtime = "nodejs";
async function POST(req) {
    try {
        const { prompt, config } = await req.json();
        let apiUrl = config.connectionURL;
        if (!apiUrl) {
            apiUrl = config.baseURL || "";
            if (!apiUrl.endsWith("/chat/completions")) {
                apiUrl += apiUrl.endsWith("/") ? "chat/completions" : "/chat/completions";
            }
        }
        console.log(`[Stream API] Calling URL: ${apiUrl}`);
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$node$2d$fetch$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI assistant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: true
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Stream API] Error ${response.status}:`, errorText);
            return new Response(errorText || `Error ${response.status}`, {
                status: response.status
            });
        }
        // 创建正确的SSE流式响应
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const readableStream = new ReadableStream({
            async start (controller) {
                try {
                    if (!response.body) {
                        controller.close();
                        return;
                    }
                    let buffer = '';
                    // 使用异步迭代器处理流
                    for await (const chunk of response.body){
                        buffer += decoder.decode(chunk, {
                            stream: true
                        });
                        const lines = buffer.split('\n');
                        buffer = lines.pop() || ''; // 保留最后一个不完整的行
                        for (const line of lines){
                            if (line.trim() === '') continue;
                            if (line.includes('[DONE]')) {
                                const endData = `data: ${JSON.stringify({
                                    done: true
                                })}\n\n`;
                                controller.enqueue(encoder.encode(endData));
                                controller.close();
                                return;
                            }
                            if (line.startsWith('data: ')) {
                                try {
                                    const jsonStr = line.slice(6).trim();
                                    if (jsonStr === '') continue;
                                    const json = JSON.parse(jsonStr);
                                    if (json.choices && json.choices[0]?.delta?.content) {
                                        const content = json.choices[0].delta.content;
                                        if (content) {
                                            // 发送SSE格式的数据
                                            const sseData = `data: ${JSON.stringify({
                                                content
                                            })}\n\n`;
                                            controller.enqueue(encoder.encode(sseData));
                                        }
                                    }
                                } catch (e) {
                                    console.log("解析SSE数据失败:", line, e instanceof Error ? e.message : String(e));
                                }
                            }
                        }
                    }
                    // 处理剩余的buffer
                    if (buffer.trim()) {
                        if (buffer.includes('[DONE]')) {
                            const endData = `data: ${JSON.stringify({
                                done: true
                            })}\n\n`;
                            controller.enqueue(encoder.encode(endData));
                        } else if (buffer.startsWith('data: ')) {
                            try {
                                const jsonStr = buffer.slice(6).trim();
                                const json = JSON.parse(jsonStr);
                                if (json.choices && json.choices[0]?.delta?.content) {
                                    const content = json.choices[0].delta.content;
                                    if (content) {
                                        const sseData = `data: ${JSON.stringify({
                                            content
                                        })}\n\n`;
                                        controller.enqueue(encoder.encode(sseData));
                                    }
                                }
                            } catch (e) {
                                console.log("解析剩余数据失败:", buffer, e instanceof Error ? e.message : String(e));
                            }
                        }
                    }
                    // 发送完成信号
                    const endData = `data: ${JSON.stringify({
                        done: true
                    })}\n\n`;
                    controller.enqueue(encoder.encode(endData));
                    controller.close();
                } catch (error) {
                    console.error("[Stream API] Stream processing error:", error);
                    controller.error(error);
                }
            }
        });
        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    } catch (error) {
        console.error("[Stream API] Exception:", error);
        return new Response(`Server Error: ${error.message}`, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9cdaba74._.js.map