enum DayOfWeek {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
}

enum UserSex {
  Male = "male",
  Female = "female",
}

type TAdmin = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

type TStudent = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email?: string;
  phone?: string;
  address: string;
  img?: string;
  bloodType: string;
  sex: UserSex;
  createdAt: Date;
  parent: string | TParent;
  class: string | TClass;
  grade: string | TGrade;
  attendances: (string | TAttendance)[];
  results: (string | TResult)[];
  birthday: Date;
  _id?: string;
};

type TTeacher = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email?: string;
  phone?: string;
  address: string;
  img?: string;
  bloodType: string;
  sex: UserSex;
  createdAt: Date;
  subjects: (string | TSubject)[];
  lessons: (string | TLesson)[];
  classes: (string | TClass)[];
  birthday: Date;
  _id?: string;
};

type TParent = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email?: string;
  phone: string;
  address: string;
  createdAt: Date;
  students: (string | TStudent)[];
  _id?: string;
};

type TAnnouncement = {
  id: string;
  title: string;
  description: string;
  date: Date;
  class?: string | TClass;
};

type TAssignment = {
  id: string;
  title: string;
  startDate: Date;
  dueDate: Date;
  lesson: string | TLesson;
  results: (string | TResult)[];
};

type TAttendance = {
  id: string;
  _id?: string;
  date: Date;
  present: boolean;
  student: string | TStudent;
  lesson: string | TLesson;
};

type TClass = {
  id: string;
  name: string;
  capacity: number;
  supervisor?: string | TTeacher;
  lessons: (string | TLesson)[];
  students: (string | TStudent)[];
  grade: string | TGrade;
  events: (string | TEvent)[];
  announcements: (string | TAnnouncement)[];
  _id?: string;
};

type TEvent = {
  id: string;
  _id?: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  class?: string | TClass;
};

type TExam = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  lesson: string | TLesson;
  results: (string | TResult)[];
};

type TGrade = {
  id: string;
  level: number;
  students: (string | TStudent)[];
  classes: (string | TClass)[];
};

type TLesson = {
  id: string;
  name: string;
  day: DayOfWeek;
  startTime: Date;
  endTime: Date;
  subject: string | TSubject;
  class: string | TClass;
  teacher: string | TTeacher;
  exams: (string | TExam)[];
  assignments: (string | TAssignment)[];
  attendances: (string | TAttendance)[];
  _id?: string;
};

type TResult = {
  id: string;
  score: number;
  exam?: string | TExam;
  assignment?: string | TAssignment;
  student: string | TStudent;
};

type TSubject = {
  id: string;
  name: string;
  teachers: (string | TTeacher)[];
  lessons: (string | TLesson)[];
};

interface DirectReceiver {
  id: string;
  model: "Teacher" | "Admin" | "Student" | "Parent";
}

interface MixedReceiver {
  recipients: DirectReceiver[];
}

type TMessage = {
  _id?: string;
  sender: {
    id: string;
    model: "Teacher" | "Admin" | "Student" | "Parent";
    name: string;
  };
  receiver: DirectReceiver | MixedReceiver;
  content: string;
  type: "text" | "image" | "file";
  createdAt: Date;
  channel: string;
  isReaded: boolean;
};

interface DirectReceiverN {
  id: string;
  role: "admin" | "teacher" | "student" | "parent";
}

interface MixedReceiverN {
  recipients: DirectReceiverN[];
}

type TNotification = {
  _id?: string;
  sender: {
    id: string;
    role: "admin" | "teacher" | "student" | "parent";
  };
  recipient: DirectReceiver | MixedReceiver;
  type: "message" | "announcement" | "event";
  content: string;
  relatedId: string;
  createdAt: Date;
  isRead: boolean;
};

type TableTypes =
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";

type Column = {
  header: string;
  accessor: string;
  className?: string;
};
