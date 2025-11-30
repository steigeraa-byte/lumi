"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Smile, MessageCircle, Heart, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/check-in", label: "Check-In", icon: Smile },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/tools", label: "Tools", icon: Heart },
  { href: "/journal", label: "Journal", icon: BarChart3 },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide bottom nav on home page
  if (pathname === "/") return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background">
      <div className="flex h-20 items-center justify-around px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition-colors text-xs font-medium",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon size={24} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
