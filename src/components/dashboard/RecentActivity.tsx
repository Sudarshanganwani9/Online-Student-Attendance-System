import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useAttendance } from "@/hooks/useAttendance"

const RecentActivity = () => {
  const { getRecentAttendance } = useAttendance()
  const { data: activities, isLoading } = getRecentAttendance()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-success text-success-foreground"
      case "absent":
        return "bg-destructive text-destructive-foreground"
      case "late":
        return "bg-warning text-warning-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`
    }
  }

  if (isLoading) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities && activities.length > 0 ? (
            activities.map((activity: any) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(activity.student?.name || 'Unknown')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.student?.name || 'Unknown Student'}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.class?.name || 'Unknown Class'}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.marked_at)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent attendance records
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivity