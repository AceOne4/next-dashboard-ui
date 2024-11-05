import React from "react";
import Image from "next/image";
import BarCharts from "@/components/BarCharts";
import PersonalInfoElment from "@/components/UI/PersonalInfoElment";
import {
  getAnnouncememnts,
  getEvents,
  getParentById,
} from "@/lib/service-data";
import { auth } from "@/auth/auth";
import EventCalendar from "@/components/events/EventCalendar";
import Annocements from "@/components/Annocements";
import Link from "next/link";

interface Params {
  params: {
    id: string;
  };
}

const ParentProfile = async ({ params }: Params) => {
  const parents = await getParentById(params.id);
  const session = await auth();
  const events = await getEvents();

  const generatePersonalInfo = (parent: any) => [
    {
      id: 1,
      image: "/date.png",
      title: "October 20", // Placeholder for creation date
    },
    {
      id: 2,
      image: "/mail.png",
      title: parent.email,
    },
    {
      id: 3,
      image: "/phone.png",
      title: parent.phone,
    },
  ];

  const personalInfo = generatePersonalInfo(parents);

  return (
    <div className="flex flex-col p-4 flex-1 gap-4 lg:flex-row">
      <div className=" w-full lg:w-2/3">
        <div className="max-w-7xl mx-auto p-6 rounded-lg bg-white shadow-lg min-h-full">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side - Profile Info and Children Cards */}

            {/* Parent Profile Info */}
            <div className=" p-6  bg-lamaskyLight rounded-md ">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{parents.name}</h1>

                {/* {session?.user.role === "admin" && (
              <FormModal table={table} type="update" data={data} />
            )} */}
              </div>
              {personalInfo.map((info) => (
                <PersonalInfoElment
                  key={info.id}
                  title={info.title}
                  image={info.image}
                />
              ))}
            </div>

            {/* Children Cards */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">
                Children
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {parents.students.map((child: any) => (
                  <div
                    key={child._id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={
                          child.image ||
                          "https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        }
                        alt={child.name}
                        width={70}
                        height={70}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-black">
                          {child.name}
                        </h3>
                        <p className="text-gray-600">
                          Class: {child.class.name}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-black">
                        Performance
                      </h4>
                      <BarCharts />
                    </div>
                    <Link
                      href={`/list/students/${child._id}`}
                      className=" text-blue-600 hover:text-blue-800 "
                    >
                      <span>View Profile</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - 1/3 Section */}
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar events={events.items} />
      </div>
    </div>
  );
};

export default ParentProfile;
