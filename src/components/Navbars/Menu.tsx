"use client";
import { signOutAction } from "@/lib/actionServer";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Tsession = {
  sesssion: Session | null;
};

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export default function Menu({ sesssion }: Tsession) {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((item) => (
        <div className="flex flex-col gap-2" key={item.title}>
          <span className="hidden lg:block text-gray-400 font-light my-3">
            {item.title}
          </span>
          {item.items.map((i) => {
            if (i.label === "Logout")
              return (
                <button
                  key={i.label}
                  onClick={async () => await signOutAction()}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-1 rounded-md hover:bg-lamaskyLight"
                >
                  <Image src={i.icon} alt={i.label} width={20} height={20} />
                  <span className="hidden lg:block">{i.label}</span>
                </button>
              );
            if (i.visible.includes(sesssion?.user.role))
              return (
                <Link
                  href={i.href}
                  key={i.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-1 rounded-md hover:bg-lamaskyLight"
                >
                  <Image src={i.icon} alt={i.label} width={20} height={20} />
                  <span className="hidden lg:block">{i.label}</span>
                </Link>
              );
          })}
        </div>
      ))}
    </div>
  );
}