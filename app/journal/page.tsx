"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { useMoodHistory } from "@/hooks/use-mood-history"

const moodEmojis: Record<string, string> = {
  calm: "😌",
  sad: "😔",
  anxious: "😰",
  overwhelmed: "😵",
  motivated: "💪",
  lonely: "😞",
}

const moodColors: Record<string, string> = {
  calm: "bg-mint/20 text-foreground",
  sad: "bg-sky/20 text-foreground",
  anxious: "bg-lilac/20 text-foreground",
  overwhelmed: "bg-rose/20 text-foreground",
  motivated: "bg-mint/20 text-foreground",
  lonely: "bg-lilac/20 text-foreground",
}

export default function JournalPage() {
  const { history, isLoading } = useMoodHistory()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get last 7 days for trend display
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toLocaleDateString("en-US", { weekday: "short" })
  })

  const getMoodForDate = (dayIndex: number) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - dayIndex))
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })

    return history.find((entry) => entry.date === dateStr)
  }

  if (!mounted) {
    return null
  }

  const isEmpty = history.length === 0

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24">
      <Header title="Your Week at a Glance" subtitle="Track your mood and see patterns over time" />

      <div className="flex-1 space-y-6 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
        {isEmpty ? (
          <Card className="space-y-4 text-center py-12">
            <p className="text-2xl">📝</p>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">No entries yet</h3>
              <p className="text-sm text-muted-foreground">Start by checking in with your mood to see your journey.</p>
            </div>
            <Button href="/check-in" as="a" className="w-full">
              Go to Check-In
            </Button>
          </Card>
        ) : (
          <>
            {/* Weekly Trend */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">This Week</h2>
              <Card className="flex justify-around p-4">
                {last7Days.map((day, idx) => {
                  const entry = getMoodForDate(idx)
                  return (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{day}</span>
                      {entry ? (
                        <span className="text-2xl">{moodEmojis[entry.mood] || "?"}</span>
                      ) : (
                        <span className="text-lg text-muted-foreground">-</span>
                      )}
                    </div>
                  )
                })}
              </Card>
            </div>

            {/* Mood Entries */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Recent Entries</h2>
              <div className="space-y-3">
                {history.slice(0, 10).map((entry) => (
                  <Card key={entry.id} className={`p-4 ${moodColors[entry.mood] || "bg-white"}`}>
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{moodEmojis[entry.mood] || "?"}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-foreground">
                            {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                          </p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{entry.date}</span>
                        </div>
                        {entry.note && <p className="mt-2 text-sm text-foreground line-clamp-2">{entry.note}</p>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats Summary */}
            <Card className="space-y-4 bg-gradient-to-br from-mint/20 to-lilac/20">
              <h3 className="font-semibold text-foreground">Quick Insights</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Check-ins</p>
                  <p className="mt-1 text-2xl font-semibold text-primary">{history.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Most Common</p>
                  <p className="mt-1 text-xl">
                    {(() => {
                      const counts = history.reduce(
                        (acc, entry) => {
                          acc[entry.mood] = (acc[entry.mood] || 0) + 1
                          return acc
                        },
                        {} as Record<string, number>,
                      )
                      const [mostCommon] = Object.entries(counts).sort(([, a], [, b]) => b - a)[0] || ["", 0]
                      return moodEmojis[mostCommon] || "—"
                    })()}
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <BottomNav />
    </main>
  )
}
