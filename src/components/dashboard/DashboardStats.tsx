import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react"

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Students",
      value: "248",
      icon: Users,
      change: "+12%",
      changeType: "increase" as const,
    },
    {
      title: "Active Classes",
      value: "15",
      icon: BookOpen,
      change: "+2",
      changeType: "increase" as const,
    },
    {
      title: "Today's Attendance",
      value: "89%",
      icon: Calendar,
      change: "+5%",
      changeType: "increase" as const,
    },
    {
      title: "Weekly Average",
      value: "92%",
      icon: TrendingUp,
      change: "+3%",
      changeType: "increase" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-success flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DashboardStats