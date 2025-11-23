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
"[project]/actions/test-model.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"602399c05c1dc65635474d2e3fdd8be1b5f3c67ad3":"testModelConnection"},"",""] */ __turbopack_context__.s([
    "testModelConnection",
    ()=>testModelConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/model-config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function testModelConnection(prompt, configOverride) {
    const config = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MODEL_CONFIG"],
        ...configOverride
    };
    const apiUrl = config.connectionURL || config.baseURL;
    console.log(`[v0] Testing connection to: ${apiUrl} with model: ${config.model}`);
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
                        content: "You are a helpful AI assistant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: false
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            return {
                success: false,
                raw: `Error ${response.status}: ${errorText}`,
                url: apiUrl
            };
        }
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2);
        return {
            success: true,
            content: content,
            raw: JSON.stringify(data, null, 2),
            url: apiUrl
        };
    } catch (error) {
        return {
            success: false,
            raw: `Network Error: ${error.message}`,
            url: apiUrl
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    testModelConnection
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(testModelConnection, "602399c05c1dc65635474d2e3fdd8be1b5f3c67ad3", null);
}),
"[project]/.next-internal/server/app/model-test/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/test-model.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$test$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/test-model.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/model-test/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/test-model.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "602399c05c1dc65635474d2e3fdd8be1b5f3c67ad3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$test$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["testModelConnection"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$model$2d$test$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$test$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/model-test/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/test-model.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$test$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/test-model.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=_f0d6187d._.js.map