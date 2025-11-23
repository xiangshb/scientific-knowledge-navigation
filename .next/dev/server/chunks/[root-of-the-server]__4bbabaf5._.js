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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/model-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/agents/knowledge-network-agent.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Knowledge Network Agent
 * 
 * This module provides a knowledge network generation agent that can analyze text
 * and generate causal knowledge networks using AI models.
 */ __turbopack_context__.s([
    "KnowledgeNetworkAgent",
    ()=>KnowledgeNetworkAgent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/model-config.ts [app-route] (ecmascript)");
;
class KnowledgeNetworkAgent {
    modelConfig;
    sessionId;
    progressCallback;
    constructor(modelId, sessionId, progressCallback){
        this.modelConfig = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PRESET_MODELS"].find((m)=>m.id === modelId) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PRESET_MODELS"][0];
        this.sessionId = sessionId;
        this.progressCallback = progressCallback;
    }
    /**
   * Generate a knowledge network from input text
   */ async generateNetwork(query) {
        this.updateProgress('initialization', 10, 'Initializing knowledge network generation...');
        try {
            // Step 1: Initialize model connection
            this.updateProgress('model_initialization', 20, 'Connecting to AI model...');
            // Step 2: Analyze query with AI model
            this.updateProgress('analysis', 30, 'Analyzing query with AI model...');
            const modelResponse = await this.queryModel(query);
            // Step 3: Extract network structure from response
            this.updateProgress('extraction', 50, 'Extracting network structure...');
            const extractedData = this.extractNetworkData(modelResponse);
            // Step 4: Build final network with layout
            this.updateProgress('construction', 70, 'Building network structure...');
            const networkData = this.buildNetwork(query, extractedData);
            // Step 5: Finalize network
            this.updateProgress('finalization', 90, 'Finalizing network visualization...');
            const finalNetwork = this.finalizeNetwork(networkData);
            this.updateProgress('complete', 100, 'Knowledge network generated successfully!');
            return finalNetwork;
        } catch (error) {
            console.error('Network generation failed:', error);
            this.updateProgress('error', 0, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            // Return fallback network
            return this.createFallbackNetwork(query);
        }
    }
    /**
   * Query the AI model with the user's input
   */ async queryModel(query) {
        const prompt = `You are a knowledge network extraction expert. Analyze the following query and generate a causal knowledge network.

Query: "${query}"

Your task is to:
1. Identify key concepts, entities, and methods related to the query
2. Determine causal relationships between them
3. Structure this as a knowledge network

Return your response in the following JSON format:
{
  "nodes": [
    {"id": "n1", "label": "Concept Name", "type": "concept"},
    {"id": "n2", "label": "Entity Name", "type": "entity"},
    {"id": "n3", "label": "Method Name", "type": "method"}
  ],
  "links": [
    {"source": "n1", "target": "n2", "label": "causes", "type": "causal"},
    {"source": "n2", "target": "n3", "label": "uses", "type": "methodological"}
  ]
}

Important:
- Use "concept" for abstract ideas, theories, and principles
- Use "entity" for concrete objects, data, and variables
- Use "method" for techniques, algorithms, and procedures
- Focus on causal relationships (causes, enables, requires, influences)
- Return only the JSON, no additional text`;
        const response = await fetch(this.modelConfig.connectionURL || `${this.modelConfig.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.modelConfig.apiKey}`
            },
            body: JSON.stringify({
                model: this.modelConfig.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a knowledge network extraction expert who specializes in identifying causal relationships between concepts, entities, and methods.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });
        if (!response.ok) {
            throw new Error(`Model API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
    }
    /**
   * Extract structured network data from model response
   */ extractNetworkData(response) {
        try {
            // Try to extract JSON from response
            const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[1]);
            }
            // Try to find JSON object directly
            const objectMatch = response.match(/\{[\s\S]*\}/);
            if (objectMatch) {
                return JSON.parse(objectMatch[0]);
            }
            // If no JSON found, return empty structure
            return {
                nodes: [],
                links: []
            };
        } catch (error) {
            console.error('Failed to extract network data:', error);
            return {
                nodes: [],
                links: []
            };
        }
    }
    /**
   * Build network from extracted data
   */ buildNetwork(query, extractedData) {
        const nodes = [];
        const links = [];
        // Process nodes
        if (extractedData.nodes && extractedData.nodes.length > 0) {
            extractedData.nodes.forEach((node, index)=>{
                nodes.push({
                    id: node.id || `node_${index}`,
                    label: node.label || `Node ${index + 1}`,
                    type: node.type || 'concept',
                    radius: this.getNodeRadius(node.type || 'concept')
                });
            });
        } else {
            // Create nodes from query analysis
            const queryNodes = this.analyzeQueryForNodes(query);
            nodes.push(...queryNodes);
        }
        // Process links
        if (extractedData.links && extractedData.links.length > 0) {
            extractedData.links.forEach((link)=>{
                links.push({
                    source: link.source,
                    target: link.target,
                    label: link.label || 'relates_to',
                    type: link.type || 'relates_to'
                });
            });
        } else {
            // Create basic connections between nodes
            for(let i = 0; i < nodes.length - 1; i++){
                links.push({
                    source: nodes[i].id,
                    target: nodes[i + 1].id,
                    label: 'relates_to',
                    type: 'relates_to'
                });
            }
        }
        return {
            nodes,
            links
        };
    }
    /**
   * Analyze query to extract basic nodes
   */ analyzeQueryForNodes(query) {
        const nodes = [];
        // Simple keyword extraction for fallback
        const concepts = [
            '统计学',
            '深度学习',
            '机器学习',
            '概率论',
            '神经网络',
            '回归',
            '分类'
        ];
        const entities = [
            '数据',
            '算法',
            '模型',
            '参数',
            '特征',
            '样本'
        ];
        const methods = [
            '分析',
            '预测',
            '训练',
            '优化',
            '计算',
            '验证'
        ];
        const allTerms = [
            ...concepts,
            ...entities,
            ...methods
        ];
        const foundTerms = allTerms.filter((term)=>query.includes(term));
        foundTerms.slice(0, 5).forEach((term, index)=>{
            let type = 'concept';
            if (entities.includes(term)) type = 'entity';
            else if (methods.includes(term)) type = 'method';
            nodes.push({
                id: `node_${index}`,
                label: term,
                type,
                radius: this.getNodeRadius(type)
            });
        });
        // If no terms found, create a default node
        if (nodes.length === 0) {
            nodes.push({
                id: 'node_0',
                label: 'Query Analysis',
                type: 'concept',
                radius: 30
            });
        }
        return nodes;
    }
    /**
   * Get appropriate radius for node type
   */ getNodeRadius(type) {
        switch(type){
            case 'concept':
                return 30;
            case 'entity':
                return 25;
            case 'method':
                return 20;
            default:
                return 25;
        }
    }
    /**
   * Apply layout and finalize network
   */ finalizeNetwork(network) {
        // Apply force-directed layout for initial positions
        const centerX = 400;
        const centerY = 300;
        const radius = Math.min(200, 300 / Math.sqrt(network.nodes.length));
        network.nodes.forEach((node, index)=>{
            const angle = 2 * Math.PI * index / network.nodes.length;
            node.x = centerX + radius * Math.cos(angle);
            node.y = centerY + radius * Math.sin(angle);
        });
        // Add metadata
        network.metadata = {
            nodeCount: network.nodes.length,
            linkCount: network.links.length,
            model: this.modelConfig.name,
            timestamp: new Date().toISOString()
        };
        return network;
    }
    /**
   * Create fallback network when generation fails
   */ createFallbackNetwork(query) {
        return {
            nodes: [
                {
                    id: 'n1',
                    label: 'Query Analysis',
                    type: 'concept',
                    x: 400,
                    y: 200,
                    radius: 30
                },
                {
                    id: 'n2',
                    label: 'Related Concept',
                    type: 'entity',
                    x: 300,
                    y: 300,
                    radius: 25
                },
                {
                    id: 'n3',
                    label: 'Method',
                    type: 'method',
                    x: 500,
                    y: 300,
                    radius: 20
                }
            ],
            links: [
                {
                    source: 'n1',
                    target: 'n2',
                    label: 'relates_to',
                    type: 'relates_to'
                },
                {
                    source: 'n1',
                    target: 'n3',
                    label: 'uses',
                    type: 'relates_to'
                }
            ],
            metadata: {
                nodeCount: 3,
                linkCount: 2,
                inputText: query,
                fallback: true,
                timestamp: new Date().toISOString()
            }
        };
    }
    /**
   * Update progress with callback
   */ updateProgress(step, progress, message) {
        const progressData = {
            step,
            progress,
            message,
            timestamp: Date.now()
        };
        if (this.progressCallback) {
            this.progressCallback(progressData);
        }
        console.log(`[KnowledgeNetworkAgent] ${progress}% - ${step}: ${message}`);
    }
}
}),
"[project]/app/api/agent-network/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2f$knowledge$2d$network$2d$agent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/agents/knowledge-network-agent.ts [app-route] (ecmascript)");
;
;
// In-memory progress tracking (in production, use Redis or database)
const progressMap = new Map();
async function POST(request) {
    try {
        const { query, modelId, sessionId } = await request.json();
        if (!query || !sessionId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Query and sessionId are required'
            }, {
                status: 400
            });
        }
        console.log(`[AgentNetwork] Starting network generation for query: "${query}" with model: ${modelId}`);
        // Create progress callback
        const progressCallback = (progress)=>{
            progressMap.set(sessionId, progress);
        };
        // Start network generation in background
        generateNetworkInBackground(query, modelId, sessionId, progressCallback);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            sessionId,
            message: 'Network generation started'
        });
    } catch (error) {
        console.error('[AgentNetwork] Error starting network generation:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to start network generation',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Session ID is required'
        }, {
            status: 400
        });
    }
    try {
        const progress = progressMap.get(sessionId);
        // Check if generation is complete
        let network = null;
        let complete = false;
        if (progress && progress.step === 'complete') {
            // In a real implementation, you'd retrieve the completed network
            // For now, we'll simulate completion
            network = await getCompletedNetwork(sessionId);
            complete = network !== null;
            if (complete) {
                // Clean up progress
                progressMap.delete(sessionId);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            progress,
            network,
            complete
        });
    } catch (error) {
        console.error('[AgentNetwork] Error getting progress:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to get progress',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
// Background function to generate network
async function generateNetworkInBackground(query, modelId, sessionId, progressCallback) {
    try {
        const agent = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2f$knowledge$2d$network$2d$agent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeNetworkAgent"](modelId, sessionId, progressCallback);
        const networkData = await agent.generateNetwork(query);
        // Store completed network (in production, use database)
        await storeCompletedNetwork(sessionId, networkData);
        // Mark as complete
        progressCallback({
            step: 'complete',
            progress: 100,
            message: 'Knowledge network generated successfully!',
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('[AgentNetwork] Background generation failed:', error);
        // Mark as error
        progressCallback({
            step: 'error',
            progress: 0,
            message: `Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            timestamp: Date.now()
        });
    }
}
// In-memory storage for completed networks (in production, use database)
const completedNetworks = new Map();
async function storeCompletedNetwork(sessionId, networkData) {
    completedNetworks.set(sessionId, networkData);
}
async function getCompletedNetwork(sessionId) {
    return completedNetworks.get(sessionId) || null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4bbabaf5._.js.map