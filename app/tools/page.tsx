"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { ToolCard } from "@/components/tools/tool-card"
import { BreathingTool } from "@/components/tools/breathing-tool"

type ActiveTool = "breathing" | "anxiety" | "sleep" | "focus" | "motivation" | null

const tools = [
  {
    id: "breathing",
    title: "Breathe",
    description: "Simple breathing exercises to calm your mind.",
    icon: "🫁",
  },
  {
    id: "anxiety",
    title: "Anxiety Relief",
    description: "Grounding techniques to manage anxious thoughts.",
    icon: "🧘",
  },
  {
    id: "sleep",
    title: "Sleep Helper",
    description: "Wind-down activities for better sleep.",
    icon: "😴",
  },
  {
    id: "focus",
    title: "Study Focus",
    description: "Techniques to improve concentration and focus.",
    icon: "📚",
  },
  {
    id: "motivation",
    title: "Motivation Boost",
    description: "Small steps to get moving again.",
    icon: "⚡",
  },
]

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null)

  if (activeTool === "breathing") {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-24">
        <Header title="Breathe" subtitle="A simple breathing exercise" />
        <div className="flex-1 space-y-6 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
          <BreathingTool onClose={() => setActiveTool(null)} />
        </div>
        <BottomNav />
      </main>
    )
  }

  if (activeTool === "anxiety") {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-24">
        <Header title="Anxiety Relief" subtitle="Grounding techniques" />
        <div className="flex-1 space-y-6 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
          <Card className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">5-4-3-2-1 Grounding</h3>
              <p className="text-sm text-muted-foreground">
                Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-primary font-semibold">5 things</span>
                <span className="text-foreground">you can see</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-semibold">4 things</span>
                <span className="text-foreground">you can touch</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-semibold">3 things</span>
                <span className="text-foreground">you can hear</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-semibold">2 things</span>
                <span className="text-foreground">you can smell</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-semibold">1 thing</span>
                <span className="text-foreground">you can taste</span>
              </div>
            </div>

            <Button fullWidth onClick={() => setActiveTool(null)}>
              Done
            </Button>
          </Card>
        </div>
        <BottomNav />
      </main>
    )
  }

  if (activeTool === "sleep") {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-24">
        <Header title="Sleep Helper" subtitle="Wind down for better rest" />
        <div className="flex-1 space-y-6 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
          <Card className="space-y-4">
            <h3 className="font-semibold text-foreground">Pre-Sleep Wind Down</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Put your phone away 30 minutes before bed</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Dim the lights and lower the temperature</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Try gentle stretching or a short walk</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Listen to calm music or white noise</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Write down your thoughts in a journal</span>
              </li>
            </ul>
            <Button fullWidth onClick={() => setActiveTool(null)}>
              Done
            </Button>
          </Card>
        </div>
        <BottomNav />
      </main>
    )
  }

  if (activeTool === "focus") {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-24">
        <Header title="Study Focus" subtitle="Improve concentration" />
        <div className="flex-1 space-y-6 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
          <Card className="space-y-4">
            <h3 className="font-semibold text-foreground">Focus Techniques</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Try the Pomodoro Technique: 25 min focus, 5 min break</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Remove distractions (phone, notifications)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Find a quiet, comfortable study space</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Stay hydrated and take care of your body</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Break tasks into smaller, manageable steps</span>
              </li>
            </ul>
            <Button fullWidth onClick={() => setActiveTool(null)}>
              Done
            </Button>
          </Card>
        </div>
        <BottomNav />
      </main>
    )
  }

  if (activeTool === "motivation") {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-24">
        <Header title="Motivation Boost" subtitle="Get moving again" />
        <div className="flex-1 space-y-6 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
          <Card className="space-y-4">
            <h3 className="font-semibold text-foreground">Small Steps Forward</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Start with ONE small action (5 minutes)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Celebrate small wins</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Get moving: walk, stretch, dance to a song</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Connect with someone for accountability</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Remember: you don't have to be perfect</span>
              </li>
            </ul>
            <Button fullWidth onClick={() => setActiveTool(null)}>
              Done
            </Button>
          </Card>
        </div>
        <BottomNav />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24">
      <Header title="Coping Tools" subtitle="Simple techniques to support your wellbeing" />

      <div className="flex-1 space-y-4 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
        {tools.map((tool) => (
          <ToolCard key={tool.id} {...tool} onClick={() => setActiveTool(tool.id as ActiveTool)} />
        ))}
      </div>

      <BottomNav />
    </main>
  )
}
