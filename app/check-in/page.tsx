"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { MoodSelector } from "@/components/mood-selector"
import { useMoodHistory } from "@/hooks/use-mood-history"

export default function CheckInPage() {
  const router = useRouter()
  const { addEntry } = useMoodHistory()

  const [selectedMood, setSelectedMood] = useState<string>("")
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!selectedMood) return

    setIsLoading(true)
    // Save the mood entry
    addEntry(selectedMood, note)

    // Redirect to chat with pre-filled context
    router.push(`/chat?mood=${selectedMood}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24">
      <Header title="How are you feeling today?" subtitle="Take a moment to check in with yourself." />

      <div className="flex-1 space-y-6 px-4 py-6 md:max-w-md md:mx-auto md:w-full">
        {/* Mood Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Pick your mood:</label>
          <MoodSelector value={selectedMood as any} onChange={setSelectedMood} />
        </div>

        {/* Optional Note */}
        <Card className="space-y-3 border-2 border-border">
          <label htmlFor="note" className="text-sm font-medium text-foreground">
            Want to add anything?
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind?"
            className="min-h-24 w-full rounded-xl border border-border bg-white p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button fullWidth onClick={handleSubmit} disabled={!selectedMood || isLoading}>
            {isLoading ? "Saving..." : "Save & Continue to Chat"}
          </Button>
          <Button variant="ghost" fullWidth onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
