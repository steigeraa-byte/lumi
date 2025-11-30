import Link from 'next/link'

import { LoginForm } from '@/components/login-form'

export const metadata = {
  title: 'Log in | Lumi',
  description: 'Access your Lumi space to continue your calm support journey.',
}

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary uppercase tracking-wide">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Log in</h1>
          <p className="text-sm text-muted-foreground">
            We saved your routines and conversations. Sign in to pick up where
            you left off.
          </p>
        </div>

        <LoginForm />

        <div className="text-xs text-muted-foreground">
          By logging in, you agree to our{' '}
          <Link
            href="/terms"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </main>
  )
}
