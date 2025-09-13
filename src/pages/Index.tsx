import { useState } from "react"
import Navigation from "@/components/ui/navigation"
import DashboardStats from "@/components/dashboard/DashboardStats"
import RecentActivity from "@/components/dashboard/RecentActivity"
import StudentList from "@/components/students/StudentList"
import ClassSchedule from "@/components/classes/ClassSchedule"
import AttendanceTracker from "@/components/attendance/AttendanceTracker"

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard")

  const renderView = () => {
    switch (currentView) {
      case "students":
        return <StudentList />
      case "classes":
        return <ClassSchedule />
      case "attendance":
        return <AttendanceTracker />
      default:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
              <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              <div className="space-y-6">
                {/* Additional dashboard widgets can go here */}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>
    </div>
  )
};

export default Index;
