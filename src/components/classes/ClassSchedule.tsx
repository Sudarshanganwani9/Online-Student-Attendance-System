import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Users, MapPin } from "lucide-react"

const ClassSchedule = () => {
  const classes = [
    {
      id: 1,
      name: "Mathematics 101",
      instructor: "Dr. Smith",
      time: "09:00 - 10:30",
      room: "Room 201",
      students: 28,
      capacity: 30,
      status: "Active",
      day: "Monday",
    },
    {
      id: 2,
      name: "Physics 201",
      instructor: "Prof. Johnson",
      time: "11:00 - 12:30",
      room: "Lab 105",
      students: 24,
      capacity: 25,
      status: "Active",
      day: "Monday",
    },
    {
      id: 3,
      name: "Chemistry 102",
      instructor: "Dr. Williams",
      time: "14:00 - 15:30",
      room: "Lab 203",
      students: 22,
      capacity: 30,
      status: "Active",
      day: "Monday",
    },
    {
      id: 4,
      name: "Biology 101",
      instructor: "Ms. Davis",
      time: "10:00 - 11:30",
      room: "Room 301",
      students: 26,
      capacity: 28,
      status: "Active",
      day: "Tuesday",
    },
    {
      id: 5,
      name: "English Literature",
      instructor: "Prof. Brown",
      time: "13:00 - 14:30",
      room: "Room 102",
      students: 30,
      capacity: 35,
      status: "Active",
      day: "Tuesday",
    },
  ]

  const getCapacityColor = (students: number, capacity: number) => {
    const percentage = (students / capacity) * 100
    if (percentage >= 90) return "text-warning"
    if (percentage >= 80) return "text-success"
    return "text-primary"
  }

  const groupedClasses = classes.reduce((acc, classItem) => {
    if (!acc[classItem.day]) {
      acc[classItem.day] = []
    }
    acc[classItem.day].push(classItem)
    return acc
  }, {} as Record<string, typeof classes>)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Class Schedule</h2>
          <p className="text-muted-foreground">Manage classes and schedules</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedClasses).map(([day, dayClasses]) => (
          <Card key={day} className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {dayClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h3 className="font-semibold text-lg mb-2">{classItem.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {classItem.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {classItem.room}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className={getCapacityColor(classItem.students, classItem.capacity)}>
                            {classItem.students}/{classItem.capacity}
                          </span>
                        </div>
                        <div>
                          Instructor: {classItem.instructor}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Badge variant="default">{classItem.status}</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Attendance
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ClassSchedule