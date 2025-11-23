export const MODEL_CONFIG = {
  apiKey:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJTaGliaW5nIFhpYW5nIiwiVXNlck5hbWUiOiJTaGliaW5nIFhpYW5nIiwiQWNjb3VudCI6IiIsIlN1YmplY3RJRCI6IjE5ODMzMzg3ODkzNTQ4NzM0MjQiLCJQaG9uZSI6IjE1MjgwOTk1NjIzIiwiR3JvdXBJRCI6IjE5ODMzMzg3ODkzNDY0ODQ4MTYiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiIiLCJDcmVhdGVUaW1lIjoiMjAyNS0xMS0xNyAwMTo0NzoxMiIsIlRva2VuVHlwZSI6NCwiaXNzIjoibWluaW1heCJ9.J9DXYnr6kbFABZZREpiuEJFsjIq7gSfNcHqjlBVc0RhPV3ayukzfpQOdescWWt_dDNar704FKZ3ObhVlv8SoZqVZBgqRY754M5xdkGtZ83ytI0MF6eXTyPVMho-L_NFM7ZagKhSXuDJS8M5dZ6ccZfcsK8zHFh6mUuhJV9x2-jyoUPFtWNNCfYEitOfGdxuxIoiJdvHz6mJNRfhVGELxhw1kr6v-xwf3CEAILZCYSABIGfeTkL6IrC69JpPheN8pgCASD_Qh6wKlGZnrNiHV5sFcBP-ADELucPT5QSo_Wj7MvsG9csHeONubxxYKKK6S5TvEIuGLnmCjcRG5k1mEiA",
  baseURL: "https://api.minimaxi.com/v1",
  model: "MiniMax-M2-Stable",
}

export const PRESET_MODELS = [
  {
    id: "doubao-pro",
    name: "Doubao Pro (Seed 1.6 Lite)",
    baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    connectionURL: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
    apiKey: "2ee34654-7f98-46bc-b879-6ed4fb57eddf",
    model: "doubao-seed-1-6-lite-251015",
    provider: "doubao",
  },
  {
    id: "minimax",
    name: "MiniMax M2",
    baseURL: "https://api.minimaxi.com/v1",
    connectionURL: "https://api.minimaxi.com/v1/chat/completions",
    apiKey: MODEL_CONFIG.apiKey,
    model: "MiniMax-M2-Stable",
    provider: "minimax",
  },
]
