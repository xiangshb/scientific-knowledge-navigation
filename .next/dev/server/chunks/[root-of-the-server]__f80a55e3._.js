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
"[project]/app/api/stream-model/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
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
        const response = await fetch(apiUrl, {
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
        // 创建一个简单的文本流响应
        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start (controller) {
                try {
                    const reader = response.body?.getReader();
                    if (!reader) {
                        controller.close();
                        return;
                    }
                    const decoder = new TextDecoder();
                    while(true){
                        const { done, value } = await reader.read();
                        if (done) break;
                        const lines = decoder.decode(value).split('\n');
                        for (const line of lines){
                            if (line.trim() === '') continue;
                            try {
                                const json = JSON.parse(line.slice(6)) // 移除 "data: " 前缀
                                ;
                                if (json.choices && json.choices[0]?.delta?.content) {
                                    const content = json.choices[0].delta.content;
                                    if (content) {
                                        controller.enqueue(encoder.encode(content));
                                    }
                                }
                            } catch (e) {
                            // 忽略无法解析的行
                            }
                        }
                    }
                    controller.close();
                } catch (error) {
                    console.error("[Stream API] Stream processing error:", error);
                    controller.error(error);
                }
            }
        });
        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f80a55e3._.js.map