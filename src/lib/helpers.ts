import bcrypt from "bcryptjs";

export const isTeacher = (item: any): item is TTeacher =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "name" in item &&
  "subjects" in item &&
  "lessons" in item;

export const isStudent = (item: any): item is TStudent =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "name" in item &&
  "parent" in item &&
  "class" in item &&
  "grade" in item;

export const isParent = (item: any): item is TParent =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "name" in item &&
  "surname" in item && // Check if surname exists
  "email" in item && // Check if email exists
  Array.isArray(item.students); // Ensure students is an array

export const isClass = (item: any): item is TClass =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "name" in item &&
  "capacity" in item &&
  "grade" in item && // Check if grade exists
  Array.isArray(item.students); // Ensure students is an array

export const isLesson = (item: any): item is TLesson =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "name" in item &&
  "day" in item &&
  "startTime" in item &&
  "endTime" in item &&
  "subject" in item &&
  "class" in item &&
  "teacher" in item &&
  !("dueDate" in item) &&
  !("score" in item);

export const isExam = (item: any): item is TExam =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "title" in item &&
  "startTime" in item &&
  "endTime" in item &&
  "lesson" in item &&
  !("dueDate" in item) &&
  !("score" in item);

export const isAssignment = (item: any): item is TAssignment =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "title" in item &&
  "dueDate" in item &&
  !("date" in item) &&
  !("score" in item);

export const isResult = (item: any): item is TResult =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "score" in item &&
  "student" in item;

export const isAnnouncement = (item: any): item is TAnnouncement =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "title" in item &&
  "description" in item &&
  "date" in item; // You might want to include a date or timestamp

export const isSubject = (item: any): item is TSubject =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "name" in item &&
  "teachers" in item;

export const isEvent = (item: any): item is TEvent =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "title" in item &&
  "description" in item &&
  "startTime" in item &&
  "endTime" in item &&
  !("date" in item);

export const isAttendance = (item: any): item is TAttendance =>
  typeof item === "object" &&
  item !== null &&
  "date" in item &&
  "present" in item &&
  "student" in item &&
  typeof item.present === "boolean"; // Ensures 'present' is explicitly a boolean

/////////////////////////////////////////////////////

export const convertToMonthYear = (timestamp: string): string => {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Extract the month name and year using toLocaleDateString
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("en-US", options);
};

export const convertToDayMonthYear = (timestamp: string): string => {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Extract the day, month name, and year using toLocaleDateString
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
///////////////////////////////////
//Function to hash passwords
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
///////////
export function capitalizeFirstChar(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//sort by date
export function sortByDate(records: any[]): any[] {
  return records.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime(); // Ascending order
  });
}

export function convertToHourMin(isoString: string) {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with 0 if needed
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with 0 if needed
  return `${hours}:${minutes}`;
}

export const formatDateForInput = (isoDate: string) => {
  if (!isoDate) return ""; // handle empty or undefined date
  return new Date(isoDate).toISOString().slice(0, 10); // Returns 'YYYY-MM-DD'
};

export const formatDateTimeForInput = (isoDateTime: string) => {
  if (!isoDateTime) return ""; // handle empty or undefined date
  const date = new Date(isoDateTime);
  const formattedDate = date.toISOString().slice(0, 16); // Returns 'YYYY-MM-DDTHH:MM'
  return formattedDate;
};

// Helper functions to create channel identifiers

// Generates a unique identifier for direct messages
export const getDirectChannelId = (
  userId1: string,
  userId2: string
): string => {
  // Sort IDs to maintain a consistent pattern
  const sortedIds = [userId1, userId2].sort();
  return `direct${sortedIds[0]}-${sortedIds[1]}`;
};

// Generates a unique identifier for a group chat
export const getGroupChannelId = (groupId: string): string => {
  return `group${groupId}`;
};

// Function to check if a channel is a direct message or a group chat
export const isGroupChat = (channel: string): boolean => {
  return channel.startsWith("group");
};

export const isDirectMessage = (channel: string): boolean => {
  return channel.startsWith("direct");
};

type UserType = "Teacher" | "Parent" | "Student" | "Admin";

export function getUserType(
  user: TTeacher | TParent | TStudent | TAdmin
): UserType {
  if ("subjects" in user && "lessons" in user && "classes" in user) {
    return "Teacher";
  } else if ("students" in user && "phone" in user) {
    return "Parent";
  } else if ("attendances" in user && "results" in user && "parent" in user) {
    return "Student";
  } else {
    return "Admin";
  }
}
