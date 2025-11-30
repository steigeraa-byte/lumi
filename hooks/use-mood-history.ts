"use client"

import { useEffect, useState } from "react"

export interface MoodEntry {
  id: string
  mood: string
  note: string
  date: string
  timestamp: number
}

export function useMoodHistory() {
  const [history, setHistory] = useState<MoodEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("lumi_mood_history")
    if (stored) {
      try {
        setHistory(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to load mood history:", e)
      }
    }
    setIsLoading(false)
  }, [])

  const addEntry = (mood: string, note: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      note,
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      timestamp: Date.now(),
    }

    const updated = [newEntry, ...history]
    setHistory(updated)
    localStorage.setItem("lumi_mood_history", JSON.stringify(updated))
  }

  return { history, addEntry, isLoading }
}
