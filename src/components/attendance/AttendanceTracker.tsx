import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Save } from "lucide-react"
import { useState } from "react"

const AttendanceTracker = () => {
  const [selectedClass, setSelectedClass] = useState("")
  const [attendance, setAttendance] = useState<Record<number, "present" | "absent" | "late">>({})

  const classes = [
    { id: "math101", name: "Mathematics 101", time: "09:00 - 10:30" },
    { id: "physics201", name: "Physics 201", time: "11:00 - 12:30" },
    { id: "chemistry102", name: "Chemistry 102", time: "14:00 - 15:30" },
  ]

  const students = [
    { id: 1, name: "Sarah Johnson", initials: "SJ" },
    { id: 2, name: "Mike Chen", initials: "MC" },
    { id: 3, name: "Emma Davis", initials: "ED" },
    { id: 4, name: "James Wilson", initials: "JW" },
    { id: 5, name: "Lisa Brown", initials: "LB" },
    { id: 6, name: "David Garcia", initials: "DG" },
    { id: 7, name: "Anna Martinez", initials: "AM" },
    { id: 8, name: "Tom Anderson", initials: "TA" },
  ]

  const updateAttendance = (studentId: number, status: "present" | "absent" | "late") => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  const getStatusIcon = (status: "present" | "absent" | "late" | undefined) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "absent":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "late":
        return <Clock className="h-5 w-5 text-warning" />
      default:
        return null
    }
  }

  const getStatusColor = (status: "present" | "absent" | "late") => {
    switch (status) {
      case "present":
        return "bg-success hover:bg-success/80"
      case "absent":
        return "bg-destructive hover:bg-destructive/80"
      case "late":
        return "bg-warning hover:bg-warning/80"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Attendance Tracker</h2>
          <p className="text-muted-foreground">Mark attendance for your classes</p>
        </div>
        <Button className="bg-gradient-accent hover:opacity-90">
          <Save className="h-4 w-4 mr-2" />
          Save Attendance
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Select Class</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a class to mark attendance" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.name} - {classItem.time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <p className="text-sm text-muted-foreground">
              Class: {classes.find(c => c.id === selectedClass)?.name}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {student.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{student.name}</span>
                      {getStatusIcon(attendance[student.id])}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={attendance[student.id] === "present" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateAttendance(student.id, "present")}
                      className={attendance[student.id] === "present" ? getStatusColor("present") : ""}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Present
                    </Button>
                    <Button
                      variant={attendance[student.id] === "late" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateAttendance(student.id, "late")}
                      className={attendance[student.id] === "late" ? getStatusColor("late") : ""}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Late
                    </Button>
                    <Button
                      variant={attendance[student.id] === "absent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateAttendance(student.id, "absent")}
                      className={attendance[student.id] === "absent" ? getStatusColor("absent") : ""}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
              <h3 className="font-semibold mb-2">Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-success">
                  Present: {Object.values(attendance).filter(s => s === "present").length}
                </div>
                <div className="text-warning">
                  Late: {Object.values(attendance).filter(s => s === "late").length}
                </div>
                <div className="text-destructive">
                  Absent: {Object.values(attendance).filter(s => s === "absent").length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AttendanceTracker