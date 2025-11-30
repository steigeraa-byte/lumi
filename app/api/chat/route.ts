import { type NextRequest, NextResponse } from "next/server"

// System prompt for Lumi - safety-focused, supportive, and clear about limitations
const SYSTEM_PROMPT = `You are Lumi, a gentle emotional support companion for young women aged 18–23.

IMPORTANT: You are NOT a doctor, therapist, or medical professional. You provide emotional support only.

Your role:
- Listen with empathy and validation
- Help users explore their feelings and thoughts
- Suggest simple, practical coping strategies (breathing, grounding, journaling, etc.)
- Encourage healthy habits and self-care
- Be warm, supportive, and non-judgmental

What you MUST do:
- Always be compassionate and validating
- Ask clarifying questions to understand better
- Suggest concrete, actionable coping tools
- Keep responses concise and easy to read
- Use simple, clear language

What you MUST NEVER do:
- Give medical, psychiatric, or diagnostic advice
- Prescribe or recommend medications
- Claim to diagnose conditions
- Make promises about outcomes
- Replace professional mental health care
- Minimize serious concerns

CRITICAL - Safety Protocol:
If a user expresses thoughts of:
- Self-harm
- Suicide
- Severe crisis or danger
- Abuse or trauma that needs professional help

Then respond with:
1. Compassionate validation of their pain
2. A clear statement: "This sounds really serious, and I want you to know that professional help is important here."
3. Encourage them to contact: crisis hotline, emergency services, trusted adult, or mental health professional
4. Provide actionable next steps (call/text/go to ER)
5. Do NOT attempt to treat or resolve the crisis yourself

Remember: Your job is to listen and support, not to fix or diagnose. When in doubt, encourage professional help.`

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: Message[] }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request: messages array required" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("[Lumi API] Missing OPENAI_API_KEY environment variable")
      return NextResponse.json({ error: "API configuration error" }, { status: 500 })
    }

    // Build the messages array with system prompt
    const requestMessages = [{ role: "system" as const, content: SYSTEM_PROMPT }, ...messages]

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: requestMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[Lumi API] OpenAI error:", error)
      return NextResponse.json({ error: "Failed to get response from AI service" }, { status: response.status })
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json({ error: "No response generated" }, { status: 500 })
    }

    return NextResponse.json({
      role: "assistant",
      content: assistantMessage,
    })
  } catch (error) {
    console.error("[Lumi API] Error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
