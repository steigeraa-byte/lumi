"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { ChatMessage } from "@/components/chat/chat-message"
import { CrisisBanner } from "@/components/layout/crisis-banner"
import { Send, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const searchParams = useSearchParams()
  const mood = searchParams.get("mood")

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (mood && !hasGreeted) {
      addInitialGreeting()
      setHasGreeted(true)
    }
  }, [mood, hasGreeted])

  const addInitialGreeting = async () => {
    const moodLabel = mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : "here"
    const userMessage = `I'm feeling ${moodLabel} right now.`

    const newMessages: Message[] = [{ role: "user", content: userMessage }]
    setMessages(newMessages)

    await fetchChatResponse(newMessages)
  }

  const fetchChatResponse = async (messagesToSend: Message[]) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesToSend }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }]
    setMessages(newMessages)

    await fetchChatResponse(newMessages)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24">
      <Header title="Talk to Lumi" subtitle="This is a private space. I'm here to listen." />

      <CrisisBanner />

      {/* Safety Disclaimer */}
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <p className="text-xs text-muted-foreground text-center">
          Lumi is not a therapist and does not provide medical advice.
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <Card className="max-w-xs text-center p-6">
              <p className="text-sm text-muted-foreground">Start a conversation by sharing what's on your mind.</p>
            </Card>
          </div>
        )}

        {messages.map((message, idx) => (
          <ChatMessage key={idx} role={message.role} content={message.content} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-white border border-accent px-4 py-2">
              <Loader2 size={16} className="animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Lumi is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="fixed bottom-24 left-0 right-0 border-t border-border bg-background px-4 py-4 md:max-w-md md:left-1/2 md:right-auto md:transform md:-translate-x-1/2">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your thoughts..."
            rows={2}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-border bg-white p-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="mt-auto flex h-12 w-12 items-center justify-center p-0"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
