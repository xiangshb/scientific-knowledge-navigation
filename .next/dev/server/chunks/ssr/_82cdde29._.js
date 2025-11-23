module.exports = [
"[project]/lib/model-config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODEL_CONFIG",
    ()=>MODEL_CONFIG,
    "PRESET_MODELS",
    ()=>PRESET_MODELS
]);
const MODEL_CONFIG = {
    apiKey: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJTaGliaW5nIFhpYW5nIiwiVXNlck5hbWUiOiJTaGliaW5nIFhpYW5nIiwiQWNjb3VudCI6IiIsIlN1YmplY3RJRCI6IjE5ODMzMzg3ODkzNTQ4NzM0MjQiLCJQaG9uZSI6IjE1MjgwOTk1NjIzIiwiR3JvdXBJRCI6IjE5ODMzMzg3ODkzNDY0ODQ4MTYiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiIiLCJDcmVhdGVUaW1lIjoiMjAyNS0xMS0xNyAwMTo0NzoxMiIsIlRva2VuVHlwZSI6NCwiaXNzIjoibWluaW1heCJ9.J9DXYnr6kbFABZZREpiuEJFsjIq7gSfNcHqjlBVc0RhPV3ayukzfpQOdescWWt_dDNar704FKZ3ObhVlv8SoZqVZBgqRY754M5xdkGtZ83ytI0MF6eXTyPVMho-L_NFM7ZagKhSXuDJS8M5dZ6ccZfcsK8zHFh6mUuhJV9x2-jyoUPFtWNNCfYEitOfGdxuxIoiJdvHz6mJNRfhVGELxhw1kr6v-xwf3CEAILZCYSABIGfeTkL6IrC69JpPheN8pgCASD_Qh6wKlGZnrNiHV5sFcBP-ADELucPT5QSo_Wj7MvsG9csHeONubxxYKKK6S5TvEIuGLnmCjcRG5k1mEiA",
    baseURL: "https://api.minimaxi.com/v1",
    model: "MiniMax-M2-Stable"
};
const PRESET_MODELS = [
    {
        id: "doubao-pro",
        name: "Doubao Seed 1.6 Lite",
        baseURL: "https://ark.cn-beijing.volces.com/api/v3",
        connectionURL: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
        apiKey: "2ee34654-7f98-46bc-b879-6ed4fb57eddf",
        model: "doubao-seed-1-6-lite-251015",
        provider: "doubao"
    },
    {
        id: "minimax",
        name: "MiniMax M2",
        baseURL: "https://api.minimaxi.com/v1",
        connectionURL: "https://api.minimaxi.com/v1/chat/completions",
        apiKey: MODEL_CONFIG.apiKey,
        model: "MiniMax-M2-Stable",
        provider: "minimax"
    },
    {
        id: "ChatGLM",
        name: "ChatGLM-4.6",
        baseURL: "https://open.bigmodel.cn/api/coding/paas/v4",
        connectionURL: "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions",
        apiKey: MODEL_CONFIG.apiKey,
        model: "glm-4.6",
        provider: "ChatGLM"
    }
];
}),
"[project]/actions/generate-network.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"6063887146a4bada5d7c7da9cdefcb502edaefcff1":"generateNetworkFromText"},"",""] */ __turbopack_context__.s([
    "generateNetworkFromText",
    ()=>generateNetworkFromText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/model-config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function generateNetworkFromText(text, configOverride) {
    const config = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MODEL_CONFIG"],
        ...configOverride
    };
    console.log("[v0] Generating network with model:", config.model);
    const apiUrl = configOverride?.connectionURL || config.baseURL;
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    {
                        role: "system",
                        content: `You are a scientific knowledge graph extractor. 
            Analyze the user's scientific text and extract key entities (Concepts, Methods, Metrics) and their relationships.
            
            Return ONLY a valid JSON object with this exact structure, no markdown formatting, no explanation:
            {
              "nodes": [
                { "id": "string", "label": "string", "type": "concept" | "entity" | "method" }
              ],
              "links": [
                { "source": "id_of_source_node", "target": "id_of_target_node", "label": "relationship_name" }
              ]
            }
            `
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                stream: false
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[v0] API Error: ${response.status} - ${apiUrl} - ${errorText}`);
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error("Invalid API response structure");
        }
        const content = data.choices[0].message.content;
        // Robust JSON Extraction
        let parsedData;
        let extractionError = null;
        try {
            // 1. Try direct parse
            parsedData = JSON.parse(content);
        } catch (e) {
            // 2. Try extracting from markdown block
            const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
            if (jsonMatch && jsonMatch[1]) {
                try {
                    parsedData = JSON.parse(jsonMatch[1]);
                } catch (e2) {
                    // 3. Try finding first { and last }
                    const start = content.indexOf("{");
                    const end = content.lastIndexOf("}");
                    if (start !== -1 && end !== -1) {
                        const jsonString = content.substring(start, end + 1);
                        parsedData = JSON.parse(jsonString);
                    } else {
                        extractionError = "Could not parse JSON from model output";
                    }
                }
            } else {
                // 3. Fallback: Try finding first { and last } directly
                const start = content.indexOf("{");
                const end = content.lastIndexOf("}");
                if (start !== -1 && end !== -1) {
                    const jsonString = content.substring(start, end + 1);
                    parsedData = JSON.parse(jsonString);
                } else {
                    extractionError = "Could not parse JSON from model output";
                }
            }
        }
        if (extractionError || !parsedData) {
            console.warn("[v0] JSON extraction failed, returning raw content:", content.substring(0, 100));
            return {
                nodes: [],
                links: [],
                rawContent: content,
                error: extractionError
            };
        }
        // Validations for response structure
        if (!parsedData.nodes || !Array.isArray(parsedData.nodes)) {
            return {
                nodes: [],
                links: [],
                rawContent: content,
                error: "Missing 'nodes' array in JSON output"
            };
        }
        const nodes = parsedData.nodes.map((node, i)=>({
                ...node,
                // Random initial position for the force layout to organize
                x: Math.random() * 800 + 100,
                y: Math.random() * 600 + 100,
                // Assign radius based on type
                radius: node.type === "concept" ? 30 : node.type === "method" ? 25 : 20
            }));
        const links = (parsedData.links || []).map((link)=>({
                source: link.source,
                target: link.target,
                type: "relates_to",
                label: link.label
            }));
        return {
            nodes,
            links,
            rawContent: content
        };
    } catch (error) {
        console.error("[v0] Generation failed:", error);
        console.log("[v0] Falling back to simulation mode due to error");
        const nodeCount = Math.max(5, Math.min(15, Math.floor(text.length / 20)));
        const newNodes = Array.from({
            length: nodeCount
        }).map((_, i)=>({
                id: `generated-${i}`,
                x: Math.random() * 800 + 100,
                y: Math.random() * 600 + 100,
                type: i % 3 === 0 ? "concept" : i % 3 === 1 ? "entity" : "method",
                label: `Extracted Term ${i + 1}`,
                radius: i % 3 === 0 ? 30 : 20
            }));
        const newLinks = newNodes.slice(1).map((node, i)=>({
                source: newNodes[0].id,
                target: node.id,
                type: "relates_to",
                label: "connected_to"
            }));
        return {
            nodes: newNodes,
            links: newLinks,
            isFallback: true,
            error: String(error)
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateNetworkFromText
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateNetworkFromText, "6063887146a4bada5d7c7da9cdefcb502edaefcff1", null);
}),
"[project]/.next-internal/server/app/knowledge-network/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/generate-network.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$generate$2d$network$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/generate-network.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/knowledge-network/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/generate-network.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "6063887146a4bada5d7c7da9cdefcb502edaefcff1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$generate$2d$network$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateNetworkFromText"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$knowledge$2d$network$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$generate$2d$network$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/knowledge-network/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/generate-network.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$generate$2d$network$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/generate-network.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_82cdde29._.js.map