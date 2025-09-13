import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface Class {
  id: string
  name: string
  instructor: string
  room?: string
  day_of_week: string
  start_time: string
  end_time: string
  capacity: number
  status: "active" | "inactive"
  created_at: string
  updated_at: string
}

export const useClasses = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    data: classes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("day_of_week", { ascending: true })
        .order("start_time", { ascending: true })

      if (error) throw error
      return data as Class[]
    },
  })

  const addClass = useMutation({
    mutationFn: async (classData: Omit<Class, "id" | "created_at" | "updated_at">) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data, error } = await supabase
        .from("classes")
        .insert([{ ...classData, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] })
      toast({
        title: "Success",
        description: "Class added successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add class",
        variant: "destructive",
      })
    },
  })

  const updateClass = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Class> & { id: string }) => {
      const { data, error } = await supabase
        .from("classes")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] })
      toast({
        title: "Success",
        description: "Class updated successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update class",
        variant: "destructive",
      })
    },
  })

  const deleteClass = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("classes")
        .delete()
        .eq("id", id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] })
      toast({
        title: "Success",
        description: "Class deleted successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete class",
        variant: "destructive",
      })
    },
  })

  return {
    classes,
    isLoading,
    error,
    addClass,
    updateClass,
    deleteClass,
  }
}