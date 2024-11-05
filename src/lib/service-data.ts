import { UserRole } from "@/auth/auth";
import bcrypt from "bcryptjs";

const BASE_URL = "http://localhost:3000/api";

// General fetch function
const fetchData = async (endpoint: string, options: RequestInit = {}) => {
  try {
    console.log(endpoint);

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching data");
  }
};

// Helper function for paginated requests
const fetchPaginatedData = async (entity: string, page: number) => {
  return fetchData(`/${entity}?page=${page.toString()}`, {
    next: { revalidate: 20 },
  });
};

// Fetchers for different entities
export const getAllTeachers = (page: number) =>
  fetchPaginatedData("teacher", page);
export const getAllParents = (page: number) =>
  fetchPaginatedData("parent", page);
export const getAllStudents = (page: number) =>
  fetchPaginatedData("student", page);
export const getAllAnnouncements = (page: number) =>
  fetchPaginatedData("announcement", page);
export const getAllAssignments = (page: number) =>
  fetchPaginatedData("assignment", page);
export const getAllAttendances = (page: number) =>
  fetchPaginatedData("attendance", page);
export const getAllClasses = (page: number) =>
  fetchPaginatedData("class", page);
export const getAllExams = (page: number) => fetchPaginatedData("exam", page);
export const getAllEvents = (page: number) => fetchPaginatedData("event", page);
export const getAllGrades = (page: number) => fetchPaginatedData("grade", page);
export const getAllLessons = (page: number) =>
  fetchPaginatedData("lesson", page);
export const getAllResults = (page: number) =>
  fetchPaginatedData("result", page);
export const getAllSubjects = (page: number) =>
  fetchPaginatedData("subject", page);
export const getAllAdmins = (page: number) => fetchPaginatedData("admin", page);
// Generalized function for filtered requests
const fetchFilteredData = async (
  entity: string,
  page: number = 1,
  key?: string,
  value?: string
) => {
  return fetchData(
    `/${entity}/byTSID?page=${page.toString()}&${key}=${value}`,
    {
      next: { revalidate: 20 },
    }
  );
};

// Filtered fetchers for specific entities
export const lessonByTSid = (page: number = 1, key?: string, value?: string) =>
  fetchFilteredData("lesson", page, key, value);

export const examByTSid = (page: number = 1, key?: string, value?: string) =>
  fetchFilteredData("exam", page, key, value);

export const assignmentByTSid = (
  page: number = 1,
  key?: string,
  value?: string
) => fetchFilteredData("assignment", page, key, value);

export const teacherBySid = (page: number = 1, key?: string, value?: string) =>
  fetchFilteredData("teacher", page, key, value);

export const studentByTid = (page: number = 1, key?: string, value?: string) =>
  fetchFilteredData("student", page, key, value);

export const resultBySid = (page: number = 1, key?: string, value?: string) =>
  fetchFilteredData("result", page, key, value);

// Fetch a student by their student ID
export const getStudentById = async (studentId: string) => {
  return fetchData(`/student/id/${studentId}`, {
    next: { revalidate: 20 },
  });
};

// Fetch a teacher by their teacher ID
export const getTeacherById = async (teacherId: string) => {
  return fetchData(`/teacher/id/${teacherId}`, {
    next: { revalidate: 20 },
  });
};

export const getParentById = async (parentId: string) => {
  return fetchData(`/parent/id/${parentId}`, {
    next: { revalidate: 20 },
  });
};
////////////////////////
export const getUSerLogin = async (
  email: string,
  password: string,
  role: UserRole
) => {
  console.log(role);

  const user = await fetchData(
    `/${role}/byEmail?email=${encodeURIComponent(email)}`,
    {
      next: { revalidate: 20 },
    }
  );

  if (!user) throw new Error("invaled email");
  if (!bcrypt.compare(password, user.password))
    throw new Error("Invalid password");

  return user;
};
/////
export const getFemaleCount = async () => {
  const studnets = await fetchData("/student", {
    next: { revalidate: 20 },
  });
  const female = studnets.items.filter((el: any) => el.sex === "female");
  return female.length;
};

export const getattendacneCount = async () => {
  const attendance = await fetchData("/attendance", {
    next: { revalidate: 20 },
  });

  return attendance;
};

export const getEvents = async () => {
  const attendance = await fetchData("/event", {
    next: { revalidate: 20 },
  });

  return attendance;
};
export const getAnnouncememnts = async () => {
  const attendance = await fetchData("/announcement", {
    next: { revalidate: 20 },
  });

  return attendance;
};

export const newMessage = async (messageData: TMessage) => {
  return fetchData("/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData),
    next: { revalidate: 20 },
  });
};

export const getMessagesbyChannel = async (channel: string) => {
  return fetchData(`/message?channel=chat-${channel}`, {
    method: "GET",
    next: { revalidate: 20 },
  });
};
