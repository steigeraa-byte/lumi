"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ToolCardProps {
  id: string
  title: string
  description: string
  icon: string
  onClick: () => void
}

export function ToolCard({ title, description, icon, onClick }: ToolCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <span className="text-3xl flex-shrink-0">{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} variant="outline" className="w-full bg-transparent">
          Open
        </Button>
      </CardContent>
    </Card>
  )
}
