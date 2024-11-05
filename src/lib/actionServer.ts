"use server";
import { auth, signIn, signOut } from "@/auth/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { pusherServer } from "./pusher";
import {
  getParentById,
  getStudentById,
  getTeacherById,
  newMessage,
  teacherBySid,
} from "./service-data";

export const login = async (prev: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  if (!email || !password || !role) return { error: "field is required" };

  await signIn("credentials", {
    email,
    password,
    role,
    redirect: true,
    redirectTo: `/${role}`,
  });
};

export async function signOutAction() {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   throw new Error("User is not authenticated");
  // }

  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}

export async function sendMessage(data: {
  message: string;
  sender: {
    id: string;
    model: "Teacher" | "Admin" | "Student" | "Parent";
    name: string;
  };
  channel: string;
  reciver: DirectReceiver | MixedReceiver;
}) {
  try {
    const message: TMessage = {
      sender: data.sender,
      receiver: data.reciver,
      content: data.message,
      type: "text",
      channel: data.channel,
      isReaded: false,
      createdAt: new Date(),
    };
    console.log(message);

    //await newMessage(message);
    //  Trigger the event on the correct channel
    await pusherServer.trigger(data.channel, "upcoming-message", message);
  } catch (error) {
    console.error("Pusher trigger error:", error);
    throw new Error("An error occurred while sending the message");
  }
}

export async function sendTypingStatus(
  channel: string,
  userId: string,
  typing: boolean
) {
  try {
    await pusherServer.trigger(channel, "typing-status", { userId, typing });
  } catch (error) {
    console.error("Error sending typing status:", error);
  }
}

export const FetchContactsList = async (role: string, id: string) => {
  console.log(role);

  // Helper to create class chat format
  const createClassChat = (classItem: TClass) => ({
    id: "public",
    className: classItem.name,
    classId: classItem._id,
    classMembers: (classItem.students as TStudent[]).map((student) => ({
      id: student._id,
      model: "Student",
    })),
  });

  // Helper to fetch and merge contacts
  const getTeacherContacts = async (students: TStudent[]) => {
    const teacherResults = await Promise.all(
      students.map((student) => teacherBySid(1, "Steacher", student._id))
    );
    const teachers = teacherResults.flatMap((result) => result.items);
    return [...new Map(teachers.map((item) => [item.id, item])).values()];
  };

  switch (role) {
    case "admin":
      /*
     const allClasses = await getAllClasses(); // Fetch all classes
      const allStudents = await getAllStudents();
      const allTeachers = await getAllTeachers();
      const allParents = await getAllParents();

      const classChat = allClasses.map(createClassChat);

      const contacts = [
        ...allStudents.map((student) => ({
          id: student._id,
          model: "Student",
          name: student.name,
        })),
        ...allTeachers.map((teacher) => ({
          id: teacher._id,
          model: "Teacher",
          name: teacher.name,
        })),
        ...allParents.map((parent) => ({
          id: parent._id,
          model: "Parent",
          name: parent.name,
        })),
      ];
*/
      return { classChat: [], contacts: [] };

    case "student": {
      const student = await getStudentById(id);
      const classChat = [createClassChat(student.class)];
      const teacherContacts = await getTeacherContacts([student]);
      const contacts = [...teacherContacts, ...student.class.students];
      return { classChat, contacts };
    }

    case "teacher": {
      const teacher = await getTeacherById(id);
      const classChat = teacher.classes.map(createClassChat);
      const contacts = teacher.classes.flatMap(
        (classItem: TClass) => classItem.students
      );
      return { classChat, contacts };
    }

    case "parent": {
      const parent = await getParentById(id);
      const teacherContacts = await getTeacherContacts(parent.students);
      const contacts = [...teacherContacts, ...parent.students];
      return { classChat: [], contacts };
    }

    default:
      console.log("Something went wrong");
      return { classChat: [], contacts: [] };
  }
};
