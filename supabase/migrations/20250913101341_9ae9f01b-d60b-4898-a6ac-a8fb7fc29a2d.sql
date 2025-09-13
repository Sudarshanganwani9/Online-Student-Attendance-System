-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
  grade_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  instructor TEXT NOT NULL,
  room TEXT,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INTEGER DEFAULT 30,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create class_enrollments table (many-to-many relationship between students and classes)
CREATE TABLE public.class_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, class_id)
);

-- Create attendance_records table
CREATE TABLE public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  notes TEXT,
  marked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  marked_by UUID REFERENCES auth.users(id),
  UNIQUE(student_id, class_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for students
CREATE POLICY "Users can view their own students" ON public.students
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own students" ON public.students
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own students" ON public.students
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own students" ON public.students
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for classes
CREATE POLICY "Users can view their own classes" ON public.classes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own classes" ON public.classes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own classes" ON public.classes
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own classes" ON public.classes
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for class_enrollments
CREATE POLICY "Users can view enrollments for their classes" ON public.class_enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can create enrollments for their classes" ON public.class_enrollments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can update enrollments for their classes" ON public.class_enrollments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can delete enrollments for their classes" ON public.class_enrollments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );

-- Create RLS policies for attendance_records
CREATE POLICY "Users can view attendance for their classes" ON public.attendance_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can create attendance for their classes" ON public.attendance_records
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can update attendance for their classes" ON public.attendance_records
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can delete attendance for their classes" ON public.attendance_records
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = class_id AND c.user_id = auth.uid()
    )
  );

-- Create triggers for updated_at columns
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_students_user_id ON public.students(user_id);
CREATE INDEX idx_classes_user_id ON public.classes(user_id);
CREATE INDEX idx_class_enrollments_student_id ON public.class_enrollments(student_id);
CREATE INDEX idx_class_enrollments_class_id ON public.class_enrollments(class_id);
CREATE INDEX idx_attendance_records_student_id ON public.attendance_records(student_id);
CREATE INDEX idx_attendance_records_class_id ON public.attendance_records(class_id);
CREATE INDEX idx_attendance_records_date ON public.attendance_records(date);