import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type StatCardProps = {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function StatCard({ title, value, description, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <p className={cn("text-sm font-medium mt-2", trend.positive ? "text-success" : "text-destructive")}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
