import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo / Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-foreground">Lumi</h1>
          <p className="text-lg text-muted-foreground">Your daily space for calm support.</p>
        </div>

        {/* Description */}
        <div className="space-y-4 rounded-2xl bg-accent bg-opacity-10 px-6 py-6">
          <p className="text-sm leading-relaxed text-foreground">
            Lumi is here to listen and support you through your day. Check in with your mood, chat with Lumi, and
            explore coping tools designed for you.
          </p>
          <p className="text-xs font-medium text-muted-foreground">
            Lumi is not a therapist and does not provide medical advice.
          </p>
        </div>

        {/* Primary CTA */}
        <Link href="/check-in" className="block">
          <Button fullWidth>Start Mood Check-In</Button>
        </Link>

        {/* Secondary Link */}
        <Link href="/chat">
          <Button variant="secondary" fullWidth>
            Go to Chat
          </Button>
        </Link>

        <div className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Log in
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="pt-4 text-xs text-muted-foreground leading-relaxed">
          <p>
            If you are in immediate danger or feel unable to keep yourself safe, please call your local emergency number
            or a crisis hotline.
          </p>
        </div>
      </div>
    </main>
  )
}
