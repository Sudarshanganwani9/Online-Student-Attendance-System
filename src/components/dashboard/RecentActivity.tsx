import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      student: "Sarah Johnson",
      class: "Mathematics 101",
      status: "Present",
      time: "2 hours ago",
      initials: "SJ",
    },
    {
      id: 2,
      student: "Mike Chen",
      class: "Physics 201",
      status: "Absent",
      time: "3 hours ago",
      initials: "MC",
    },
    {
      id: 3,
      student: "Emma Davis",
      class: "Chemistry 102",
      status: "Late",
      time: "4 hours ago",
      initials: "ED",
    },
    {
      id: 4,
      student: "James Wilson",
      class: "Biology 101",
      status: "Present",
      time: "5 hours ago",
      initials: "JW",
    },
    {
      id: 5,
      student: "Lisa Brown",
      class: "Mathematics 101",
      status: "Present",
      time: "6 hours ago",
      initials: "LB",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-success text-success-foreground"
      case "Absent":
        return "bg-destructive text-destructive-foreground"
      case "Late":
        return "bg-warning text-warning-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.student}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.class}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivity