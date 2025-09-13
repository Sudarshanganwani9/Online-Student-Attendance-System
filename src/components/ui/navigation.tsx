import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Calendar, BarChart3, Menu } from "lucide-react"
import { useState } from "react"

interface NavigationProps {
  currentView: string
  onViewChange: (view: string) => void
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Classes', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex h-16 items-center justify-between px-6 bg-card border-b shadow-card">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            EduTracker
          </h1>
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-card border-b shadow-card">
        <div className="flex items-center justify-between px-4 h-16">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            EduTracker
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {isMobileMenuOpen && (
          <div className="px-4 pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onViewChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full justify-start space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </div>
        )}
      </nav>
    </>
  )
}

export default Navigation