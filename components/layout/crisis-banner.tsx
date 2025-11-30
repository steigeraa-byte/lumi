"use client"
import { AlertCircle } from "lucide-react"

export function CrisisBanner() {
  return (
    <div className="w-full border-b-2 border-destructive bg-destructive/5 px-4 py-4">
      <div className="flex gap-3 md:max-w-md md:mx-auto">
        <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-destructive mb-1">Need immediate help?</p>
          <p className="text-foreground text-xs leading-relaxed">
            If you're in crisis or having thoughts of self-harm, please reach out to emergency services, a crisis
            hotline, or a trusted person. You're not alone.
          </p>
        </div>
      </div>
    </div>
  )
}
