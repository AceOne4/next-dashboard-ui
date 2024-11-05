import { auth } from "@/auth/auth";
import Annocements from "@/components/Annocements";
import BigCalendar from "@/components/BigCalendar";
import PerformanceChart from "@/components/PerformanceChart";
import PersonalSideLinks from "@/components/PersonalSideLinks";
import PersonalCard from "@/components/UI/PersonalCard";
import { convertToDayMonthYear, convertToMonthYear } from "@/lib/helpers";
import { getAnnouncememnts, getTeacherById } from "@/lib/service-data";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}
const generatePersonalInfo = (teacher: any) => [
  {
    id: 1,
    image: "/blood.png",
    title: teacher.bloodType,
  },
  {
    id: 2,
    image: "/date.png",
    title: convertToMonthYear(teacher.createdAt),
  },
  {
    id: 3,
    image: "/mail.png",
    title: teacher.email,
  },
  {
    id: 4,
    image: "/phone.png",
    title: teacher.phone,
  },
];

const generateProInfo = (teacher: any) => [
  {
    id: 1,
    image: "/singleAttendance.png",
    title: "Attendances",
    score: "90%",
  },
  {
    id: 2,
    image: "/singleBranch.png",
    title: "Branches",
    score: teacher.subjects.length,
  },
  {
    id: 3,
    image: "/singleLesson.png",
    title: "Lessons",
    score: teacher.lessons.length,
  },
  {
    id: 4,
    image: "/singleClass.png",
    title: "Classes",
    score: teacher.classes.length,
  },
];

const generateSideLinks = (teacherId: string) => [
  {
    id: 1,
    title: "Teacher's Students",
    color: "#EDF9FD",
    href: `/list/students?Tstudent=${teacherId}`,
  },
  {
    id: 2,
    title: "Teacher's Lessons",
    color: "#F1F0FF",
    href: `/list/lessons?Tlesson=${teacherId}`,
  },
  {
    id: 3,
    title: "Teacher's Exams",
    color: "#FEFCE8",
    href: `/list/exams?Texam=${teacherId}`,
  },
  {
    id: 4,
    title: "Teacher's Assignments",
    color: "#FDF2F8",
    href: `/list/assignments?Tassignment=${teacherId}`,
  },
];

const generateTeacherData = (teacher: any) => ({
  id: teacher._id,
  username: teacher.username,
  email: teacher.email,
  password: "password",
  firstName: teacher.name,
  lastName: teacher.surname,
  phone: teacher.phone,
  address: teacher.address,
  bloodType: teacher.bloodType,
  dateOfBirth: convertToDayMonthYear(teacher.birthday),
  sex: teacher.sex,
  img:
    teacher.img ||
    "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
});

async function page({ params }: Params) {
  const teacher = await getTeacherById(params.id);
  const announcements = await getAnnouncememnts();
  const session = await auth();

  const personalInfo = generatePersonalInfo(teacher);
  const proInfo = generateProInfo(teacher);
  const sideLinks = generateSideLinks(params.id);
  const teacherData = generateTeacherData(teacher);

  return (
    <div className="flex flex-col p-4 flex-1 gap-4 lg:flex-row">
      {/* left */}
      <div className=" w-full lg:w-2/3">
        {/* top */}
        <PersonalCard
          session={session}
          proInfo={proInfo}
          personalInfo={personalInfo}
          name={teacher.name}
          discreption="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          image={
            teacher.img ||
            "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
          }
          data={teacherData}
          table="teacher"
        />

        {/* bottom */}
        <div className="mt-4 p-4 bg-white rounded-md h-[800px]">
          <h1>Teacher&apos;s Schedule </h1>
          <BigCalendar person={teacher} />
        </div>
      </div>
      {/* right */}
      <div className=" w-full lg:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <PersonalSideLinks links={sideLinks} />
        </div>
        <PerformanceChart />
        <Annocements announcemtnts={announcements.items} />
      </div>
    </div>
  );
}

export default page;
