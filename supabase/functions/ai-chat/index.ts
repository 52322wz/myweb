import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseServiceKey = "YOUR_SERVICE_ROLE_KEY"
const deepseekKey = "YOUR_DEEPSEEK_API_KEY"

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const SYSTEM_PROMPTS = {
  resume: `你是"自由的小王"个人网站的AI助手。以下是这位用户(小王的)的真实简历数据：

{{DATA}}

请基于以上数据友好地回答访客的问题。如果数据中没有相关信息，请如实告知。
用中文回答，保持简洁。`,

  projects: `以下是这位用户(小王的)全部项目数据：

{{DATA}}

请基于以上项目信息回答访客的问题。如果访客想找某个技术相关的项目(如\"那个用Supabase的项目\")，请在已有项目中搜索匹配的并详细介绍。
用中文回答，保持友好。`,

  docs: `以下是这位用户(小王的)技术笔记内容：

{{DATA}}

请基于以上笔记内容回答访客的问题。引用时注明是哪篇笔记。
用中文回答。`,
}

Deno.serve(async (req) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    })
  }

  try {
    const { mode, query, history = [] } = await req.json()

    if (!query || !mode) {
      return new Response(JSON.stringify({ error: "Missing query or mode" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Fetch data based on mode
    let dataText = ""
    if (mode === "resume") {
      const { data } = await supabase.from("resume_data").select("*").order("order_num")
      dataText = (data || []).map(d =>
        `[${d.category}] ${d.title}: ${d.content}`
      ).join("\n")
    } else if (mode === "projects") {
      const { data } = await supabase.from("projects").select("*")
      dataText = (data || []).map(p =>
        `项目: ${p.name}\n描述: ${p.description}\n技术栈: ${p.tech_stack || "未标明"}\n链接: ${p.link || "无"}`
      ).join("\n\n")
    } else if (mode === "docs") {
      const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false })
      dataText = (data || []).map(d =>
        `笔记: ${d.title}\n内容: ${d.content}`
      ).join("\n\n---\n\n")
    }

    if (!dataText.trim()) {
      return new Response(JSON.stringify({
        answer: `暂无${mode === "resume" ? "简历" : mode === "projects" ? "项目" : "文档"}数据。请管理员先在后台添加内容。`
      }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    // Build system prompt
    const systemPrompt = (SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.resume).replace("{{DATA}}", dataText)

    // Call DeepSeek
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-10), // keep last 10 messages for context
      { role: "user", content: query },
    ]

    const aiRes = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${deepseekKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    const aiJson = await aiRes.json()

    if (!aiRes.ok) {
      return new Response(JSON.stringify({
        answer: "AI 服务暂时不可用：" + (aiJson.error?.message || "未知错误")
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    const answer = aiJson.choices?.[0]?.message?.content || "没有收到回复"

    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })

  } catch (err) {
    return new Response(JSON.stringify({
      answer: "服务器错误：" + (err instanceof Error ? err.message : "未知")
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })
  }
})
