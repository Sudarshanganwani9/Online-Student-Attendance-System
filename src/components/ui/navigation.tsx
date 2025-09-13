import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, BookOpen, Calendar, BarChart3, Menu, Bell, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

interface NavigationProps {
  currentView: string
  onViewChange: (view: string) => void
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>
          
          {user && (
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.email?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
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