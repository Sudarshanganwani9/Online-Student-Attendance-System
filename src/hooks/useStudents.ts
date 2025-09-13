import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface Student {
  id: string
  name: string
  email: string
  phone?: string
  enrollment_date: string
  status: "active" | "inactive" | "graduated"
  grade_level?: string
  created_at: string
  updated_at: string
}

export const useStudents = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    data: students = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as Student[]
    },
  })

  const addStudent = useMutation({
    mutationFn: async (student: Omit<Student, "id" | "created_at" | "updated_at">) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data, error } = await supabase
        .from("students")
        .insert([{ ...student, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      toast({
        title: "Success",
        description: "Student added successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      })
    },
  })

  const updateStudent = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Student> & { id: string }) => {
      const { data, error } = await supabase
        .from("students")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      toast({
        title: "Success",
        description: "Student updated successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update student",
        variant: "destructive",
      })
    },
  })

  const deleteStudent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      toast({
        title: "Success",
        description: "Student deleted successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      })
    },
  })

  return {
    students,
    isLoading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
  }
}