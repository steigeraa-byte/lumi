"use client"
import { Button } from "@/components/ui/button"

type Mood = "calm" | "sad" | "anxious" | "overwhelmed" | "motivated" | "lonely"

interface MoodSelectorProps {
  value?: Mood
  onChange: (mood: Mood) => void
}

const moods: { id: Mood; label: string; emoji: string }[] = [
  { id: "calm", label: "Calm", emoji: "😌" },
  { id: "sad", label: "Sad", emoji: "😔" },
  { id: "anxious", label: "Anxious", emoji: "😰" },
  { id: "overwhelmed", label: "Overwhelmed", emoji: "😵" },
  { id: "motivated", label: "Motivated", emoji: "💪" },
  { id: "lonely", label: "Lonely", emoji: "😞" },
]

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {moods.map((mood) => (
        <Button
          key={mood.id}
          onClick={() => onChange(mood.id)}
          variant={value === mood.id ? "default" : "outline"}
          className="flex flex-col items-center gap-2 h-auto py-6"
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="text-sm">{mood.label}</span>
        </Button>
      ))}
    </div>
  )
}
