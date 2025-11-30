"use client"

import { useState, useEffect } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

type BreathingStage = "ready" | "inhale" | "hold-in" | "exhale" | "hold-out"

export function BreathingTool({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<BreathingStage>("ready")
  const [count, setCount] = useState(4)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const durations: Record<BreathingStage, number> = {
      ready: 0,
      inhale: 4,
      "hold-in": 4,
      exhale: 4,
      "hold-out": 4,
    }

    const duration = durations[stage]
    if (duration === 0) return

    const totalMs = duration * 1000
    const interval = totalMs / duration
    let current = duration

    const timer = setInterval(() => {
      current--
      setCount(current)

      if (current <= 0) {
        const stageOrder: BreathingStage[] = ["inhale", "hold-in", "exhale", "hold-out"]
        const currentIndex = stageOrder.indexOf(stage)
        const nextStage = stageOrder[(currentIndex + 1) % stageOrder.length]
        setStage(nextStage)
        setCount(durations[nextStage])
      }
    }, interval)

    return () => clearInterval(timer)
  }, [stage, isActive])

  const stageText: Record<BreathingStage, string> = {
    ready: "Ready to begin?",
    inhale: `Breathe in... ${count}`,
    "hold-in": `Hold... ${count}`,
    exhale: `Breathe out... ${count}`,
    "hold-out": `Hold... ${count}`,
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-6 bg-gradient-to-br from-accent/20 to-primary/10">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Take a moment to breathe. This simple exercise can help calm your nervous system.
          </p>
        </div>

        <div className="flex h-32 items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-semibold text-primary">{stage === "ready" ? "∞" : count}</div>
            <p className="mt-4 text-lg text-foreground">{stageText[stage]}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => {
              setIsActive(!isActive)
              if (!isActive) {
                setStage("inhale")
                setCount(4)
              }
            }}
            fullWidth
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="secondary" onClick={onClose} fullWidth>
            Done
          </Button>
        </div>
      </Card>
    </div>
  )
}
