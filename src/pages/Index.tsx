import { useState } from "react"
import Navigation from "@/components/ui/navigation"
import DashboardStats from "@/components/dashboard/DashboardStats"
import RecentActivity from "@/components/dashboard/RecentActivity"
import StudentList from "@/components/students/StudentList"
import ClassSchedule from "@/components/classes/ClassSchedule"
import AttendanceTracker from "@/components/attendance/AttendanceTracker"
import AuthDialog from "@/components/auth/AuthDialog"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard")
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const { user, loading } = useAuth()

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show authentication dialog if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Student Attendance System
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Streamline your classroom management with our comprehensive attendance tracking system.
            </p>
          </div>
          <Button 
            onClick={() => setAuthDialogOpen(true)}
            className="bg-gradient-primary hover:opacity-90"
            size="lg"
          >
            Get Started
          </Button>
        </div>
        <AuthDialog 
          open={authDialogOpen} 
          onOpenChange={setAuthDialogOpen}
        />
      </div>
    )
  }

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
