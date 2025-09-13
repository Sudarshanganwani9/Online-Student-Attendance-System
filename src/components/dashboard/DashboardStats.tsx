import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react"
import { useAttendance } from "@/hooks/useAttendance"
import { Skeleton } from "@/components/ui/skeleton"

const DashboardStats = () => {
  const { getDashboardStats } = useAttendance()
  const { data: stats, isLoading } = getDashboardStats()

  const statItems = [
    {
      title: "Total Students",
      value: stats?.totalStudents?.toString() || "0",
      icon: Users,
      change: "Active",
      changeType: "increase" as const,
    },
    {
      title: "Active Classes",
      value: stats?.totalClasses?.toString() || "0",
      icon: BookOpen,
      change: "Running",
      changeType: "increase" as const,
    },
    {
      title: "Present Today",
      value: stats?.presentToday?.toString() || "0",
      icon: Calendar,
      change: "Students",
      changeType: "increase" as const,
    },
    {
      title: "Attendance Rate",
      value: `${stats?.attendanceRate || 0}%`,
      icon: TrendingUp,
      change: "Today",
      changeType: "increase" as const,
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((stat, index) => {
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
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DashboardStats