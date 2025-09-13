import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Edit, Mail, Phone } from "lucide-react"
import { useState } from "react"

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      grade: "Grade 11",
      status: "Active",
      attendance: "95%",
      initials: "SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "(555) 234-5678",
      grade: "Grade 12",
      status: "Active",
      attendance: "87%",
      initials: "MC",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.d@email.com",
      phone: "(555) 345-6789",
      grade: "Grade 10",
      status: "Active",
      attendance: "92%",
      initials: "ED",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@email.com",
      phone: "(555) 456-7890",
      grade: "Grade 11",
      status: "Inactive",
      attendance: "78%",
      initials: "JW",
    },
    {
      id: 5,
      name: "Lisa Brown",
      email: "lisa.brown@email.com",
      phone: "(555) 567-8901",
      grade: "Grade 12",
      status: "Active",
      attendance: "98%",
      initials: "LB",
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAttendanceColor = (attendance: string) => {
    const percent = parseInt(attendance)
    if (percent >= 90) return "text-success"
    if (percent >= 80) return "text-warning"
    return "text-destructive"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Students</h2>
          <p className="text-muted-foreground">Manage student information and records</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Students ({filteredStudents.length})</CardTitle>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {student.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {student.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{student.grade}</Badge>
                    <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                      {student.status}
                    </Badge>
                    <span className={`text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                      {student.attendance}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentList