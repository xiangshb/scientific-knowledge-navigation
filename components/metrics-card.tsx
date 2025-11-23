import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
  icon?: React.ReactNode
  description?: string
  className?: string
}

export function MetricsCard({ title, value, change, trend, icon, description, className }: MetricsCardProps) {
  return (
    <Card className={cn("bg-card/50 border-border/60 backdrop-blur-sm shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {(change || description) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {change && (
              <span
                className={cn(
                  "font-medium",
                  trend === "up" && "text-green-500",
                  trend === "down" && "text-red-500",
                  trend === "neutral" && "text-yellow-500",
                )}
              >
                {change}
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
