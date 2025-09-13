import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface AttendanceRecord {
  id: string
  student_id: string
  class_id: string
  date: string
  status: "present" | "absent" | "late"
  notes?: string
  marked_at: string
  student?: {
    name: string
    email: string
  }
}

export const useAttendance = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const getAttendanceForClass = (classId: string, date: string) =>
    useQuery({
      queryKey: ["attendance", classId, date],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("attendance_records")
          .select(`
            *,
            student:students(name, email)
          `)
          .eq("class_id", classId)
          .eq("date", date)

        if (error) throw error
        return data as AttendanceRecord[]
      },
      enabled: !!classId && !!date,
    })

  const getRecentAttendance = () =>
    useQuery({
      queryKey: ["recent-attendance"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("attendance_records")
          .select(`
            *,
            student:students(name, email),
            class:classes(name)
          `)
          .order("marked_at", { ascending: false })
          .limit(10)

        if (error) throw error
        return data
      },
    })

  const markAttendance = useMutation({
    mutationFn: async (records: Array<{
      student_id: string
      class_id: string
      date: string
      status: "present" | "absent" | "late"
      notes?: string
    }>) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const recordsWithUser = records.map(record => ({
        ...record,
        marked_by: user.id
      }))

      const { data, error } = await supabase
        .from("attendance_records")
        .upsert(recordsWithUser, {
          onConflict: "student_id,class_id,date"
        })
        .select()

      if (error) throw error
      return data
    },
    onSuccess: (_, variables) => {
      const classId = variables[0]?.class_id
      const date = variables[0]?.date
      
      queryClient.invalidateQueries({ queryKey: ["attendance", classId, date] })
      queryClient.invalidateQueries({ queryKey: ["recent-attendance"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
      
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      })
    },
  })

  const getDashboardStats = () =>
    useQuery({
      queryKey: ["dashboard-stats"],
      queryFn: async () => {
        const today = new Date().toISOString().split('T')[0]
        
        // Get total students
        const { count: totalStudents } = await supabase
          .from("students")
          .select("*", { count: "exact", head: true })
          .eq("status", "active")

        // Get total classes
        const { count: totalClasses } = await supabase
          .from("classes")
          .select("*", { count: "exact", head: true })
          .eq("status", "active")

        // Get today's attendance
        const { data: todayAttendance } = await supabase
          .from("attendance_records")
          .select("status")
          .eq("date", today)

        const presentToday = todayAttendance?.filter(r => r.status === "present").length || 0
        const attendanceRate = totalStudents && todayAttendance?.length 
          ? Math.round((presentToday / todayAttendance.length) * 100)
          : 0

        return {
          totalStudents: totalStudents || 0,
          totalClasses: totalClasses || 0,
          presentToday,
          attendanceRate,
        }
      },
    })

  return {
    getAttendanceForClass,
    getRecentAttendance,
    markAttendance,
    getDashboardStats,
  }
}