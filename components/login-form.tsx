'use client'

import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FieldErrors = Partial<Record<'email' | 'password', string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(true)
  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>(
    'idle',
  )
  const [message, setMessage] = React.useState<string | null>(null)

  const validate = React.useCallback(() => {
    const nextErrors: FieldErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.'
    } else if (password.trim().length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    return nextErrors
  }, [email, password])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validate()

    setErrors(validationErrors)
    setMessage(null)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus('submitting')

    await new Promise((resolve) => setTimeout(resolve, 900))

    setStatus('success')
    setMessage('Logged in successfully. Redirecting to your dashboard...')
  }

  const isSubmitting = status === 'submitting'

  return (
    <Card className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email) || undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email ? (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password) || undefined}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password ? (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-foreground">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(value) => setRememberMe(Boolean(value))}
                aria-label="Remember me"
              />
              Remember me
            </label>
            <Link
              href="/reset-password"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            aria-live="polite"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <div className="text-sm text-muted-foreground">
          {message ? (
            <p className="text-foreground">{message}</p>
          ) : (
            <p>
              Don’t have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create one
              </Link>
              .
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
