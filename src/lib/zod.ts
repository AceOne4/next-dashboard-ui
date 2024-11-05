import { object, string, z } from "zod";

// Use Zod's enum method to define roles
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),

  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
  // ),

  role: z.enum(["teacher", "student", "parent", "admin"], {
    required_error: "Role is required",
  }),
});
///////////////////////////////////
export const announcementSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  date: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "Date is required and must be a valid date!",
  }),
  class: z.string().optional(),
});

export const assignmentSchema = z.object({
  title: z.string().min(1, { message: "Assignment title is required!" }),
  startDate: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "startDate is required and must be a valid date!",
  }),
  dueDate: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "dueDate is required and must be a valid date!",
  }),
  lesson: z.string().min(1, { message: "Linked lesson is required!" }),
});

export const classSchema = z.object({
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.number().min(1, { message: "Capacity is required!" }),
  supervisor: z.string().optional(), // Can also be a reference to the teacher
  grade: z.string().min(1, { message: "Grade is required!" }),
  students: z.array(z.string()).optional(), // Array of student references
});

export const eventSchema = z.object({
  title: z.string().min(1, { message: "Event title is required!" }),
  description: z.string().optional(),
  startDate: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "startDate is required and must be a valid date!",
  }),
  endDate: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "endDate is required and must be a valid date!",
  }),
  class: z.string().optional(), // Optional field to link with a class
});

export const examSchema = z.object({
  title: z.string().min(1, { message: "Exam title is required!" }),
  startTime: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "startTime is required and must be a valid date!",
  }),
  endTime: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "endTime is required and must be a valid date!",
  }),
  lesson: z.string().min(1, { message: "Linked lesson is required!" }),
});

export const studentSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "birthday is required and must be a valid date!",
  }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

export const subjectSchema = z.object({
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z
    .array(z.string())
    .min(1, { message: "At least one teacher is required!" }),
  lessons: z.array(z.string()).optional(), // Optional array of lessons
});

export const teacherSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
    message: "birthday is required and must be a valid date!",
  }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});
