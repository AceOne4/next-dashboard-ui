import { auth } from "@/auth/auth";
import Annocements from "@/components/Annocements";
import BigCalendar from "@/components/BigCalendar";
import PerformanceChart from "@/components/PerformanceChart";
import PersonalSideLinks from "@/components/PersonalSideLinks";
import PersonalCard from "@/components/UI/PersonalCard";
import { convertToDayMonthYear, convertToMonthYear } from "@/lib/helpers";
import { getAnnouncememnts, getStudentById } from "@/lib/service-data";
import React from "react";

const generatePersonalInfo = (student: any) => [
  {
    id: 1,
    image: "/blood.png",
    title: student.bloodType,
  },
  {
    id: 2,
    image: "/date.png",
    title: convertToMonthYear(student.createdAt),
  },
  {
    id: 3,
    image: "/mail.png",
    title: student.email,
  },
  {
    id: 4,
    image: "/phone.png",
    title: student.phone,
  },
];

const generateProInfo = (student: any) => [
  {
    id: 1,
    image: "/singleAttendance.png",
    title: "Attendances",
    score: "90%",
  },
  {
    id: 2,
    image: "/singleBranch.png",
    title: "Grade",
    score: student.grade.level,
  },
  {
    id: 3,
    image: "/singleLesson.png",
    title: "Lessons",
    score: student.class.lessons.length,
  },
  {
    id: 4,
    image: "/singleClass.png",
    title: "Class",
    score: student.class.name,
  },
];

const generateSideLinks = (studnetId: string) => [
  {
    id: 1,
    title: "Student's Lessons",
    color: "#EDF9FD",
    href: `/list/lessons?Slesson=${studnetId}`,
  },
  {
    id: 2,
    title: "Student's Teachers",
    color: "#F1F0FF",
    href: `/list/teachers?Steacher=${studnetId}`,
  },
  {
    id: 3,
    title: "Student's Exams",
    color: "#FEFCE8",
    href: `/list/exams?Sexam=${studnetId}`,
  },
  {
    id: 4,
    title: "Student's Assignments",
    color: "#FDF2F8",
    href: `/list/assignments?Sassignment=${studnetId}`,
  },
  {
    id: 5,
    title: "Student's Results",
    color: "#EDF9FD",
    href: `/list/results?Sresult=${studnetId}`,
  },
];

const generateStudnetData = (student: any) => ({
  id: student._id,
  username: student.username,
  email: student.email,
  password: "password",
  firstName: student.name,
  lastName: student.surname,
  phone: student.phone,
  address: student.address,
  bloodType: student.bloodType,
  dateOfBirth: convertToDayMonthYear(student.birthday),
  sex: student.sex,
  img:
    student.img ||
    "https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200",
});

interface Params {
  params: {
    id: string;
  };
}

async function page({ params }: Params) {
  const session = await auth();
  const student = await getStudentById(params.id);
  const announcements = await getAnnouncememnts();
  const personalInfo = generatePersonalInfo(student);
  const proInfo = generateProInfo(student);
  const sideLinks = generateSideLinks(params.id);
  const studentData = generateStudnetData(student);

  return (
    <div className="flex flex-col p-4 flex-1 gap-4 lg:flex-row">
      {/* left */}
      <div className=" w-full lg:w-2/3">
        {/* top */}
        <PersonalCard
          proInfo={proInfo}
          personalInfo={personalInfo}
          name={student.name}
          discreption="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          image={
            student.img ||
            "https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
          }
          table="student"
          data={studentData}
          session={session}
        />

        {/* bottom */}
        <div className="mt-4 p-4 bg-white rounded-md h-[800px]">
          <h1>Student&apos;s Schedule </h1>
          <BigCalendar person={student} />
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
