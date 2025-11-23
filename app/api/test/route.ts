export async function GET() {
  return new Response(JSON.stringify({
    message: "API测试成功",
    timestamp: new Date().toISOString(),
    status: "ok"
  }), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("测试API接收到:", body)
    
    return new Response(JSON.stringify({
      message: "测试成功",
      received: body,
      timestamp: new Date().toISOString(),
      status: "ok"
    }), {
    headers: {
      "Content-Type": "application/json",
    },
    })
  } catch (error) {
    console.error("测试API错误:", error)
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : String(error),
      status: "error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}